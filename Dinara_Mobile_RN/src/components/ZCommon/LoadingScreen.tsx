import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import Typography from "./Typography";

export default function LoadingScreen() {
  const [color, setColor] = useState("teal");
  useEffect(() => {
    const id = setInterval(() => {
      setColor((color) => (color == "#b2f6e1" ? "#00e29e" : "#b2f6e1"));
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#16161d",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={color} />
        <Typography
          sx={{
            marginTop: 12,
          }}
          weight="semiBold"
          size={20}
        >
          Loading...
        </Typography>
      </View>
    </View>
  );
}
