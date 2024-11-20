import { create } from "zustand";
import * as LocalAuthentication from "expo-local-authentication";
import { AuthenticationType } from "expo-local-authentication";

export interface IBiometricsStore {
  hasCompatibleHardware: boolean;
  hasBiometricsEnrolled: boolean;
  availableAuthenticationTypes: AuthenticationType[] | undefined;
  enrolledLevel: number;
  checkHardwareAndEnrollment: () => Promise<void>;
}

const useBiometricsStore = create<IBiometricsStore>((set) => ({
  hasCompatibleHardware: false,
  hasBiometricsEnrolled: false,
  availableAuthenticationTypes: undefined,
  enrolledLevel: 0,
  checkHardwareAndEnrollment: async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      set({ hasCompatibleHardware: compatible });

      if (compatible) {
        const availableAuthenticationTypes =
          await LocalAuthentication.supportedAuthenticationTypesAsync();
        // console.log(availableAuthenticationTypes, "auth types"); // [1, 2, 3] for Face, Touch, Optic
        const enrolledLevel = await LocalAuthentication.getEnrolledLevelAsync();
        // console.log(enrolledLevel, "enroll level"); // 0 NONE, 1 PIN PATTERN, 2 BIOMETRIC
        const hasRecords = await LocalAuthentication.isEnrolledAsync();
        set({
          hasBiometricsEnrolled: hasRecords,
          availableAuthenticationTypes,
          enrolledLevel,
        });
      } else {
        console.warn("*** incompatible hardware for biometrics ***");
      }
    } catch (e) {
      console.warn(e);
    }
  },
}));

export default useBiometricsStore;
