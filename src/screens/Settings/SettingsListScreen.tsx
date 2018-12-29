import * as React from "react";
import { connect } from "react-redux";
import { Alert, View, Image } from "react-native";
import SettingsList from "react-native-settings-list";
import { ellipseAddress, getChainData } from "../../helpers/utilities";

class SettingsScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: "Settings",
    headerTitle: "Settings"
  };
  render = () => (
    <View style={{ flex: 1 }}>
      <SettingsList borderColor="lightgray" defaultItemSize={50}>
        <SettingsList.Item
          icon={
            <Image
              style={{
                width: 25,
                height: 25,
                margin: 15,
                marginLeft: 25,
                marginRight: 10
              }}
              source={require("../../assets/wallet-black.png")}
            />
          }
          title="Account"
          titleInfo={ellipseAddress(this.props.address)}
          onPress={() => Alert.alert("Route to Account Settings Page")}
        />
        <SettingsList.Item
          icon={
            <Image
              style={{
                width: 25,
                height: 25,
                margin: 15,
                marginLeft: 25,
                marginRight: 10
              }}
              source={require("../../assets/network-black.png")}
            />
          }
          title="Chain"
          titleInfo={getChainData(this.props.chainId).name}
          onPress={() => Alert.alert("Route to Chain Settings Page")}
        />
      </SettingsList>
    </View>
  );
}

const reduxProps = (reduxState: any) => ({
  chainId: reduxState.account.chainId,
  address: reduxState.account.address
});

export default connect(
  reduxProps,
  null
)(SettingsScreen);
