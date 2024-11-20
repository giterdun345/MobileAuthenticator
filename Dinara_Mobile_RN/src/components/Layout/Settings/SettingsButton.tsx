import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function SettingsButton({
  setOpenSettingsMenu,
}: {
  setOpenSettingsMenu: (arg0: boolean) => void;
}) {
  return (
    <View>
      <FontAwesome.Button
        name="cog"
        size={24}
        backgroundColor="#16161d"
        onPress={() => {
          setOpenSettingsMenu(true);
        }}
        color="#00e29e"
      />
    </View>
  );
}
