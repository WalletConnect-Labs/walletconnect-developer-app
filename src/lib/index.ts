import Connector from "./core";
import { IWalletConnectOptions, IClientMeta } from "./types";
import * as cryptoLib from "./nativeCrypto";

class RNWalletConnect extends Connector {
  constructor(opts: IWalletConnectOptions, clientMeta: IClientMeta) {
    super(cryptoLib, opts, clientMeta);
  }
}

export default RNWalletConnect;
