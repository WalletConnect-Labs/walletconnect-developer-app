import { createStackNavigator } from "react-navigation";

import SessionRequestModal from "./SessionRequestModal";
import CallRequestModal from "./CallRequestModal";

const ModalStack = createStackNavigator({
  SessionRequest: SessionRequestModal,
  CallRequest: CallRequestModal
});

export default ModalStack;
