export const GET_CHART_DATA = "GET_CHART_DATA";
export const getChartData =
  (token0, token1, day, interval) => async (dispatch) => {
    // console.log("tokentoototo????????", token0);
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${
        token0.apiId === "bnb" ? token1.apiId : token0.apiId
      }/market_chart?vs_currency=bnb&days=${day}&interval=${interval}`
    );
    const res = await response.json();
    console.log("res==", res);
    dispatch({ type: GET_CHART_DATA, payload: res });
  };
