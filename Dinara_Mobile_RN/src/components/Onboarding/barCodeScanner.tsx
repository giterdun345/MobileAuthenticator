import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
  Camera,
} from "expo-camera/next";
import { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import { StyleSheet, View, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Typography from "@components/ZCommon/Typography";
import useUserInfoStore from "src/stores/userInfoStore";
import Erroring from "@components/ZCommon/Erroring";
import useAppConfigStore from "src/stores/applicationConfigStore";

interface IBarCodeScanner {
  setOpenScanner: (arg0: boolean) => void;
}

export default function BarCodeScanner({ setOpenScanner }: IBarCodeScanner) {
  const [permission, requestPermission] = useCameraPermissions();
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);
  const [retryCameraPermissions, setRetryCameraPermissions] = useState(false);
  const environment = useAppConfigStore((state) => state.env);

  useEffect(() => {
    requestPermission();
  }, [retryCameraPermissions]);

  if (!permission || !permission.granted) {
    Camera.requestCameraPermissionsAsync()
      .then(() => {
        setRetryCameraPermissions(true);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={(scanningResult: BarcodeScanningResult) => {
          setUserInfo(scanningResult.data, environment);
          console.log("Reading qr code", scanningResult.data);
          if (scanningResult.data) {
            setOpenScanner(false);
            router.replace("/OnboardingScreen");
          } else {
            <Erroring errorMessage="No data found" />;
          }
        }}
        onMountError={(error) => console.error(error)}
        zoom={0.5}
      >
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => setOpenScanner(false)}
            style={{ alignSelf: "flex-start", marginTop: 20 }}
          >
            <AntDesign
              name="close"
              color="#fff"
              size={40}
              style={{ marginTop: -15 }}
            />
          </Pressable>
          <Typography weight="semiBold" size={10} sx={{ marginTop: 40 }}>
            Please scan the QR code from the Dinara platform.
          </Typography>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        />
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#09090e",
    padding: 20,
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    height: "90%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    zIndex: 10,
    display: "flex",
  },
});
