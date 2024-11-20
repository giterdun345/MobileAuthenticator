import { create } from "zustand";
import {
  fetchSecureData,
  deleteSecureData,
  saveSecureData,
} from "src/storage/secureStorage";
import { envTypes } from "@components/ZCommon/commonTypes/commonTypes";

interface IUserInfoStore {
  userInfo: string | undefined | null; // IUserData
  getUserInfo: (env: envTypes) => Promise<void>;
  setUserInfo: (jwt: string, env: envTypes) => void;
  deleteUserInfo: (env: envTypes) => Promise<void>;
}

const useUserInfoStore = create<IUserInfoStore>((set) => ({
  userInfo: undefined,

  getUserInfo: async (env) => {
    return await fetchSecureData(`userInfo_${env}`).then(
      (data: string | undefined | null) => set({ userInfo: data })
    );
  },

  setUserInfo: async (qrCodeData, env) => {
    return await fetchSecureData(`userInfo_${env}`).then((data: string) => {
      saveSecureData(`userInfo_${env}`, qrCodeData);
      set({ userInfo: data });
    });
  },

  deleteUserInfo: async (env) => {
    await deleteSecureData(`userInfo_${env}`);
    set({ userInfo: undefined });
  },
}));

export default useUserInfoStore;
