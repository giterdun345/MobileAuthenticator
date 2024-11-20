import AsyncStorage from "@react-native-async-storage/async-storage";
import useAppConfigStore from "src/stores/applicationConfigStore";
import Alerting from "@components/ZCommon/Alerting";

type TAsyncDataKeys =
  | "userInfo"
  | "notificationsEnabled"
  | "configurationComplete";

export const storeData = async (key: TAsyncDataKeys, value: string) => {
  const environment = useAppConfigStore.getState().env;
  try {
    await AsyncStorage.setItem(`${key}_${environment}`, value);
  } catch (e: any) {
    Alerting({
      title: "Error storing data",
      message: e?.message,
      severity: "destructive",
    });
  }
};

export const fetchData = async (key: TAsyncDataKeys) => {
  const environment = useAppConfigStore.getState().env;
  try {
    const value = await AsyncStorage.getItem(`${key}_${environment}`);
    if (value !== null) {
      return value;
    }
  } catch (e: any) {
    Alerting({
      title: "Error reading data",
      message: e?.message,
      severity: "destructive",
    });
  }

  return undefined;
};
