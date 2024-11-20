import { useState } from "react";
import { Stack, router } from "expo-router";
import { View } from "react-native";
import JkButton from "@components/ZCommon/JkButton";
import Typography from "@components/ZCommon/Typography";
import SettingsButton from "@components/Layout/Settings/SettingsButton";
import BarCodeScanner from "@components/Onboarding/barCodeScanner";
import SettingsMenu from "@components/Layout/Settings/SettingsMenu";
import HeaderLogo from "@components/Layout/HeaderLogo";
import useAppConfigStore from "src/stores/applicationConfigStore";
import useUserInfoStore from "src/stores/userInfoStore";

export default function StartConfiguration() {
  const configurationComplete = useAppConfigStore(
    (state) => state.configurationComplete
  );
  const userInfo = useUserInfoStore((state) => state.userInfo);

  const [openScanner, setOpenScanner] = useState(false);
  const [openSettingsMenu, setOpenSettingsMenu] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#09090e",
        padding: 23,
        height: "100%",
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: "",
          headerBackVisible: false,
          headerRight: () => (
            <SettingsButton setOpenSettingsMenu={setOpenSettingsMenu} />
          ),
        }}
      />

      {openScanner ? (
        <BarCodeScanner setOpenScanner={setOpenScanner} />
      ) : (
        <>
          <HeaderLogo height={40} />
          <Typography
            weight="bold"
            size={40}
            sx={{ marginTop: 80, marginBottom: 40 }}
          >
            {`Welcome ${userInfo ? "back" : ""}`}
          </Typography>

          <JkButton
            title={userInfo ? "Continue" : "Start app configuration"}
            onPress={() =>
              configurationComplete
                ? router.replace("/")
                : userInfo
                ? router.replace("/OnboardingScreen")
                : setOpenScanner(true)
            }
            variant="contained"
          />
        </>
      )}
      <SettingsMenu
        isVisible={openSettingsMenu}
        onClose={() => setOpenSettingsMenu(false)}
      />
    </View>
  );
}
