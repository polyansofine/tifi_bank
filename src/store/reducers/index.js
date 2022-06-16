import { combineReducers } from "redux";
import fuseReducers from "./fuse/index";
import authReducers from "./auth";
import tokenReducers from "./token";
const createReducer = (asyncReducers) =>
  combineReducers({
    fuseReducers,
    authReducers,
    tokenReducers,
    ...asyncReducers,
  });

export default createReducer;
