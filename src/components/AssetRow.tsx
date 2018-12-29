import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Row from "./Row";
import AssetIcon from "./AssetIcon";
import {
  convertAmountFromRawNumber,
  handleSignificantDecimals
} from "../helpers/bignumber";

const SAssetRow = styled(Row)`
  height: 80px;
`;

const SBalance = styled.View`
  margin-top: 30px;
  margin-right: 11;
`;

const SBalanceText = styled.Text`
  color: #242836;
  line-height: 20px;
`;

const SSymbol = styled.Text`
  color: #242836;
  letter-spacing: 1px;
  line-height: 20px;
`;

const SSymbolWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const AssetRow = (props: any) => (
  <SAssetRow>
    <SSymbolWrapper>
      <AssetIcon asset={props.asset} />
      <SSymbol>{props.asset.name}</SSymbol>
    </SSymbolWrapper>
    <SBalance>
      <SBalanceText>{`${handleSignificantDecimals(
        convertAmountFromRawNumber(props.asset.balance, props.asset.decimals),
        8
      )} ${props.asset.symbol}`}</SBalanceText>
    </SBalance>
  </SAssetRow>
);

AssetRow.propTypes = {
  asset: PropTypes.object.isRequired
};

export default AssetRow;
