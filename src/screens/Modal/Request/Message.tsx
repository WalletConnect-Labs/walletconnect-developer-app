import * as React from "react";
import PropTypes from "prop-types";
import {
  SCard,
  SContainer,
  SParameter,
  SButtonContainer,
  SButton
} from "./common";

class MessageRequest extends React.Component<any, any> {
  static propTypes = {
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
        {params.map(param => (
          <SParameter key={param.label} param={param} />
        ))}
        <SContainer>
          <SButtonContainer>
            <SButton onPress={rejectRequest}>{"Reject"}</SButton>
            <SButton onPress={approveRequest}>{"Approve"}</SButton>
          </SButtonContainer>
        </SContainer>
      </SCard>
    );
  }
}

export default MessageRequest;
