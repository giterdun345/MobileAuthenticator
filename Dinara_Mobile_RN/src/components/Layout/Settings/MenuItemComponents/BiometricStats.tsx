import { View } from "react-native";
import KeyValuePair from "./KeyValuePair";
import useBiometricsStore from "src/stores/biometricsStore";

export default function BiometricStats() {
  const hasBiometricsEnrolled = useBiometricsStore(
    (state) => state.hasBiometricsEnrolled
  );
  const hasCompatibleHardware = useBiometricsStore(
    (state) => state.hasCompatibleHardware
  );
  const availableAuthenticationTypes = useBiometricsStore(
    (state) => state.availableAuthenticationTypes
  );
  const enrolledLevel = useBiometricsStore((state) => state.enrolledLevel);

  return (
    <View style={{ marginLeft: 33, marginTop: -50, marginBottom: 25 }}>
      <KeyValuePair
        valueKey="Device Compatibility"
        value={hasCompatibleHardware ? "Compatible" : "Not Compatible"}
      />
      <KeyValuePair
        valueKey="Available Types"
        value={
          availableAuthenticationTypes
            ?.map((type) =>
              type === 1
                ? "Fingerprints"
                : type === 2
                ? "Facial Recognition"
                : type === 3
                ? "Iris Recognition"
                : "Not Available"
            )
            .join(", ") || "Not available"
        }
      />
      <KeyValuePair
        valueKey="Biometrics Enrolled"
        value={hasBiometricsEnrolled ? "Enrolled" : "Not Enrolled"}
      />

      <KeyValuePair
        valueKey="Enrollment Level"
        value={
          enrolledLevel === 2
            ? "Biometircs"
            : enrolledLevel === 1
            ? "Passcode"
            : "Not Available"
        }
      />
    </View>
  );
}
