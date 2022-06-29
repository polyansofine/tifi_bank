/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Fab,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledPaper } from "./../../../components/LiquidityComponents/StyledPaper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Add from "@mui/icons-material/Add";
import * as liquidityActions from "../../../store/actions";
import { TOKENS } from "../../../config/token";
import TokenSearchModal from "../../Swap/TokenSearchModal";
import { LP_TOKENS } from "../../../config/LP_tokens";

import { ethers } from "ethers";
import { minABI } from "../../../config/TiFI_min_abi";
import { useNavigate } from "react-router-dom";
import SettingModal from "../../../components/SettingModal";

const FindLiquidity = () => {
  const { token0, token1 } = useSelector(
    ({ tokenReducers }) => tokenReducers.liquidity
  );
  const { address, provider } = useSelector(
    ({ authReducers }) => authReducers.auth.auth
  );
  const [openModal, setOpenModal] = useState(false);
  const [token_index, setTokenIndex] = useState(0);
  const [total, setTotal] = useState();
  const [pool0, setPool0] = useState();
  const [pool1, setPool1] = useState();
  const [no_pool, setNoPool] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(liquidityActions.setTokens(TOKENS[0], {}));
  }, [dispatch]);
  useEffect(() => {
    const getData = async () => {
      await getLiquidityBalance(token0, token1);
    };
    if (token0.title && token1.title && provider) {
      getData();
    }
  }, [token0, token1, provider]);
  const getLiquidityBalance = async (t0, t1) => {
    const signer = provider.getSigner();
    setLoading(true);
    try {
      if (address != null) {
        await Promise.all(
          LP_TOKENS.map(async (item, index) => {
            if (
              (item.token0_name == t0.title && item.token1_name == t1.title) ||
              (item.token0_name == t1.title && item.token1_name == t0.title)
            ) {
              let contract = new ethers.Contract(item.address, minABI, signer);
              let totalLp = await contract.totalSupply();
              setTotal(totalLp / 10 ** 18);
              console.log("total=", totalLp / 10 ** 18);
              let contaract0 = new ethers.Contract(t0.address, minABI, signer);
              let contaract1 = new ethers.Contract(t1.address, minABI, signer);
              let pooledToken0 = await contaract0.balanceOf(item.address);
              let pooledToken1 = await contaract1.balanceOf(item.address);
              setPool0(pooledToken0 / 10 ** 18);
              setPool1(pooledToken1 / 10 ** 18);
              setLoading(false);
            } else {
              console.log("no==", t0.title, t1.title);
              setNoPool(true);
              setLoading(false);
              setPool0(null);
              setPool1(null);
              setTotal(null);
            }
          })
        );

        //  dispatch(liquidityActions.getLiquidityBalance(tmp));
        //  setLoading(false);
      }
    } catch (error) {}
  };

  return (
    <StyledPaper>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Grid container columnSpacing={2}>
            <Grid item>
              <IconButton onClick={() => navigate("..")}>
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
          <IconButton onClick={() => setOpenSetting(true)}>
            {" "}
            <SettingsOutlinedIcon sx={{ color: "#c8b6ff" }} />
          </IconButton>
        </Grid>
      </Grid>
      <Divider sx={{ border: "0.1px solid #383241", my: 2, mx: -2 }} />
      <Grid container direction="column" rowSpacing={2}>
        <Grid item>
          <Button
            fullWidth
            variant="contained"
            sx={{ height: "60px" }}
            onClick={() => {
              setOpenModal(true);
              setTokenIndex(0);
            }}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Grid container alignItems="center">
                  {token0.title ? (
                    <>
                      <img
                        src={`/images/tokens/${token0.address}.png`}
                        alt={token0.title}
                        width="50px"
                      />
                      <Typography sx={{ ml: 2 }}>{token0.title}</Typography>
                    </>
                  ) : (
                    <Typography>Select a Token</Typography>
                  )}
                </Grid>
              </Grid>
              <Grid item>
                <IconButton>
                  <KeyboardArrowDownIcon color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
          </Button>
        </Grid>
        <Grid item>
          <Grid container justifyContent="center" alignItems="center">
            <IconButton>
              <Add color="secondary" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            fullWidth
            variant="contained"
            sx={{ height: "60px" }}
            onClick={() => {
              setOpenModal(true);
              setTokenIndex(1);
            }}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Grid container alignItems="center">
                  {token1.title ? (
                    <>
                      <img
                        src={`/images/tokens/${token1.address}.png`}
                        alt={token1.title}
                        width="50px"
                      />
                      <Typography sx={{ ml: 2 }}>{token1.title}</Typography>:
                    </>
                  ) : (
                    <Typography>Select a Token</Typography>
                  )}
                </Grid>
              </Grid>

              <Grid item>
                <IconButton>
                  <KeyboardArrowDownIcon color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ my: 2 }}
      >
        {pool0 && <Typography>Pool found!</Typography>}
      </Grid>
      {/* <StyledInnerPaper sx={{ mt: 3 }}>
        <Typography>Select a token to find your liquidity</Typography>
      </StyledInnerPaper> */}
      <Box
        sx={{
          width: "100%",
          height: "150px",
          border: "1px solid grey",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          rowGap: 2,
          p: 3,
        }}
      >
        {loading ? (
          <CircularProgress color="secondary" />
        ) : pool0 ? (
          <>
            {/* <Grid direction="column" rowSpacing={3} justifyContent="center"> */}

            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Grid container alignItems="center">
                  <img
                    src={`/images/tokens/${token1.address}.png`}
                    alt={token1.title}
                    width="30px"
                  />
                  <img
                    src={`/images/tokens/${token0.address}.png`}
                    alt={token0.title}
                    width="30px"
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Typography>{total}</Typography>
              </Grid>
            </Grid>

            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Grid container alignItems="center">
                  <Typography>{token0.title}</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography>{pool0}</Typography>
              </Grid>
            </Grid>

            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Grid container alignItems="center">
                  {token1.title}
                </Grid>
              </Grid>
              <Grid item>
                <Typography>{pool1}</Typography>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {no_pool ? (
              <>
                <Typography>
                  You don't have liquidity in this pool yet
                </Typography>
                <br />
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
                  onClick={() => {
                    dispatch(liquidityActions.setTokens(token0, token1));
                    navigate("../add");
                  }}
                >
                  Add Liquidity
                </Fab>
              </>
            ) : (
              <Typography> Select a token to find your liquidity</Typography>
            )}
          </Grid>
        )}
      </Box>
      <TokenSearchModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        token_index={token_index}
      />
      <SettingModal
        open={openSetting}
        handleClose={() => setOpenSetting(false)}
      />
    </StyledPaper>
  );
};

export default FindLiquidity;
