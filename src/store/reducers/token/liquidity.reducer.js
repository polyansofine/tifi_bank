import { TOKENS } from "../../../config/token";
import * as tokenActions from "../../actions";

const initialState = {
  balances: [],
  remove: {},
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

    default:
      return state;
  }
};
export default liquidity;
