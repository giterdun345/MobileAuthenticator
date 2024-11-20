import { envTypes } from "@components/ZCommon/commonTypes/commonTypes";

export default function identifyEnvURL(currentSetting: envTypes) {
  switch (currentSetting) {
    case "dev":
      return process.env.EXPO_PUBLIC_DEV_API_URL;
    case "uat":
      return process.env.EXPO_PUBLIC_UAT_API_URL;
    case "prod":
      return process.env.EXPO_PUBLIC_PROD_API_URL;
    default:
      return process.env.EXPO_PUBLIC_DEV_API_URL;
  }
}
