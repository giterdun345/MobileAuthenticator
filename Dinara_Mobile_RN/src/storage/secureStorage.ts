import * as SecureStorage from "expo-secure-store";
import Alerting from "@components/ZCommon/Alerting";

type TSecureDataKeys =
  | "userInfo_dev"
  | "userInfo_uat"
  | "userInfo_prod"
  | "expoPushToken_dev"
  | "expoPushToken_uat"
  | "expoPushToken_prod";

export const saveSecureData = async (key: TSecureDataKeys, value: any) => {
  // Size limit for a value is 2048 bytes
  // On Android, values are stored in SharedPreferences, encrypted with Android's Keystore system.
  // For iOS standalone apps, data stored with expo-secure-store can persist across app installs.
  // On iOS, values are stored using the keychain services as kSecClassGenericPassword.
  // iOS has the additional option of being able to set the value's kSecAttrAccessible attribute, which controls when the value is available to be fetched.
  // iOS Export Compliance Information: https://developer.apple.com/documentation/security/complying_with_encryption_export_regulations

  try {
    const stringifiedValue = JSON.stringify(value);
    await SecureStorage.setItemAsync(key, stringifiedValue);
  } catch (error: any) {
    Alerting({
      title: `Error saving in secure storage for ${key}`,
      message: error?.message,
      severity: "destructive",
    });
  }
};

export const fetchSecureData = async (key: TSecureDataKeys) => {
  let attempts = 0;
  while (attempts < 5) {
    try {
      const foundValue = await SecureStorage.getItemAsync(key);

      if (foundValue !== null) {
        return JSON.parse(foundValue);
      } else {
        console.log("No value found for ", key, " in secure storage");
        return null;
      }
    } catch (error) {
      await SecureStorage.deleteItemAsync(key);
      Alerting({
        title: "Error reading data from secure storage",
        message: `Error fetching ${key}; Attempt: ${attempts}`,
        severity: "destructive",
      });
      attempts++;
    }
  }
};

export const deleteSecureData = async (key: TSecureDataKeys) => {
  return await SecureStorage.deleteItemAsync(key).then(() => {
    Alerting({
      title: `${key} deleted`,
      message: `${key} deleted, context adjusted after reload`,
      severity: "default",
    });
  });
};
