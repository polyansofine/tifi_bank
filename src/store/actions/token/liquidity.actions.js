export const GET_LIQUIDITY_BALANCES = "GET_LIQUIDITY_BALANCES";
export const SET_REMOVE = "SET_REMOVE";

export const getLiquidityBalance = (val) => async (dispatch) => {
  dispatch({ type: GET_LIQUIDITY_BALANCES, payload: val });
};
export const setRemove = (val) => async (dispatch) => {
  dispatch({ type: SET_REMOVE, payload: val });
};
