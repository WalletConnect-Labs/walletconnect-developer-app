import * as React from "react";
import { ScrollView, RefreshControl } from "react-native";
import Container from "./Container";

class ScrollViewContainer extends React.Component<any, any> {
  state = {
    firstLoad: true
  };
  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.firstLoad) {
      if (prevProps.refreshing && !this.props.refreshing) {
        this.setState({ firstLoad: false });
      }
    }
  }
  render() {
    const refreshControl = (
      <RefreshControl
        refreshing={!this.state.firstLoad && this.props.refreshing}
        onRefresh={this.props.onRefresh}
      />
    );
    return (
      <ScrollView refreshControl={refreshControl}>
        <Container>{this.props.children}</Container>
      </ScrollView>
    );
  }
}

export default ScrollViewContainer;
