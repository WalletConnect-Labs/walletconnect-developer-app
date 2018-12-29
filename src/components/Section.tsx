import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SSection = styled.View`
  width: 100%;
  display: flex;
  margin-bottom: 6px;
`;

const Section = (props: any) => (
  <SSection {...props}>{props.children}</SSection>
);

Section.propTypes = {
  children: PropTypes.node.isRequired
};

export default Section;
