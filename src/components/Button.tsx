import * as React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonContainer = styled.TouchableHighlight`
  position: relative;
  background-color: #00b371;
  width: ${(props: any) => `${props.width}`};
  height: 35px;
  border-radius: 8px;
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-align: center;
`;

const Button = (props: any) => (
  <ButtonContainer
    width={props.width}
    underlayColor={"#00A367"}
    outline={props.outline}
    onPress={props.onPress}
    {...props}
  >
    <Label outline={props.outline}>{props.children}</Label>
  </ButtonContainer>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  outline: PropTypes.bool,
  width: PropTypes.string
};

Button.defaultProps = {
  outline: false,
  width: "100%"
};

export default Button;
