import {
  Button,
  Divider,
  Grid,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import React from "react";
import {
  StyledInnerPaper,
  StyledPaper,
} from "../../../../components/LiquidityComponents/StyledPaper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/system";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useDispatch, useSelector } from "react-redux";
import { TOKENS } from "../../../../config/token";
import _ from "lodash";
import * as liquidityActions from "../../../../store/actions";

const RemovePad = () => {
  const { remove } = useSelector(
    ({ tokenReducers }) => tokenReducers.liquidity
  );
  const dispatch = useDispatch();
  return (
    <StyledPaper>
      <Grid container alignItems="center" columnGap={2}>
        <Grid item>
          <IconButton onClick={() => dispatch(liquidityActions.setRemove({}))}>
            <ArrowBackIcon color="secondary" />
          </IconButton>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography>
                Remove {remove.token0Title}-{remove.token1Title} liquidity
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                To receive {remove.token0Title} and {remove.token1Title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ my: 4 }}
      >
        <Grid item>
          <Typography>Amount</Typography>
        </Grid>
        <Grid item>
          <Typography>Detailed</Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: "100%",
          borderRadius: 4,
          border: "1px solid #ffffff",
          py: 4,
          px: 8,
        }}
      >
        <Typography>100%</Typography>
        <Slider color="secondary" defaultValue={0} />
        <Grid container justifyContent="space-between" alignItems="center">
          <Button variant="contained" sx={{ borderRadius: 4 }}>
            25%
          </Button>
          <Button variant="contained" sx={{ borderRadius: 4 }}>
            50%
          </Button>
          <Button variant="contained" sx={{ borderRadius: 4 }}>
            75%
          </Button>
          <Button variant="contained" sx={{ borderRadius: 4 }}>
            Max
          </Button>
        </Grid>
      </Box>
      <Grid container justifyContent="center">
        <ArrowDownwardIcon color="secondary" sx={{ my: 2 }} />
      </Grid>
      <Typography>You will Receive</Typography>
      <StyledInnerPaper>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Grid item>
            <Grid container alignItems="center">
              <img
                src={`/images/tokens/${
                  TOKENS[
                    _.findIndex(TOKENS, function (o) {
                      return o.title == remove.token0Title;
                    })
                  ].address
                }.png`}
                alt="coins"
                width="30px"
              />
              <Typography sx={{ ml: 2 }}>
                Pooled {remove.token0Title}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography>0.482374</Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container alignItems="center">
              <img
                src={`/images/tokens/${
                  TOKENS[
                    _.findIndex(TOKENS, function (o) {
                      return o.title == remove.token1Title;
                    })
                  ].address
                }.png`}
                alt="coins"
                width="30px"
              />
              <Typography sx={{ ml: 2 }}>
                Pooled {remove.token1Title}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography>0.482374</Typography>
          </Grid>
        </Grid>
      </StyledInnerPaper>
      <Grid container columnSpacing={3} sx={{ mt: 3 }}>
        <Grid item sm={6}>
          <Button variant="contained" sx={{ height: "50px" }} fullWidth>
            Enable
          </Button>
        </Grid>
        <Grid item sm={6}>
          <Button variant="contained" fullWidth sx={{ height: "50px" }}>
            Remove
          </Button>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default RemovePad;
