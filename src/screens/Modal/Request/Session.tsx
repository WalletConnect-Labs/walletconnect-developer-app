import * as React from "react";
import PropTypes from "prop-types";
import {
  SCard,
  SContainer,
  SParameter,
  SButtonContainer,
  SButton
} from "./common";

class SessionRequest extends React.Component<any, any> {
  static propTypes = {
    payload: PropTypes.object.isRequired,
    approveRequest: PropTypes.func.isRequired,
    rejectRequest: PropTypes.func.isRequired
  };

  static defaultProps = {
    newSession: false
  };

  render() {
    const { payload, approveRequest, rejectRequest } = this.props;
    const newSession = payload.method === "wc_sessionRequest";
    let params: { label: string; value: any }[] = [];
    if (newSession) {
      const { name, description, url } = payload.params[0].peerMeta;
      params = [
        { label: "Name", value: name },
        { label: "Description", value: description },
        { label: "Url", value: url }
      ];
    } else {
      const { accounts, chainId } = payload.params[0];
      params = [
        { label: "Accounts", value: accounts },
        { label: "ChainId", value: chainId }
      ];
    }
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

export default SessionRequest;
