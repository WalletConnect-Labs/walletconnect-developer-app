import * as React from "react";
import { Image } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import AccountStack from "./screens/Account";
import ScanStack from "./screens/Scan";
import SettingsStack from "./screens/Settings";
import ModalStack from "./screens/Modal";

const MainTabNavigator = createBottomTabNavigator(
  {
    Account: AccountStack,
    Scan: ScanStack,
    Settings: SettingsStack
  },
  {
    initialRouteName: "Account",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;

        let iconSource = null;

        switch (routeName) {
          case "Account":
            iconSource = focused
              ? require("./assets/wallet-icon-blue.png")
              : require("./assets/wallet-icon.png");
            break;
          case "Scan":
            iconSource = focused
              ? require("./assets/scan-icon-blue.png")
              : require("./assets/scan-icon.png");
            break;
          case "Settings":
            iconSource = focused
              ? require("./assets/settings-icon-blue.png")
              : require("./assets/settings-icon.png");
            break;
          default:
            break;
        }

        return (
          <Image
            source={iconSource}
            style={{ width: 25, height: 25, margin: 10 }}
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

const AppNavigator = createStackNavigator(
  {
    Main: MainTabNavigator,
    Modal: ModalStack
  },
  {
    initialRouteName: "Main",
    headerMode: "none",
    mode: "modal"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
