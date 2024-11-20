import { View, Switch } from "react-native";
import Typography from "@components/ZCommon/Typography";
import useNotificationsStore from "src/stores/notificationsStore";

export default function EnableDisableNotifications() {
  const notificationsEnabled = useNotificationsStore(
    (state) => state.notificationsEnabled
  );
  const setNotificationsEnabled = useNotificationsStore(
    (state) => state.setNotificationsEnabled
  );

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        marginLeft: 33,
        marginTop: -35,
        marginBottom: 25,
        gap: 20,
      }}
    >
      <Typography
        weight="semiBold"
        sx={{ alignSelf: "center", marginTop: 10, marginBottom: 10 }}
      >
        {notificationsEnabled ? "Enabled" : "Disabled"}
      </Typography>
      <Switch
        trackColor={{ false: "#767577", true: "#65ca68" }}
        thumbColor={notificationsEnabled ? "#65ca68" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
        value={notificationsEnabled}
      />
    </View>
  );
}
