import { apiGetAccountAssets, apiGetAccountTransactions } from "../helpers/api";

// -- Constants ------------------------------------------------------------- //

const ACCOUNT_UPDATE_ADDRESS = "account/ACCOUNT_UPDATE_ADDRESS";

const ACCOUNT_UPDATE_CHAIN_ID = "account/ACCOUNT_UPDATE_CHAIN_ID";

const ACCOUNT_GET_ASSETS_REQUEST = "account/ACCOUNT_GET_ASSETS_REQUEST";
const ACCOUNT_GET_ASSETS_SUCCESS = "account/ACCOUNT_GET_ASSETS_SUCCESS";
const ACCOUNT_GET_ASSETS_FAILURE = "account/ACCOUNT_GET_ASSETS_FAILURE";

const ACCOUNT_GET_TRANSACTIONS_REQUEST =
  "account/ACCOUNT_GET_TRANSACTIONS_REQUEST";
const ACCOUNT_GET_TRANSACTIONS_SUCCESS =
  "account/ACCOUNT_GET_TRANSACTIONS_SUCCESS";
const ACCOUNT_GET_TRANSACTIONS_FAILURE =
  "account/ACCOUNT_GET_TRANSACTIONS_FAILURE";

// -- Actions --------------------------------------------------------------- //

export const accountUpdateAddress = (address: string) => (dispatch: any) => {
  dispatch({ type: ACCOUNT_UPDATE_ADDRESS, payload: address });
  dispatch(accountGetAssets());
};

export const accountUpdateChainId = (chainId: number) => (
  dispatch: any,
  getState: any
) => {
  const { address } = getState().account;
  dispatch({ type: ACCOUNT_UPDATE_CHAIN_ID, payload: chainId });
  if (address) {
    dispatch(accountGetAssets());
  }
};

export const accountGetAssets = () => async (dispatch: any, getState: any) => {
  const { address, chainId } = getState().account;
  dispatch({ type: ACCOUNT_GET_ASSETS_REQUEST });
  try {
    const assets = await apiGetAccountAssets(address, chainId);
    dispatch({ type: ACCOUNT_GET_ASSETS_SUCCESS, payload: assets });
  } catch (error) {
    console.error(error);
    dispatch({ type: ACCOUNT_GET_ASSETS_FAILURE });
    return error;
  }
};

export const accountGetTransactions = () => async (
  dispatch: any,
  getState: any
) => {
  const { chainId, address } = getState().account;
  dispatch({ type: ACCOUNT_GET_TRANSACTIONS_REQUEST });
  try {
    const transactions = await apiGetAccountTransactions(address, chainId);
    dispatch({ type: ACCOUNT_GET_TRANSACTIONS_SUCCESS, payload: transactions });
  } catch (error) {
    console.error(error);
    dispatch({ type: ACCOUNT_GET_TRANSACTIONS_FAILURE });
    return error;
  }
};

// -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE = {
  loading: false,
  chainId: 1,
  address: "0x9b7b2B4f7a391b6F14A81221AE0920A9735B67Fb",
  assets: [
    {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "0"
    }
  ],
  transactions: []
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ACCOUNT_UPDATE_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    case ACCOUNT_UPDATE_CHAIN_ID:
      return {
        ...state,
        chainId: action.payload
      };
    case ACCOUNT_GET_ASSETS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ACCOUNT_GET_ASSETS_SUCCESS:
      return {
        ...state,
        loading: false,
        assets: action.payload
      };
    case ACCOUNT_GET_ASSETS_FAILURE:
      return {
        ...state,
        loading: false
      };
    case ACCOUNT_GET_TRANSACTIONS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ACCOUNT_GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: action.payload
      };
    case ACCOUNT_GET_TRANSACTIONS_FAILURE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
