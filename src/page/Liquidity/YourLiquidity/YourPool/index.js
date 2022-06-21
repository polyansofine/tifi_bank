import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, CircularProgress, Fab, Grid, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { TOKENS } from "../../../../config/token";
import * as liquidityActions from "../../../../store/actions";

export default function YourPool({ loading }) {
  const { balances } = useSelector(
    ({ tokenReducers }) => tokenReducers.liquidity
  );
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <div>
      {balances.length > 0 ? (
        balances.map((item, index) => (
          <Accordion sx={{ borderRadius: 16 }} key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#ffffff" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ background: "#202231", color: "#ffffff" }}
            >
              <Grid container direction="column">
                <Grid item>
                  <Grid container columnGap={2} alignItems="center">
                    <Grid item>
                      <img
                        src={`/images/tokens/${
                          TOKENS[
                            _.findIndex(TOKENS, function (o) {
                              return o.title == item.token0Title;
                            })
                          ].address
                        }.png`}
                        alt="coins"
                        width="30px"
                      />
                    </Grid>
                    <Grid item>
                      <img
                        src={`/images/tokens/${
                          TOKENS[
                            _.findIndex(TOKENS, function (o) {
                              return o.title == item.token1Title;
                            })
                          ].address
                        }.png`}
                        alt="coins1"
                        width="30px"
                      />
                    </Grid>
                    <Grid item>
                      <Typography>
                        {item.token0Title}/{item.token1Title}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography>{item.balance}</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails sx={{ background: "#202231", color: "#ffffff" }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Grid container alignItems="center">
                    <img
                      src={`/images/tokens/${
                        TOKENS[
                          _.findIndex(TOKENS, function (o) {
                            return o.title == item.token0Title;
                          })
                        ].address
                      }.png`}
                      alt="coins"
                      width="30px"
                    />
                    <Typography sx={{ ml: 2 }}>
                      Pooled {item.token0Title}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography>0.482374</Typography>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="space-between"
                sx={{ mt: 2 }}
                alignItems="center"
              >
                <Grid item>
                  <Grid container alignItems="center">
                    <img
                      src={`/images/tokens/${
                        TOKENS[
                          _.findIndex(TOKENS, function (o) {
                            return o.title == item.token1Title;
                          })
                        ].address
                      }.png`}
                      alt="coins"
                      width="30px"
                    />
                    <Typography sx={{ ml: 2 }}>
                      Pooled {item.token1Title}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography>0.482374</Typography>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="space-between"
                sx={{ mt: 2 }}
                alignItems="center"
              >
                <Typography>Share of pool</Typography>
                <Typography>{`<0.01%`}</Typography>
              </Grid>
              <Grid container justifyContent="center">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    background: theme.custom.gradient.blue,
                    height: "50px",
                    mt: 3,
                    borderRadius: 6,
                  }}
                  onClick={() => {
                    dispatch(liquidityActions.setRemove(item));
                  }}
                >
                  Remove
                </Button>
              </Grid>
              <Grid container justifyContent="center">
                <Button
                  startIcon={<AddIcon />}
                  fullWidth
                  sx={{
                    height: "50px",
                    mt: 3,
                    color: "#1FC7D3",
                  }}
                >
                  Add liquidity instead
                </Button>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Grid container alignItems="center" direction="column" rowGap={2}>
          <Grid item>
            {loading ? (
              <CircularProgress />
            ) : (
              <Typography>No liquidity found</Typography>
            )}
          </Grid>
          <Grid item>
            <Typography>Don't see a pool you joined?</Typography>
          </Grid>
          <Grid item>
            <Fab
              variant="extended"
              sx={{
                backgroundColor: "#202231",
                color: "#1FC7D3",
                textTransform: "capitalize",
                border: "1px solid #1FC7D3",
                "&:hover": {
                  background: "#161522",
                  color: "#000000",
                },
              }}
            >
              Find other LP tokens
            </Fab>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
