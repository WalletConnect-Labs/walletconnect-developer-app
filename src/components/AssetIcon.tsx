import * as React from "react";
import styled from "styled-components";
import { StyleSheet } from "react-native";
import ImageLoad from "react-native-image-placeholder";

const StyledCircle = styled.View`
  margin-left: 14px;
  height: 36px;
  width: 36px;
  margin-right: 15px;
  border-radius: 18px;
  border-color: #d4d4d7;
  border-width: 1px;
  background-color: #ffffff;
`;

const styles = StyleSheet.create({
  circleIcon: {
    height: 30,
    width: 30,
    borderRadius: 15,
    margin: 2
  }
});

function getIconUrl(address: string) {
  // if ether
  if (!address) {
    return "https://github.com/TrustWallet/tokens/raw/master/coins/60.png";
  }
  // if tokens
  return `https://raw.githubusercontent.com/TrustWallet/tokens/master/images/${address}.png`;
}

const AssetIcon = (props: any) => (
  <StyledCircle>
    <ImageLoad
      source={{ uri: getIconUrl(props.asset.contractAddress) }}
      style={styles.circleIcon}
      isShowActivity={false}
      placeholderSource={require("../assets/default-token.png")} // eslint-disable-line
      customImagePlaceholderDefaultStyle={styles.circleIcon}
      loadingStyle={styles.circleIcon}
      borderRadius={15}
      placeholderStyle={styles.circleIcon}
    />
  </StyledCircle>
);

export default AssetIcon;
