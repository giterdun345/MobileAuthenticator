import ExpoModulesCore

public class CryptoKeepModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // The module will be accessible from `requireNativeModule('CryptoKeep')` in JavaScript.
    Name("CryptoKeep")

    Function("getPublicKey") {
      return getPublicKey()
    }

    Function("provideSignature"){(userId: string, deviceId: String) in
      var signature = provideSignature(userId, deviceId)
      return signature
    }
}

    fun getPublicKey() -> [String]{
      guard let currentPrivateKey = loadKey() else {
        return "Error loading the private key."
      }

      if currentPrivateKey != nil {
        guard let publicKey = SecKeyCopyPublicKey(privateKey) else {
          return "Public key  access error"
        }
      }

      var accessError: Unmanaged<CFError>?
      let access =
        SecAccessControlCreateWithFlags(kCFAllocatorDefault, // default allocator
        kSecAttrAccessibleWhenUnlockedThisDeviceOnly, // data accessed only while the device is unlocked by the user
        [.privateKeyUsage,.biometryAny], // makes key available only when the system can authenticate with biometrics
        &accessError)! // error object TODO: handle error
        // else{
        //   return "You do not have access to the secure enclave."
        // }

      let secEnclaveTag = "com.dinara.mobile".data(using: .utf8)! //  tag to access pk
      let privateKeyParams: [String: AnyObject] = [
        kSecAttrIsPermanent as String: true as AnyObject, // stores at creation time 
        kSecAttrApplicationTag as String: secEnclaveTag as AnyObject, //  tag to find and retrieve pk later
        kSecAttrAccessControl as String: access // how the keys are used
        ]

      let attributes = [
        kSecAttrKeyType as String: kSecAttrKeyTypeECSECPrimeRandom, // elliptic curve key type
        kSecAttrKeySizeInBits as String: 256, // KEY SIZE
        kSecAttrTokenID as String: kSecAttrTokenIDSecureEnclave, // indicates that the generation operation for the private key should take place inside the Secure Enclave
        kSecPrivateKeyAttrs as String: privateKeyParams] as CFDictionary // set to the created sub-dictionary, contains specs of pk

      // private key creation 
      var error: Unmanaged<CFError>?
      guard let privateKey = SecKeyCreateRandomKey(attributes as CFDictionary, &error) else {
        return "Private key generation error"
        // throw error!.takeRetainedValue() as Error TODO: make available to the frontend
      } 

      // public key creation 
      guard let publicKey = SecKeyCopyPublicKey(privateKey) else {
        return "Public key generation error"
      }

      // check if supported algorithm 
      // guard SecKeyIsAlgorithmSupported(publicKey, .encrypt, kSecAttrKeyTypeECSECPrimeRandom) else {
      //     return "Encryption algorithm is not supported."
      // }

      return publicKey // TODO: check if can trun into stirng .base64EncodedString(options: [])
  
    }


    fun provideSignature(userId: String, deviceId: String ) -> [String]{
      let headers = Header(kid: "Dinara-Mobile", typ:"JWT", alg:"ES256")
      let claims = MyClaims(iss:"Dinara-Ios", sub:deviceId, aud:"you", iat: Date(), nbf:Date(), userId: userId, deviceId: deviceId,  exp: Date(timeIntervalSinceNow: 300000))
      let jwt = JWT(header: headers, claims: claims)

       guard let messageData = jwt.data(using: String.Encoding.utf8) else {
        return "Invalid message to sign."
      } 

      guard let privateKey = loadKey() else {
        return "Error loading the key."
      }

      guard let signData = SecKeyCreateSignature(
        privateKey,
        SecKeyAlgorithm.ecdsaSignatureMessageX962SHA256,
        messageData as CFData, nil) else {
        return "Error signing the message."
        } 

      let signedData = signData as Data
      let signature = signedData.base64EncodedString(options: [])

      return signature
    }

    static func loadKey() -> SecKey? {
      let secEnclaveTag = "com.dinara.mobile".data(using: .utf8)!

      let query: [String: Any] = [
          kSecClass as String                 : kSecClassKey,
          kSecAttrApplicationTag as String    : secEnclaveTag,
          kSecAttrKeyType as String           : kSecAttrKeyTypeECSECPrimeRandom,
          kSecReturnRef as String             : true
      ]
      
      var item: CFTypeRef?
      let status = SecItemCopyMatching(query as CFDictionary, &item)

      guard status == errSecSuccess else {
        return
          // return "Error loading key."
      }  // TODO: handle error

      return (item as! SecKey)
    }
}
