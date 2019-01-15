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

class MessageRequest extends React.Component<any, any> {
  static propTypes = {
    address: PropTypes.string,
    chainId: PropTypes.number,
    payload: PropTypes.object.isRequired,
    approveRequest: PropTypes.func.isRequired,
    rejectRequest: PropTypes.func.isRequired
  };

  render() {
    const { payload, approveRequest, rejectRequest } = this.props;
    const address = payload.params[0];
    const message = payload.params[1];
    const params = [
      { label: "Address", value: address },
      { label: "Message", value: message }
    ];
    return (
      <SCard>
        <SCardTitle>{"Message Request"}</SCardTitle>
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

export default MessageRequest;
