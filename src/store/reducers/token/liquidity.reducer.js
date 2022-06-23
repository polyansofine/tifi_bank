import { TOKENS } from "../../../config/token";
import * as tokenActions from "../../actions";

const initialState = {
  balances: [],
  remove: {},
  token0: {},
  token1: {},
};
const liquidity = (state = initialState, action) => {
  switch (action.type) {
    case tokenActions.GET_LIQUIDITY_BALANCES: {
      return {
        ...state,
        balances: action.payload,
      };
    }
    case tokenActions.SET_REMOVE: {
      return {
        ...state,
        remove: action.payload,
      };
    }
    case tokenActions.SET_TOKENS: {
      return {
        ...state,
        token0: action.payload.token0.title
          ? action.payload.token0
          : state.token0,
        token1: action.payload.token1.title
          ? action.payload.token1
          : state.token1,
      };
    }

    default:
      return state;
  }
};
export default liquidity;
