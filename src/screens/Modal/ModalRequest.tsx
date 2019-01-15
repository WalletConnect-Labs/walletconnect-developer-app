import * as React from "react";
import styled from "styled-components";
import { StatusBar } from "react-native";
import { connect } from "react-redux";
import {
  sendTransaction,
  signMessage
  // signTypedData,
  // signTypedDataLegacy
} from "../../helpers/wallet";
import SessionRequest from "./Request/Session";
import TransactionRequest from "./Request/Transaction";
import MessageRequest from "./Request/Message";
import TypedDataRequest from "./Request/TypedData";
import {
  walletConnectApproveCallRequest,
  walletConnectRejectCallRequest,
  walletConnectApproveSessionRequest,
  walletConnectRejectSessionRequest
} from "../../redux/_walletConnect";

const SContainer = styled.View`
  flex: 1;
  background-color: rgb(0, 0, 0);
  justify-content: flex-end;
`;

const SHeaderContainer = styled.View`
  flex: 1;
`;

const SHeaderTextContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SHeaderText = styled.Text`
  color: white;
  font-size: 20px;
  opacity: 0.8;
`;

const SCloseModal = styled.Text`
  color: white;
  margin: 10px;
  align-self: flex-end;
`;

const SConfirmationContainer = styled.View``;

class ModalRequest extends React.Component<any, any> {
  approveRequest = async () => {
    const { address, chainId } = this.props;
    const screenProps = this.props.navigation.state.params;
    const { peerId, payload } = screenProps;

    const sessionRequest =
      payload.method === "wc_sessionRequest" ||
      payload.method === "wc_sessionUpdate";

    if (sessionRequest) {
      const response = { accounts: [address], chainId };
      await walletConnectApproveSessionRequest(peerId, response);
    } else {
      this.approveCallRequest();
    }
  };

  approveCallRequest = async () => {
    const screenProps = this.props.navigation.state.params;
    const { peerId, payload } = screenProps;

    let result = null;

    switch (payload.method) {
      case "eth_sendTransaction":
        try {
          console.log("eth_sendTransaction approve");
          result = await sendTransaction(payload.params[0]);
          console.log("eth_sendTransaction result", result);
        } catch (error) {
          console.error(error);
        }
        break;

      case "eth_sign":
        try {
          console.log("eth_sign approve");
          result = await signMessage(payload.params[1]);
          console.log("eth_sign result", result);
        } catch (error) {
          console.error(error);
        }
        break;
      case "eth_signTypedData":
      case "eth_signTypedData_v3":
        try {
          console.log("eth_signTypedData_v3 approve");
          // result = await signTypedData(payload.params[1]);
          console.log("eth_signTypedData_v3 result", result);
        } catch (error) {
          console.error(error);
        }
        break;
      case "eth_signTypedData_v1":
        try {
          console.log("eth_signTypedData_v1 approve");
          // result = await signTypedDataLegacy(payload.params[1]);
          console.log("eth_signTypedData_v1 result", result);
        } catch (error) {
          console.error(error);
        }
        break;
      default:
        break;
    }

    const response = {
      id: payload.id,
      result
    };

    if (result) {
      await walletConnectApproveCallRequest(peerId, response);
      this.onClose();
    } else {
      await this.rejectRequest();
    }
  };

  rejectRequest = async () => {
    const screenProps = this.props.navigation.state.params;
    const { peerId, payload } = screenProps;

    const sessionRequest =
      payload.method === "wc_sessionRequest" ||
      payload.method === "wc_sessionUpdate";

    if (sessionRequest) {
      await walletConnectRejectSessionRequest(peerId);
    } else {
      await walletConnectRejectCallRequest(peerId, {
        id: payload.id,
        result: null
      });
    }

    this.onClose();
  };

  renderView = () => {
    const { address, chainId } = this.props;
    const screenProps = this.props.navigation.state.params;
    const { payload } = screenProps;

    if (payload) {
      switch (payload.method) {
        case "wc_sessionRequest":
          return (
            <SessionRequest
              address={address}
              chainId={chainId}
              payload={payload}
              approveRequest={this.approveRequest}
              rejectRequest={this.rejectRequest}
            />
          );
        case "wc_sessionUpdate":
          return (
            <SessionRequest
              address={address}
              chainId={chainId}
              payload={payload}
              approveRequest={this.approveRequest}
              rejectRequest={this.rejectRequest}
            />
          );
        case "eth_sendTransaction":
          return (
            <TransactionRequest
              address={address}
              chainId={chainId}
              payload={payload}
              approveRequest={this.approveRequest}
              rejectRequest={this.rejectRequest}
            />
          );
        case "eth_sign":
          return (
            <MessageRequest
              address={address}
              chainId={chainId}
              payload={payload}
              approveRequest={this.approveRequest}
              rejectRequest={this.rejectRequest}
            />
          );
        case "eth_signTypedData":
        case "eth_signTypedData_v1":
        case "eth_signTypedData_v3":
          return (
            <TypedDataRequest
              address={address}
              chainId={chainId}
              payload={payload}
              approveRequest={this.approveRequest}
              rejectRequest={this.rejectRequest}
            />
          );
        default:
          return null;
      }
    } else {
      return null;
    }
  };

  onClose = () => {
    StatusBar.setBarStyle("dark-content", true);
    this.props.navigation.goBack();
  };

  render = () => {
    const screenProps = this.props.navigation.state.params;
    return (
      <SContainer>
        <SHeaderContainer>
          <SHeaderTextContainer>
            <SHeaderText>{`New request from`}</SHeaderText>
            <SHeaderText>{screenProps.peerMeta.name}</SHeaderText>
          </SHeaderTextContainer>
          <SCloseModal onPress={this.onClose}>{"Close"}</SCloseModal>
        </SHeaderContainer>
        <SConfirmationContainer>{this.renderView()}</SConfirmationContainer>
      </SContainer>
    );
  };
}

const reduxProps = (reduxState: any) => ({
  address: reduxState.account.address,
  chainId: reduxState.account.chainId
});

export default connect(
  reduxProps,
  null
)(ModalRequest);
