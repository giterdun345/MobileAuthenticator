import { View, StyleSheet } from "react-native";

export default function StepIndicator({
  screenIndex,
}: {
  screenIndex: number;
}) {
  return (
    <View style={styles.stepIndicatorContainer}>
      {Array.from({ length: 4 }).map((_, index) => (
        <View
          key={index}
          style={
            index === screenIndex
              ? styles.activeStepIndicator
              : styles.stepIndicator
          }
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stepIndicatorContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 30,
  },
  stepIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: "grey",
    borderRadius: 10,
  },
  activeStepIndicator: {
    flex: 1,
    height: 4,
    backgroundColor: "#00e29e",
    borderRadius: 10,
  },
});
