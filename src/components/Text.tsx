import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledText = styled.Text`
  color: ${(props: any) => props.color};
  margin-bottom: 6px;
`;

const Text = (props: any) => (
  <StyledText color={props.color} {...props}>
    {props.children}
  </StyledText>
);

Text.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired
};

Text.defaultProps = {
  color: "#333333"
};

export default Text;
