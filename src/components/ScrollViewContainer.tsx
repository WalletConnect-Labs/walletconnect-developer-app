import * as React from "react";
import PropTypes from "prop-types";
import { ScrollView, RefreshControl } from "react-native";
import Container from "./Container";

const ScrollViewContainer = (props: any) => {
  const refreshControl = (
    <RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />
  );
  return (
    <ScrollView refreshControl={refreshControl} {...props}>
      <Container>{props.children}</Container>
    </ScrollView>
  );
};

ScrollViewContainer.propTypes = {
  chilren: PropTypes.node.isRequired,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func
};

export default ScrollViewContainer;
