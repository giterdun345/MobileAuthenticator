import { View } from "react-native";
import { router } from "expo-router";
import Typography from "./Typography";
import JkButton from "./JkButton";

export default function Erroring({
  errorComponent,
  errorMessage = "There has been an error. Please try again, if the issue persists please contact your relationship manager.",
  allowRedirect,
  smallText,
}: {
  errorComponent?: React.ReactNode;
  errorMessage?: string;
  allowRedirect?: boolean;
  smallText?: boolean;
}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#09090e",
        padding: 23,
      }}
    >
      {errorComponent ? (
        errorComponent
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Typography weight="bold" color="#E00043" size={30}>
            Error
          </Typography>
          <Typography weight="bold" size={smallText ? 15 : 30}>
            {errorMessage}
          </Typography>
          {allowRedirect && (
            <JkButton
              title="Back"
              variant="outlined"
              onPress={() => {
                router.replace("/");
              }}
              sx={{
                margin: 13,
                justifyContent: "flex-start",
              }}
            />
          )}
        </View>
      )}
    </View>
  );
}
