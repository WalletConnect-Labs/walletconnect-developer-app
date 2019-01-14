import { createStackNavigator } from "react-navigation";

import ModalRequest from "./ModalRequest";

const ModalStack = createStackNavigator(
  {
    Request: ModalRequest
  },
  {
    headerMode: "none",
    mode: "modal"
  }
);

export default ModalStack;
