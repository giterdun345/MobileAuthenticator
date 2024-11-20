package expo.modules.cryptokeep

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.exception.Exceptions

import android.os.Build
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.util.Base64
import androidx.annotation.RequiresApi
import androidx.annotation.UiThread

import com.facebook.react.bridge.ReactMethod

import java.security.spec.ECGenParameterSpec
import java.security.*
import java.time.Instant
import java.util.Date

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm


class CryptoKeepModule() : Module() {
    // See https://docs.expo.dev/modules/module-api for more details about available components.
        private val END_CERT = "-----END PUBLIC KEY-----"
        private val BEGIN_CERT = "-----BEGIN PUBLIC KEY-----"
        private val LINE_SEPARATOR = "\n"

        fun getPublicKeyPem(publicKey: String): String {
            val pem = BEGIN_CERT + LINE_SEPARATOR + publicKey + LINE_SEPARATOR + END_CERT
            return pem;
        }
        
    @RequiresApi(Build.VERSION_CODES.M)
    override fun definition() = ModuleDefinition {
        // The module will be accessible from `requireNativeModule('CryptoKeep')` in (../index.ts).
        Name("CryptoKeep")

        Function("getPublicKey") {
            val publicKey = getPublicKey()
            val keyPem = getPublicKeyPem(publicKey)
            return@Function keyPem
        }
 
        Function("provideSignature") {userId: String, deviceId: String, url: String ->
           
            try {
                return@Function provideSignature(userId, deviceId, url)  
            } catch (e: Throwable) {
                return@Function "Signature Error: There was an error during the signature process. $e"
            }
        } 
    }
   

    @ReactMethod
    @UiThread
    private fun getPublicKey(): String {
        /*
         * Will get the keypair by alias if the key pair is not there,
         * it generates a new RSA/?EC (which) key pair entry in the Android Keystore by
         * using the KeyPairGenerator API. The private key can only be
         * used for signing not verification and only with SHA-256 or
         * SHA-512 as the message digest.
         */

        val KEYSTORE_ALIAS = "com.dinara.crypto.android.security.cryptography.key"
        val ks: KeyStore = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }
        // Check whether the keypair exists.
        if (!ks.containsAlias(KEYSTORE_ALIAS)) {
            val keyPairGenerator =
                KeyPairGenerator.getInstance(KeyProperties.KEY_ALGORITHM_EC, "AndroidKeyStore")
            val spec =
                KeyGenParameterSpec.Builder(
                        KEYSTORE_ALIAS,
                        KeyProperties.PURPOSE_SIGN
                     )
                    .setAlgorithmParameterSpec(ECGenParameterSpec("secp256r1"))
                    .setDigests(
                        KeyProperties.DIGEST_SHA256,
                        KeyProperties.DIGEST_SHA384,
                        KeyProperties.DIGEST_SHA512
                    )
                    // .setUserAuthenticationRequired(true) // check
                    // .setUserAuthenticationParameters(5 * 60, KeyProperties.AUTH_DEVICE_CREDENTIAL)
                    .setKeySize(256)
                    .build()

            keyPairGenerator.initialize(spec)
            val keyPairMap = keyPairGenerator.generateKeyPair()
            return Base64.encodeToString(keyPairMap.public.encoded, Base64.NO_WRAP)
        } else {
            // Load the existing key pair
            try {
                val privateKey = ks.getKey(KEYSTORE_ALIAS, null) as PrivateKey
                val publicKey = ks.getCertificate(KEYSTORE_ALIAS).publicKey

                val keyPairMap = KeyPair(publicKey, privateKey)
                return Base64.encodeToString(keyPairMap.public.encoded, Base64.NO_WRAP)
            } catch (e: Throwable) {
                 return "There was an error trying to load keys from KeyChain."
            }
        }
    }

    @UiThread
    @ReactMethod
    private fun provideSignature(userId: String, deviceId: String, url: String): String {
        /*
         * Provide a signature for the JWT token using prior implementation from
         * the android version of Dinara mobile. In order to access the private key
         *  a biometric prompt is created to validate the credentials of the user.
         */
        val KEYSTORE_ALIAS = "com.dinara.crypto.android.security.cryptography.key"
        val ks: KeyStore = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }
        val privateKey =  ks.getKey(KEYSTORE_ALIAS, null) as PrivateKey

        val issued = Instant.now()
        val expires = issued.plusMillis(30000)

        val claims: MutableMap<String, Any?> = HashMap()
            claims["deviceId"] = deviceId
            claims["userId"] = userId
            claims["aud"] = url
            claims["sub"] = deviceId
            claims["exp"] = Date.from(expires)
            claims["iat"] = Date.from(issued)
            claims["nbf"] = Date.from(issued)
            claims["iss"] = "Dinara"
            
        return  Jwts.builder()
            .setHeaderParam("typ", "JWT")
            .setHeaderParam("alg", "ES256")
            .setHeaderParam("iss", "Dinara")
            .setClaims(claims)
            .signWith(privateKey, SignatureAlgorithm.ES256)
            .compact()
         }
    }



 
