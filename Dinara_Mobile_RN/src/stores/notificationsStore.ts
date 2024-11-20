import { create } from "zustand";
import { fetchData, storeData } from "src/storage/asyncStorage";

interface INotificationsStore {
  notificationsEnabled: boolean;
  getNotificationsEnabled: () => void;
  setNotificationsEnabled: (notificationsEnabled: boolean) => void;
  // notifications: undefined | string | null; // IUserData
  // getNotifications: () => Promise<void>;
  // deleteNotifications: () => Promise<void>;
}

const useNotificationsStore = create<INotificationsStore>((set) => ({
  notificationsEnabled: true,
  getNotificationsEnabled: async () => {
    await fetchData("notificationsEnabled").then((data) =>
      set({ notificationsEnabled: data === "true" })
    );
  },
  setNotificationsEnabled: async (notificationsEnabled) => {
    await storeData("notificationsEnabled", notificationsEnabled.toString());
    set({ notificationsEnabled });
  },

  // notifications: undefined,
  // getNotifications: async () => {},
  // deleteNotifications: async () => {
  //   // await deleteSecureData("notifications");
  // },
}));

export default useNotificationsStore;
