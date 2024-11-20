import { View } from "react-native";
import Typography from "@components/ZCommon/Typography";

export default function KeyValuePairs({
  field,
  value,
}: {
  field: string;
  value: string | number | undefined;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 5,
        backgroundColor: "#16161d",
        margin: 3,
        borderRadius: 10,
        paddingHorizontal: 13,
        paddingVertical: 5,
        shadowColor: "white",
        shadowOffset: { width: 50, height: 100 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        overflow: "hidden",
      }}
    >
      <Typography weight="light" size={13}>
        {`${field}: `}
      </Typography>
      <View
        style={{
          alignSelf: "flex-end",
          width: "auto",
          maxWidth: "88%",
        }}
      >
        <Typography
          weight="medium"
          size={13}
          elipsisMode="tail"
          sx={{
            overflow: "hidden",
          }}
        >
          {value || "N/A"}
        </Typography>
      </View>
    </View>
  );
}
