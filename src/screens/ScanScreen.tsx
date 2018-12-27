import * as React from "react";
import { View, Text } from "react-native";

class ScanScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: "Scan",
    headerTitle: "Scan"
  };
  render = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Scan Screen</Text>
    </View>
  );
}

export default ScanScreen;
