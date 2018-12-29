import * as React from "react";
import { Image } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import WalletScreen from "./screens/WalletScreen";
import ScanScreen from "./screens/ScanScreen";
import SettingsScreen from "./screens/SettingsScreen";

const WalletStack = createStackNavigator({
  Wallet: WalletScreen
});

const ScanStack = createStackNavigator({
  Scan: ScanScreen
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

const AppNavigator = createBottomTabNavigator(
  {
    Wallet: WalletStack,
    Scan: ScanStack,
    Settings: SettingsStack
  },
  {
    initialRouteName: "Wallet",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal }) => {
        const { routeName } = navigation.state;

        let iconSource = null;
        let iconSize = horizontal ? 25 : 20;
        switch (routeName) {
          case "Wallet":
            iconSource = focused
              ? require("./assets/wallet-icon-blue.png")
              : require("./assets/wallet-icon.png"); // eslint-disable-line
            break;
          case "Scan":
            iconSource = focused
              ? require("./assets/scan-icon-blue.png")
              : require("./assets/scan-icon.png"); // eslint-disable-line
            break;
          case "Settings":
            iconSource = focused
              ? require("./assets/settings-icon-blue.png")
              : require("./assets/settings-icon.png"); // eslint-disable-line
            break;
          default:
            break;
        }

        return (
          <Image
            source={iconSource}
            style={{ width: iconSize, height: iconSize }}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "#3b99fc",
      inactiveTintColor: "gray"
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
