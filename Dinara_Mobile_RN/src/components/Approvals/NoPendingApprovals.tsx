import React from "react";
import { View } from "react-native";
import Typography from "@components/ZCommon/Typography";

export default function NoPendingApprovals() {
  return (
    <View
      style={{
        backgroundColor: "#16161d",
        flex: 1,
        padding: 25,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
      }}
    >
      <Typography weight="extraLight" size={15}>
        No requests pending
      </Typography>
    </View>
  );
}
