import {
  requestPermissionsAsync,
  setNotificationChannelAsync,
  AndroidImportance,
  ExpoPushToken,
  getExpoPushTokenAsync,
} from "expo-notifications";
import { Platform } from "react-native";
import * as Device from "expo-device";
import useNotificationsStore from "src/stores/notificationsStore";
import Constants from "expo-constants";
import { saveSecureData } from "src/storage/secureStorage";
import { envTypes } from "@components/ZCommon/commonTypes/commonTypes";
import Alerting from "@components/ZCommon/Alerting";

type ExpoToken = ExpoPushToken | undefined;

export default async function registerForPushNotificationsAsync(
  environment: envTypes
): Promise<ExpoToken> {
  if (!Device.isDevice) {
    alert("Must use physical device for Push Notifications");
    return undefined;
  }

  // prettier-ignore
  const setNotificationsEnabled = useNotificationsStore.getState().setNotificationsEnabled;
  const { status } = await requestPermissionsAsync();

  if (status !== "granted") {
    setNotificationsEnabled(false);
  } else {
    setNotificationsEnabled(true);
  }

  if (Platform.OS === "android") {
    setNotificationChannelAsync("default", {
      name: "default",
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#00e29e",
    });
  }

  let expoPushToken: ExpoPushToken | undefined = undefined;
  try {
    expoPushToken = await getExpoPushTokenAsync({
      projectId: Constants?.expoConfig?.extra?.eas?.projectId,
    });
  } catch (error: any) {
    Alerting({
      title: "Error getting push token",
      message: error?.message,
      severity: "destructive",
    });
  }

  saveSecureData(`expoPushToken_${environment}`, expoPushToken);

  console.log(
    `Push notifications ${status}. ExpoPushToken: ${JSON.stringify(
      expoPushToken
    )}`
  );

  return expoPushToken;
}
