import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { envTypes } from "@components/ZCommon/commonTypes/commonTypes";
import Alerting from "@components/ZCommon/Alerting";
// import * as Updates from 'expo-updates';

// async function onFetchUpdateAsync() {
//   try {
//     const update = await Updates.checkForUpdateAsync();

//     if (update.isAvailable) {
//       await Updates.fetchUpdateAsync();
//       await Updates.reloadAsync();
//     }
//   } catch (error) {
//     // You can also add an alert() to see the error message in case of an error when fetching updates.
//     alert(`Error fetching latest Expo update: ${error}`);
//   }
// }

interface IApplicationConfigStore {
  env: envTypes;
  toggleEnv: (env: IApplicationConfigStore["env"]) => void;
  configurationComplete: boolean;
  getConfigurationComplete: (env: envTypes) => void;
  setConfigurationComplete: (status: boolean, env: envTypes) => any;
}

const useAppConfigStore = create<IApplicationConfigStore>((set) => ({
  env:
    process.env.NODE_ENV === "development"
      ? "dev"
      : process.env.NODE_ENV === "production"
      ? "prod"
      : "uat",
  toggleEnv: (env) => set(() => ({ env })),
  configurationComplete: true,
  getConfigurationComplete: async (env) => {
    try {
      const value = await AsyncStorage.getItem(`configurationCompleted_${env}`);
      if (value === "true") {
        set(() => ({ configurationComplete: true }));
      } else {
        set(() => ({ configurationComplete: false }));
      }
    } catch (e: any) {
      Alerting({
        title: `Error reading configurationCompleted_${env}`,
        message: e?.message,
        severity: "destructive",
      });
    }
  },
  // ASYNC STORAGE  added here to remediate circular issue with env
  setConfigurationComplete: async (status: boolean, env) => {
    try {
      await AsyncStorage.setItem(
        `configurationCompleted_${env}`,
        status.toString()
      );
    } catch (e: any) {
      Alerting({
        title: `Error saving configurationCompleted_${env}`,
        message: e?.message,
        severity: "destructive",
      });
    }
    set(() => ({ configurationComplete: status }));
  },
}));

export default useAppConfigStore;
