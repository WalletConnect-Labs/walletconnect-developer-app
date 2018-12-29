import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SRow = styled.View`
  flex-direction: row;
`;

const Row = (props: any) => <SRow {...props}>{props.children}</SRow>;

Row.propTypes = {
  children: PropTypes.node.isRequired
};

export default Row;
