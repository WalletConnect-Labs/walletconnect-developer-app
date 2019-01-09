import Connector from "./connector";
import { IWalletConnectOptions } from "./types";
import * as cryptoLib from "./nativeCrypto";

class RNWalletConnect extends Connector {
  constructor(opts: IWalletConnectOptions) {
    super(cryptoLib, opts);
  }
}

export default RNWalletConnect;
