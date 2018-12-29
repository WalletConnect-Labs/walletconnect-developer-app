import { createStackNavigator } from "react-navigation";

import SettingsListScreen from "./SettingsListScreen";

const SettingsStack = createStackNavigator({
  Settings: SettingsListScreen
});

export default SettingsStack;
