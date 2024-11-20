import { useState } from "react";
import { router } from "expo-router";
import Constants from "expo-constants";
import Typography from "@components/ZCommon/Typography";
import { View, TouchableOpacity, FlatList, Pressable } from "react-native";
import useAppConfigStore from "src/stores/applicationConfigStore";
import useUserInfoStore from "src/stores/userInfoStore";
import useNotificationsStore from "src/stores/notificationsStore";
import { envTypes } from "@components/ZCommon/commonTypes/commonTypes";

export default function Version({
  setClose,
}: {
  setClose: (arg: boolean) => void;
}) {
  const toggleEnv = useAppConfigStore((state) => state.toggleEnv);
  const getUserInfo = useUserInfoStore((state) => state.getUserInfo);
  const getNotificationsEnabled = useNotificationsStore(
    (state) => state.getNotificationsEnabled
  );

  const environment = useAppConfigStore((state) => state.env);
  const [longPressed, setLongPressed] = useState(false);

  return (
    <>
      <TouchableOpacity
        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        onLongPress={() => {
          setLongPressed(!longPressed);
        }}
      >
        <View style={{ marginTop: -50, marginBottom: 25, marginLeft: 33 }}>
          <Typography weight="semiBold">{`Version: ${
            Constants.expoConfig?.version || "N/A"
          }`}</Typography>
          {longPressed && (
            <Typography weight="semiBold">{`Environment: ${
              environment || "N/A"
            }`}</Typography>
          )}
        </View>
      </TouchableOpacity>

      {longPressed && (
        <FlatList
          style={{ flex: 1 }}
          scrollEnabled
          data={["DEV", "UAT", "PROD"]}
          contentContainerStyle={{ marginLeft: 33 }}
          renderItem={({ item }) => (
            <>
              <Pressable
                style={{
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 50,
                }}
                onPress={async () => {
                  toggleEnv(item.toLowerCase() as envTypes);
                  getNotificationsEnabled();
                  await getUserInfo(item.toLowerCase() as envTypes);

                  setClose(true);
                  router.replace("/");
                }}
              >
                <Typography weight="regular">{item}</Typography>
              </Pressable>
            </>
          )}
        />
      )}
    </>
  );
}
