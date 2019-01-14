import { createStackNavigator } from "react-navigation";

import ModalSessionRequest from "./ModalSessionRequest";
import ModalCallRequest from "./ModalCallRequest";

const ModalStack = createStackNavigator(
  {
    SessionRequest: ModalSessionRequest,
    CallRequest: ModalCallRequest
  },
  {
    headerMode: "none",
    mode: "modal"
  }
);

export default ModalStack;
