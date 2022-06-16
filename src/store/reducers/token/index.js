import { combineReducers } from "redux";

import token from "./token.reducer";

const fuseReducers = combineReducers({
  token,
});

export default fuseReducers;
