import * as LocalAuthentication from "expo-local-authentication";

export const biometricAuthentication = async (): Promise<
  LocalAuthentication.LocalAuthenticationResult | string
> => {
  let authResult;
  try {
    authResult = await LocalAuthentication.authenticateAsync();
  } catch (error) {
    alert(error);
    return error as string;
  }
  return authResult;
};
