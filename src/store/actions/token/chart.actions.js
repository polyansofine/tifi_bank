export const GET_CHART_DATA = "GET_CHART_DATA";
export const GET_CHART_DATA_ERROR = "GET_CHART_DATA_ERROR";
export const getChartData =
  (token0, token1, day, interval) => async (dispatch) => {
    // console.log("tokentoototo????????", token0);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${
          // token0.apiId === "bnb" ? token1.apiId : token0.apiId
          token0.apiId
        }/market_chart?vs_currency=${
          token1.apiId
        }&days=${day}&interval=${interval}`
      );
      const res = await response.json();

      dispatch({ type: GET_CHART_DATA, payload: res });
    } catch (error) {
      dispatch({ type: GET_CHART_DATA_ERROR });
    }
  };
