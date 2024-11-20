// Import the native module. On web, it will be resolved to CryptoKeep.web.ts
// and on native platforms to CryptoKeep.ts
import CryptoKeepModule from "./src/CryptoKeepModule";

export function getPublicKey(): string {
  return CryptoKeepModule.getPublicKey();
}

export async function provideSignature(
  userId: string,
  deviceId: string,
  url: string
) {
  return await CryptoKeepModule.provideSignature(userId, deviceId, url);
}
