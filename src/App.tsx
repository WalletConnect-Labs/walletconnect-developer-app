import * as React from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import RNSimpleCrypto from "react-native-simple-crypto";
import * as nativeCrypto from "./lib/nativeCrypto";

import { setTopLevelNavigator } from "./navigation";
import { walletConnectInit } from "./redux/_walletConnect";
import { accountInit } from "./redux/_account";
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
              ? require("./assets/wallet-blue.png")
              : require("./assets/wallet-gray.png");
            break;
          case "Scan":
            iconSource = focused
              ? require("./assets/scan-blue.png")
              : require("./assets/scan-gray.png");
            break;
          case "Settings":
            iconSource = focused
              ? require("./assets/settings-blue.png")
              : require("./assets/settings-gray.png");
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

class App extends React.Component<any, any> {
  componentDidMount() {
    this.testCrypto();
    // this.props.walletConnectInit();
    this.props.accountInit();
  }
  testCrypto = async () => {
    const key = RNSimpleCrypto.utils.convertHexToArrayBuffer(
      "8606388f144bfa3b318cbc7eb0a1267ed6ddea6b5fc21a66bb982c2d345b7d28"
    );

    const payload = {
      data:
        "58c23c4b7a4083e1032bed9924be9e6df07714bba0f7ac3f75c7af2cc948925f6852ce378bda2a5a5104eb14b7c38bf6533635e179230fc3badbca7b4d85d757a19f10974ceafdfbbc67b1faba9d7d38a396685852391aef687ddb7aadb2c4927461130ffc4c8e161205b239df9c42e03c6f904698c05af368e6d69888b0a9ed9b14ed2263a760f0dcd70e4da7f0d89f02484c16a1070e7a0e908246fef66823",
      hmac: "46d07308139ca0de8987bdbab52fae73b6cddf3833afc31d169be1cced3288ba",
      iv: "2e1388a7af1026e61c573d66839b31cb"
    };

    const request = {
      id: 1547162850087708,
      jsonrpc: "2.0",
      method: "wc_sessionRequest",
      params: [
        { peerId: "67b121c8-d66c-44d0-9d0f-6fb5e9235e0c", peerMeta: null }
      ]
    };

    console.log("request", request);

    try {
      const customIv = RNSimpleCrypto.utils.convertHexToArrayBuffer(payload.iv);

      const encrypted = await nativeCrypto.encrypt(request, key, customIv);
      console.log("encrypted", encrypted);

      const decrypted = await nativeCrypto.decrypt(payload, key);
      console.log("decrypted", decrypted);
    } catch (error) {
      console.log(error);
    }

    try {
    } catch (error) {
      console.log(error);
    }
  };
  render = () => (
    <AppContainer ref={navigatorRef => setTopLevelNavigator(navigatorRef)} />
  );
}

export default connect(
  null,
  { walletConnectInit, accountInit }
)(App);
