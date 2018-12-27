import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledContainer = styled.View`
  flex: 1;
  justify-content: ${(props: any) => (props.center ? "center" : "flex-start")};
  align-items: ${(props: any) => (props.center ? "center" : "flex-start")};
  background-color: #eeeeee;
  padding: 0;
`;

const Container = (props: any) => (
  <StyledContainer center={props.center} {...props}>
    {props.children}
  </StyledContainer>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  center: PropTypes.bool
};

Container.defaultProps = {
  center: false
};

export default Container;
