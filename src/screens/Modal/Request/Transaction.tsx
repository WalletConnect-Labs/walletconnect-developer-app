import * as React from "react";
import PropTypes from "prop-types";
import {
  SCard,
  SCardTitle,
  SContainer,
  SParameter,
  SButtonContainer,
  SButton
} from "./common";
import {
  convertAmountFromRawNumber,
  convertHexToString
} from "../../../helpers/bignumber";

class TransactionRequest extends React.Component<any, any> {
  static propTypes = {
    address: PropTypes.string,
    chainId: PropTypes.number,
    payload: PropTypes.object.isRequired,
    approveRequest: PropTypes.func.isRequired,
    rejectRequest: PropTypes.func.isRequired
  };

  render() {
    const { payload, approveRequest, rejectRequest } = this.props;
    console.log("TransactionRequest", this.props);
    const tx = payload.params[0];
    const params = [
      { label: "From", value: tx.from },
      { label: "To", value: tx.to },
      {
        label: "Value",
        value: `${convertAmountFromRawNumber(convertHexToString(tx.value))} ETH`
      },
      { label: "Data", value: tx.data || "0x" }
    ];
    return (
      <SCard>
        <SCardTitle>{"Transaction Request"}</SCardTitle>
        {params.map(param => (
          <SParameter key={param.label} param={param} />
        ))}
        <SContainer>
          <SButtonContainer>
            <SButton color="green" onPress={approveRequest}>
              {"Approve"}
            </SButton>
            <SButton color="red" onPress={rejectRequest}>
              {"Reject"}
            </SButton>
          </SButtonContainer>
        </SContainer>
      </SCard>
    );
  }
}

export default TransactionRequest;
