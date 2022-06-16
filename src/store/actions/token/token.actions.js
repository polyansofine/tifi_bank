export const SELECT_TOKEN = "SELECT_TOKEN";
export const REVERSE_TOKEN = "REVERSE_TOKEN";
export const selectToken = (token0, token1) => async (dispatch) => {
  dispatch({ type: SELECT_TOKEN, payload: { token0, token1 } });
};
export const reverseToken = () => async (dispatch) => {
  dispatch({ type: REVERSE_TOKEN });
};
