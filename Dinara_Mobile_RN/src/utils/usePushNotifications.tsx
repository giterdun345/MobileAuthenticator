import { useState, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import useNotificationsStore from "src/stores/notificationsStore";

type IPushNotifications = Notifications.Notification | undefined;

export default function usePushNotifications(): IPushNotifications {
  const notificationStatus = useNotificationsStore(
    (state) => state.notificationsEnabled
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log("notification", JSON.stringify(notification));
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response", JSON.stringify(response));
      });

    if (notificationStatus === true) {
      // console.log("Notifications turned on");
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
          iosDisplayInForeground: true,
        }),
      });
    } else if (notificationStatus === false) {
      // console.log("Notifications turned off");
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: false,
          shouldPlaySound: false,
          shouldSetBadge: false,
          iosDisplayInForeground: false,
        }),
      });
    }

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [notificationStatus]);

  return notification;
}
