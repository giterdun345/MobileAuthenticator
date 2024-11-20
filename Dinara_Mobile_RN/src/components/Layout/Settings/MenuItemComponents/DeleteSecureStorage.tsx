import { View } from "react-native";
import Typography from "@components/ZCommon/Typography";
import JkButton from "@components/ZCommon/JkButton";
import useAppConfigStore from "src/stores/applicationConfigStore";
import useUserInfoStore from "src/stores/userInfoStore";
import { deleteSecureData } from "src/storage/secureStorage";

export default function DeleteSecureStorage() {
  const environment = useAppConfigStore((state) => state.env);
  const setConfigurationComplete = useAppConfigStore(
    (state) => state.setConfigurationComplete
  );
  const deleteUserInfo = useUserInfoStore((state) => state.deleteUserInfo);

  const deleteInfoAndToken = async () => {
    await deleteUserInfo(environment);
    await deleteSecureData(`expoPushToken_${environment}`);
    await setConfigurationComplete(false, environment);
  };

  return (
    <View style={{ marginTop: -50, marginBottom: 25 }}>
      <Typography
        weight="light"
        size={15}
        sx={{ alignSelf: "center", marginTop: 10, marginBottom: 10 }}
      >
        Press reload in expo terminal to see changes
      </Typography>

      <JkButton
        title="Delete"
        onPress={deleteInfoAndToken}
        variant="outlined"
        sx={{ height: 35, padding: 1, width: "80%", alignSelf: "center" }}
      />
    </View>
  );
}
