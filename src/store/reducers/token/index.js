import { combineReducers } from "redux";

import token from "./token.reducer";
import liquidity from "./liquidity.reducer";

const fuseReducers = combineReducers({
  token,
  liquidity,
});

export default fuseReducers;
