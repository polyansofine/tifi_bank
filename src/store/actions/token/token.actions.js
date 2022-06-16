export const SELECT_TOKEN = "SELECT_TOKEN";
export const selectToken = (token0, token1) => async (dispatch) => {
  dispatch({ type: SELECT_TOKEN, payload: { token0, token1 } });
};
