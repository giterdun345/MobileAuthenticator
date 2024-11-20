import { useState } from "react";
import { IApprovalRowData } from "@components/Approvals/approvalTypes";
import { View, TextInput, ScrollView } from "react-native";
import Typography from "@components/ZCommon/Typography";
import MapViewComponent from "../MapView";
import ApprovalRowData from "../ApprovalRowData";
import ApproveRejectButtons from "../ApproveRejectButtons";

export default function LoginDetails({
  approvalData,
  latitude,
  longitude,
}: {
  approvalData: IApprovalRowData;
  latitude: number;
  longitude: number;
}) {
  const [code, setCode] = useState("");

  return (
    <ScrollView style={{ marginTop: 20, padding: 20 }}>
      <ApprovalRowData approvalData={approvalData} />

      <View
        style={{
          margin: 30,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#09090e",
        }}
      >
        <View>
          <Typography weight="semiBold" size={25} sx={{ marginBottom: 10 }}>
            Login code
          </Typography>
        </View>
        <TextInput
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          returnKeyType="done"
          textContentType="oneTimeCode"
          maxLength={2}
          placeholderTextColor="#017470"
          style={{
            width: 100,
            height: 100,
            backgroundColor: "#FCF5DD",
            padding: 16,
            fontSize: 50,
            textAlign: "center",
            fontWeight: "bold",
            borderRadius: 5,
          }}
        />
      </View>

      <View>
        {latitude && longitude && (
          <MapViewComponent lat={latitude} long={longitude} />
        )}
      </View>

      <ApproveRejectButtons code={code} approvalId={approvalData?.approvalId} />
    </ScrollView>
  );
}
