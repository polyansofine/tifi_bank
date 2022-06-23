import { Button, Divider, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { StyledPaper } from "./../../../components/LiquidityComponents/StyledPaper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const FindLiquidity = () => {
  const { token0, token1 } = useSelector(
    ({ tokenReducers }) => tokenReducers.liquidity
  );
  return (
    <StyledPaper>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Grid container columnSpacing={2}>
            <Grid item>
              <IconButton>
                <ArrowBackIcon color="secondary" />
              </IconButton>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography>Import Pool</Typography>
                </Grid>
                <Grid item>
                  <Typography>Import an existing pool</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton>
            {" "}
            <SettingsOutlinedIcon sx={{ color: "#c8b6ff" }} />
          </IconButton>
        </Grid>
      </Grid>
      <Divider sx={{ border: "0.1px solid #383241", my: 2, mx: -2 }} />
      <Grid container direction="column" rowSpacing={2}>
        <Grid item>
          <Button fullWidth variant="contained" sx={{ height: "50px" }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Grid container>
                  {token0.title ? (
                    <>
                      <img
                        src={`/images/tokens/${token0.address}.png`}
                        alt={token0.title}
                        width="50px"
                      />
                      <Typography>{token0.title}</Typography>:
                    </>
                  ) : (
                    <Typography>Select a Token</Typography>
                  )}
                </Grid>
              </Grid>
              <Grid item>
                <KeyboardArrowDownIcon />
              </Grid>
            </Grid>
          </Button>
        </Grid>
        <Grid item>
          <Button fullWidth variant="contained">
            title
          </Button>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default FindLiquidity;
