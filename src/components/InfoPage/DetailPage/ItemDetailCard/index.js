import { Grid, Typography } from "@mui/material";
import React from "react";
import ItemDetail from "../ItemDetail";

const ItemDetailCard = ({ title, volume, percent }) => {
  return (
    <ItemDetail>
      <Grid container alignItems="center" columnSpacing={1}>
        <Grid item>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        <Grid item>
          <Typography>(24h)</Typography>
        </Grid>
        {/* <Grid item>
          <Typography variant="h6">{token?.token1_name}</Typography>
        </Grid> */}
      </Grid>
      <Grid container alignItems="center" columnSpacing={1} sx={{ mt: 1 }}>
        <Grid item>
          <Typography variant="h6">${volume}</Typography>
        </Grid>
        <Grid item>
          <Typography color={percent > 0 ? "success" : "error"}>
            {percent}%
          </Typography>
        </Grid>
      </Grid>
    </ItemDetail>
  );
};

export default ItemDetailCard;
