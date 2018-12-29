import * as React from "react";
import { View, Text } from "react-native";
import Button from "../components/Button";

class SettingsScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: "Settings",
    headerTitle: "Settings"
  };
  render = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings Screen</Text>
      <Button onPress={() => this.props.navigation.navigate("SessionRequest")}>
        {"Open Modal"}
      </Button>
    </View>
  );
}

export default SettingsScreen;
