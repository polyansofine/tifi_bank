import { Grid } from "@mui/material";
import React from "react";
import Swap from ".";
import SwapChart from "./SwapChart";

const SwapPage = () => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      columnSpacing={2}
    >
      <Grid item md={7}>
        <SwapChart />
      </Grid>
      <Grid item md={5}>
        <Swap />
      </Grid>
    </Grid>
  );
};

export default SwapPage;
