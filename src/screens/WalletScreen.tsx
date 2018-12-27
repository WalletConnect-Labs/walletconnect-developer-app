import * as React from "react";
import { Alert, Image, Clipboard, View, TouchableOpacity } from "react-native";
import { apiGetAccountAssets } from "../helpers/api";
import ScrollViewContainer from "../components/ScrollViewContainer";
import Card from "../components/Card";
import Section from "../components/Section";
import Separator from "../components/Separator";
import Text from "../components/Text";
import Label from "../components/Label";
import AssetRow from "../components/AssetRow";

class WalletScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: "Wallet",
    headerTitle: "Wallet"
  };

  state = {
    loading: false,
    chainId: 1,
    address: "0x9b7b2B4f7a391b6F14A81221AE0920A9735B67Fb",
    assets: []
  };
  componentDidMount() {
    this.getAccountAssets();
  }
  copyToClipboard = () => {
    const { address } = this.state;
    Clipboard.setString(address);
    Alert.alert("Copied", "Address copied to clipboard");
  };
  getAccountAssets = async () => {
    const { address, chainId } = this.state;
    if (address) {
      await this.setState({ loading: true });
      try {
        const assets = await apiGetAccountAssets(address, chainId);
        await this.setState({ loading: false, assets });
      } catch (error) {
        console.error(error);
        await this.setState({ loading: false });
      }
    }
  };
  renderAssets = () => {
    const { assets } = this.state;
    if (!assets.length) {
      return null;
    }
    return (
      <Section>
        {assets.map((asset, index) => (
          <View key={index}>
            <Separator />
            <AssetRow asset={asset} />
          </View>
        ))}
      </Section>
    );
  };

  render() {
    const { loading, address } = this.state;
    return (
      <ScrollViewContainer
        refreshing={loading}
        onRefresh={this.getAccountAssets}
      >
        <Card>
          <View style={{ flexDirection: "row", height: 50 }}>
            <Section style={{ width: "auto", height: 50, flex: 10 }}>
              <Label>{"Wallet Address"}</Label>
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
                  source={
                    require("../assets/clipboard.png") // eslint-disable-line
                  }
                  style={{ width: 20, height: 20, margin: 5 }}
                />
              </TouchableOpacity>
            </Section>
          </View>

          {this.renderAssets()}
        </Card>
      </ScrollViewContainer>
    );
  }
}

export default WalletScreen;
