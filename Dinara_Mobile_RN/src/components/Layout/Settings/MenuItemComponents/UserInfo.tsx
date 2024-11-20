import { View, TouchableOpacity, Clipboard } from "react-native";
import Typography from "@components/ZCommon/Typography";
import useUserInfoStore from "src/stores/userInfoStore";
import parseJwt from "src/utils/parseJWT";
import { IUserData } from "@components/ZCommon/commonTypes/commonTypes";

export default function UserInfo() {
  const userInfo = useUserInfoStore((state) => state.userInfo);
  // TODO: refactor to parse string in line above
  const parsedUserInfo: IUserData = userInfo
    ? parseJwt(userInfo)?.payload
    : { userId: "", deviceId: "" };
  const { userId, deviceId } = parsedUserInfo;

  const copyToClipboard = (copiedText: string) => {
    Clipboard.setString(copiedText);
  };

  return (
    <View style={{ marginTop: -50, marginBottom: 25, marginLeft: 33 }}>
      <Typography
        weight="semiBold"
        size={15}
        sx={{ marginTop: 10, marginBottom: 10, flexWrap: "wrap" }}
      >
        {`User Id: ${userId || "Not available"}`}
      </Typography>
      {userId && (
        <TouchableOpacity
          style={{ marginTop: -5, marginBottom: 10 }}
          onPress={() => copyToClipboard(userId)}
        >
          <Typography weight="medium" size={10} color="#00e29e">
            Copy
          </Typography>
        </TouchableOpacity>
      )}
      <Typography
        weight="semiBold"
        size={15}
        sx={{ marginTop: 10, marginBottom: 10, flexWrap: "wrap" }}
      >
        {`Device Id: ${deviceId || "Not available"}`}
      </Typography>
      {deviceId && (
        <TouchableOpacity
          style={{ marginTop: -5, marginBottom: 10 }}
          onPress={() => copyToClipboard(deviceId)}
        >
          <Typography weight="medium" size={10} color="#00e29e">
            Copy
          </Typography>
        </TouchableOpacity>
      )}
    </View>
  );
}
