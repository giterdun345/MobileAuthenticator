import { useState, useEffect } from "react";
import { Stack } from "expo-router";
import {
  useFonts,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import HeaderLogo from "@components/Layout/HeaderLogo";
import SettingsButton from "@components/Layout/Settings/SettingsButton";
import SettingsMenu from "@components/Layout/Settings/SettingsMenu";
import useBiometricsStore, {
  IBiometricsStore,
} from "src/stores/biometricsStore";

SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function RootLayout() {
  const [openSettingsMenu, setOpenSettingsMenu] = useState(false);
  const availableAuthenticationTypes = useBiometricsStore(
    (state: IBiometricsStore) => state.availableAuthenticationTypes
  );
  const checkHardwareAndEnrollment = useBiometricsStore(
    (state) => state.checkHardwareAndEnrollment
  );

  const [fontsLoaded, fontError] = useFonts({
    Inter200: Inter_200ExtraLight,
    Inter300: Inter_300Light,
    Inter400: Inter_400Regular,
    Inter500: Inter_500Medium,
    Inter600: Inter_600SemiBold,
    Inter700: Inter_700Bold,
  });

  useEffect(() => {
    checkHardwareAndEnrollment();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError || availableAuthenticationTypes) {
      setTimeout(() => SplashScreen.hideAsync(), 300);
    }
  }, [fontsLoaded, fontError, availableAuthenticationTypes]);

  if (!fontsLoaded && !fontError) {
    return;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#16161d",
          },

          headerTitleStyle: {
            fontWeight: "bold",
            fontFamily: "Inter700",
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerBackVisible: false,
            headerTitle: () => <HeaderLogo sx={{ marginRight: 50 }} />,
            headerRight: () => (
              <SettingsButton setOpenSettingsMenu={setOpenSettingsMenu} />
            ),
          }}
        />
      </Stack>
      <SettingsMenu
        isVisible={openSettingsMenu}
        onClose={() => setOpenSettingsMenu(false)}
      />
    </>
  );
}

// COLORS
// $modal-overlay: rgba(252,245,221, 0.5);
// $black3: #16161d;
// $black2: #0f0f13;
// $black: #09090e;
// $green: #65ca68;
// $dinaragreen: #00e29e;
// $gold: #e9a145;
// $nav-background: #16161d;
// $active-nav-background: #24252a;
// $nav-item: rgba(255, 255, 255, 0.61);
// $deadblack: #000000;
// $disabledgrey: #524c4c;
// $primary-red: #d41b48;
// $secondaryGold: #ffde6a;
// $dinarablue: #abd8fc;
