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

class TypedDataRequest extends React.Component<any, any> {
  static propTypes = {
    address: PropTypes.string,
    chainId: PropTypes.number,
    payload: PropTypes.object.isRequired,
    approveRequest: PropTypes.func.isRequired,
    rejectRequest: PropTypes.func.isRequired
  };

  formatObjectValues = (obj: any) =>
    Object.keys(obj).map(key => {
      const label = key;
      let value = obj[key];
      if (typeof value === "object") {
        value = this.formatObjectValues(value);
      }

      return { label, value };
    });

  render() {
    const { payload, approveRequest, rejectRequest } = this.props;
    const address = { label: "Address", value: payload.params[0] };
    const typedData =
      typeof payload.params[1] === "string"
        ? JSON.parse(payload.params[1])
        : payload.params[1];
    const domain = {
      label: "Domain",
      value: this.formatObjectValues(typedData.domain)
    };
    const message = {
      label: typedData.primaryType,
      value: this.formatObjectValues(typedData.message)
    };
    const params = [address, domain, message];
    console.log("TypedDataRequest params", params);
    return (
      <SCard>
        <SCardTitle>{"Typed Data Request"}</SCardTitle>
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

export default TypedDataRequest;
