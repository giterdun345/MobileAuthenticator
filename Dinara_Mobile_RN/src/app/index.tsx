import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import ApprovalList from "@components/Approvals/ApprovalList";
import Erroring from "@components/ZCommon/Erroring";
import LoadingScreen from "@components/ZCommon/LoadingScreen";
import useAppConfigStore from "src/stores/applicationConfigStore";
import useUserInfoStore from "src/stores/userInfoStore";
import useBiometricsStore from "src/stores/biometricsStore";
import useNotificationsStore from "src/stores/notificationsStore";

export default function Home() {
  const environment = useAppConfigStore((state) => state.env);
  const configurationComplete = useAppConfigStore(
    (state) => state.configurationComplete
  );
  const getConfigurationComplete = useAppConfigStore(
    (state) => state.getConfigurationComplete
  );

  const getUserInfo = useUserInfoStore((state) => state.getUserInfo);

  const getNotificationsEnabled = useNotificationsStore(
    (state) => state.getNotificationsEnabled
  );

  const hasCompatibleHardware = useBiometricsStore(
    (state) => state.hasCompatibleHardware
  );

  const [dataFetchComplete, setDataFetchComplete] = useState(false);
  const [ActiveComponent, setActiveComponent] =
    useState<React.ReactNode | null>(<LoadingScreen />);

  async function fetchAllData() {
    if (environment) {
      await getUserInfo(environment);
      getConfigurationComplete(environment);
      getNotificationsEnabled();
      setDataFetchComplete(true);
    }
  }

  useEffect(() => {
    fetchAllData();
  }, [environment]);

  useEffect(() => {
    if (dataFetchComplete) {
      switch (true) {
        case configurationComplete:
          setActiveComponent(<ApprovalList />);
          break;

        case !configurationComplete:
          setActiveComponent(<Redirect href="/start-configuration" />);
          break;

        case !hasCompatibleHardware:
          setActiveComponent(
            <Erroring errorMessage="Due to absence of biometrics, permissions or both, this application is not supported with this device." />
          );
          break;

        default:
          setActiveComponent(<LoadingScreen />);
          break;
      }
    }
  }, [dataFetchComplete, configurationComplete, hasCompatibleHardware]);

  return ActiveComponent;
}
