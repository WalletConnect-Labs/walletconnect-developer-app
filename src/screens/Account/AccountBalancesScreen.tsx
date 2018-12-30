import * as React from "react";
import {
  Alert,
  Image,
  Clipboard,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { accountGetAssets } from "../../redux/_account";
import { IAssetData } from "../../helpers/types";
import ScrollViewContainer from "../../components/ScrollViewContainer";
import Card from "../../components/Card";
import Section from "../../components/Section";
import Separator from "../../components/Separator";
import Text from "../../components/Text";
import Label from "../../components/Label";
import AssetRow from "../../components/AssetRow";

class AccountBalancesScreen extends React.Component<any, any> {
  static navigationOptions = (props: any) => {
    return {
      title: "Account",
      headerTitle: "Account"
      // TODO: FIX TRANSACTIONS SCREEN FIRST
      // headerRight: (
      //   <TouchableOpacity
      //     onPress={() => props.navigation.navigate("AccountTransactions")}
      //   >
      //     <Image
      //       source={require("../../assets/transactions-black.png")}
      //       style={{ width: 20, height: 20, margin: 5, marginRight: 20 }}
      //     />
      //   </TouchableOpacity>
      // )
    };
  };

  state = {
    firstLoad: true
  };

  componentDidMount() {
    this.getBalances();
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.firstLoad) {
      if (prevProps.loading && !this.props.loading) {
        this.setState({ firstLoad: false });
      }
    }
  }

  getBalances = () => {
    if (!this.props.loading) {
      this.props.accountGetAssets();
    }
  };
  copyToClipboard = () => {
    Clipboard.setString(this.props.address);
    Alert.alert("Copied", "Address copied to clipboard");
  };
  render() {
    const { loading, address, assets } = this.props;
    const firstLoad = loading && this.state.firstLoad;
    return (
      <ScrollViewContainer refreshing={loading} onRefresh={this.getBalances}>
        <Card>
          <View style={{ flexDirection: "row", height: 50 }}>
            <Section style={{ width: "auto", height: 50, flex: 10 }}>
              <Label>{"Account Address"}</Label>
              <Text style={{ fontSize: 12, fontFamily: "Menlo-Regular" }}>
                {address}
              </Text>
            </Section>
            <Section
              style={{
                width: "auto",
                height: 50,
                flex: 1
              }}
            >
              <TouchableOpacity onPress={this.copyToClipboard}>
                <Image
                  source={require("../../assets/clipboard-black.png")}
                  style={{ width: 20, height: 20, margin: 5 }}
                />
              </TouchableOpacity>
            </Section>
          </View>

          <Section>
            {!firstLoad ? (
              !!assets.length ? (
                assets.map((asset: IAssetData, index: number) => (
                  <View key={index}>
                    <Separator />
                    <AssetRow asset={asset} />
                  </View>
                ))
              ) : (
                <View
                  style={{
                    height: 200,
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text>{"No Balances Found"}</Text>
                </View>
              )
            ) : (
              <View
                style={{
                  height: 200,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <ActivityIndicator size="large" color="gray" />
              </View>
            )}
          </Section>
        </Card>
      </ScrollViewContainer>
    );
  }
}

const reduxProps = (reduxState: any) => ({
  loading: reduxState.account.loading,
  address: reduxState.account.address,
  assets: reduxState.account.assets
});

export default connect(
  reduxProps,
  { accountGetAssets }
)(AccountBalancesScreen);
