import { useState, ReactNode } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Linking,
} from "react-native";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Typography from "@components/ZCommon/Typography";
import DeleteSecureStorage from "./MenuItemComponents/DeleteSecureStorage";
import JkButton from "@components/ZCommon/JkButton";
import UserInfo from "./MenuItemComponents/UserInfo";
import EnableDisableNotifications from "./MenuItemComponents/EnableDisableNotifications";
import BiometricStats from "./MenuItemComponents/BiometricStats";
import Version from "./MenuItemComponents/Version";

interface IMenuList {
  text: string;
  icon?: any;
  open: boolean;
  setOpen: (arg0: boolean) => void;
  Component: ReactNode;
}
export default function SettingsMenu({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const [notificationsDropdown, setNotificationsDropdown] = useState(false);
  const [biometricsDropdown, setBiometricsDropdown] = useState(false);
  const [userInfoDropdown, setUserInfoDropdown] = useState(false);
  const [privacyDrop, setPrivacyDrop] = useState(false);
  const [secureStorageDrop, setSecureStorageDrop] = useState(false);
  const [versionDrop, setVersionDrop] = useState(false);
  const [tosDrop, setTosDrop] = useState(false);
  const [onboardingDrop, setOnboardingDrop] = useState(false);

  const menuList: IMenuList[] = [
    {
      text: "User Info",
      open: userInfoDropdown,
      setOpen: setUserInfoDropdown,
      Component: <UserInfo />,
    },
    {
      text: "Notifications",
      open: notificationsDropdown,
      setOpen: setNotificationsDropdown,
      Component: <EnableDisableNotifications />,
    },
    {
      text: "Biometrics",
      open: biometricsDropdown,
      setOpen: setBiometricsDropdown,
      Component: <BiometricStats />,
    },
    {
      text: "Version",
      open: versionDrop,
      setOpen: setVersionDrop,
      Component: <Version setClose={setVersionDrop} />,
    },
    {
      text: "Privacy Policy",
      open: privacyDrop,
      setOpen: setPrivacyDrop,
      Component: (
        <JkButton
          title="Open"
          onPress={() =>
            Linking.openURL("https://app.dinara.com/privacy-and-cookie-policy")
          }
          variant="outlined"
          sx={{
            height: 35,
            padding: 1,
            marginTop: -25,
            marginBottom: 25,
            alignSelf: "center",
          }}
        />
      ),
    },
    {
      text: "Terms of Service",
      open: tosDrop,
      setOpen: setTosDrop,
      Component: (
        <JkButton
          title="Open"
          onPress={() =>
            Linking.openURL("https://app.dinara.com/terms-of-service")
          }
          variant="outlined"
          sx={{
            height: 35,
            padding: 1,
            marginTop: -25,
            marginBottom: 25,
            alignSelf: "center",
          }}
        />
      ),
    },
  ];

  if (process.env.NODE_ENV === "development") {
    menuList.push(
      {
        text: "Delete Secure Storage",
        open: secureStorageDrop,
        setOpen: setSecureStorageDrop,
        Component: <DeleteSecureStorage />,
      },

      {
        text: "Onboarding",
        open: onboardingDrop,
        setOpen: setOnboardingDrop,
        Component: (
          <JkButton
            title="Repeat Onboarding"
            variant="outlined"
            sx={{
              height: 35,
              padding: 1,
              marginTop: -25,
              marginBottom: 25,
              alignSelf: "center",
            }}
            onPress={() => {
              router.replace("/OnboardingScreen");
              onClose();
            }}
          />
        ),
      }
    );
  }

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.settinsMenuHeader}>
          <Text style={styles.settingsMenuTitle}>Settings</Text>
          <Pressable onPress={onClose}>
            <AntDesign name="close" color="#fff" size={40} />
          </Pressable>
        </View>

        <FlatList
          style={{ flex: 1 }}
          scrollEnabled
          data={menuList}
          contentContainerStyle={{}}
          renderItem={({ item }) => (
            <>
              <Pressable
                style={styles.menuItemRow}
                onPress={() => {
                  item.setOpen(!item.open);
                }}
              >
                <Typography weight="regular">{item.text}</Typography>
                {item.open ? (
                  <AntDesign name="caretup" color="#fff" size={20} />
                ) : (
                  <AntDesign name="caretdown" color="#fff" size={20} />
                )}
              </Pressable>
              {item.open && item.Component}
            </>
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "100%",
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    top: 0,
  },

  settinsMenuHeader: {
    backgroundColor: "#464C55",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 50,
  },

  settingsMenuTitle: {
    color: "#fff",
    fontSize: 16,
  },

  menuItemRow: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 50,
  },
});
