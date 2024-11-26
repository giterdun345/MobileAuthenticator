# keypair-sign

This module will create a keypair on your mobile device, store the private key, ship public key to backend and make requests to backend with signed jwt token for authentication

Currently, this is an initial skeleton for expo custom native module. I have left the Dinara_Mobile_RN directory as a reference on how the custom module is implemented in a real world application. The main thing we have to do is generalize this but still accomplish these three things.

1. Generate a key pair; Android has already been completed but IOS needs some work; this is where you can start, there is some code already in Dinara_Mobile_RN\modules\crypto-keep\ios\CryptoKeepModule.swift but I haven't been able to test this out as I dont have an IOS device. [docs on key pair generation](https://developer.apple.com/documentation/security/generating-new-cryptographic-keys) There are a lot of resources out there, I usually go straight to the docs. We should make it native, meaning no third party libraries for generating the keypair at least
2. After you have generated the keypair, then it should be stored in the Keychain for IOS
3. After generation and storage, we can send the public part of the keypair to a backend, I will create this later. This happens on the users frontend but we should think of a way of providing it to the frontend for a short time
4. After sending the public key to your backend, now your device can "sign" a JWT token with the private key and send it to the backend to be decoded. [More on signing JWT with private key on IOS](https://developer.apple.com/documentation/appstoreconnectapi/generating-tokens-for-api-requests)
5. Make some tests, try to break it and make sure everything is good to go

# References

- [Get Started with Expo Modules](https://docs.expo.dev/modules/get-started/)
- [Good Tutorial on Custom Modules](https://youtu.be/UczTzTBYRhA?t=1932) -[docs on key pair generation](https://developer.apple.com/documentation/security/generating-new-cryptographic-keys) -[More on signing JWT with private key on IOS](https://developer.apple.com/documentation/appstoreconnectapi/generating-tokens-for-api-requests)

# Run locally

1. cd into KeyPairSign root directory
2. `npx expo prebuild --clean`
3. Depending on device `npm run:ios || npm run:android`
