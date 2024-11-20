import { Alert, AlertButton } from "react-native";

export default function Alerting({
  title,
  message,
  severity,
  onDismiss,
}: {
  title: string;
  message: string;
  severity: "destructive" | "default" | "tryAgain";
  onDismiss?: () => void;
}) {
  const buttons: AlertButton[] = [
    {
      text: "Cancel",
      style: "cancel",
    },
  ];

  if (severity === "destructive") {
    buttons.push({
      text: "Destructive",
      style: "destructive",
    });
  }

  return Alert.alert(title, message, buttons, {
    userInterfaceStyle: "dark",
    cancelable: true,
    onDismiss: onDismiss,
  });
}
