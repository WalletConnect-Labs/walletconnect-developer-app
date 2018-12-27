import * as React from "react";
import { View, Text } from "react-native";

class SettingsScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: "Settings",
    headerTitle: "Settings"
  };
  render = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings Screen</Text>
    </View>
  );
}

export default SettingsScreen;
