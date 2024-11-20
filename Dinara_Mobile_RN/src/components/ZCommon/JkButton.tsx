import { Pressable } from "react-native";
import Typography from "./Typography";

export default function JkButton({
  title,
  onPress,
  disabled,
  sx,
  variant,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  sx?: any;
  variant: "contained" | "outlined";
}) {
  if (variant === "contained") {
    return (
      <Pressable
        disabled={disabled}
        android_ripple={{
          color: "#005a3f",
        }}
        style={{
          backgroundColor: "#00e29e",
          padding: 20,
          borderRadius: 2,
          width: "80%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          borderCurve: "circular",
          pointerEvents: "auto",
          backfaceVisibility: "visible",
          shadowColor: "#fefe",
          ...sx,
        }}
        onPress={onPress}
      >
        <Typography weight="semiBold" color="black">
          {title}
        </Typography>
      </Pressable>
    );
  }

  if (variant === "outlined") {
    return (
      <Pressable
        pressRetentionOffset={{ bottom: 50, left: 50, right: 50, top: 50 }}
        android_ripple={{
          color: "black",
        }}
        style={{
          padding: 20,
          borderRadius: 2,
          backgroundColor: "transparent",

          pointerEvents: "auto",
          borderWidth: 1,
          width: "80%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",

          borderCurve: "circular",
          backfaceVisibility: "visible",
          shadowColor: "#fefe",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 1,
          shadowRadius: 7.49,
          elevation: 0.5,

          ...sx,
        }}
        onPress={onPress}
      >
        <Typography weight="semiBold" color="white">
          {title}
        </Typography>
      </Pressable>
    );
  }
}
