/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { ethers } from "ethers";
import { minABI } from "../../../../config/TiFI_min_abi";
import { CONTRACT_ADDRESS } from "../../../../config/contract_address";
import RouterABI from "../../../../config/abi/TiFiRouter.json";

const RemovePad = () => {
  const [value, setValue] = useState(30);
  const [loading, setLoading] = useState(false);
  const [allowance_price, setAllowancePrice] = useState();
  const { remove } = useSelector(
    ({ tokenReducers }) => tokenReducers.liquidity
  );
  const { address, provider } = useSelector(
    ({ authReducers }) => authReducers.auth.auth
  );

  const dispatch = useDispatch();
  const handleChange = (e, newValue) => {
    console.log("value==", value);
    setValue(newValue);
  };
  useEffect(() => {
    const getData = async () => {
      await getAllowance(remove.address);
    };
    if (remove.balance) {
      getData();
    }
  }, [remove]);

  const getAllowance = async (pair_address) => {
    const signer = provider.getSigner();
    if (pair_address) {
      let contract0 = new ethers.Contract(pair_address, minABI, signer);
      const allow_price0 = await contract0.allowance(
        address,
        CONTRACT_ADDRESS.ROUTER_ADDRESS
      );
      setAllowancePrice(allow_price0 / 10 ** 18);
      console.log("aloow==", allow_price0 / 10 ** 18);
    }
  };

  const handleEnable = async () => {
    setLoading(true);
    try {
      const signer = provider.getSigner();
      let contract0 = new ethers.Contract(remove.address, minABI, signer);

      let nftTxnApprove = await contract0.approve(
        CONTRACT_ADDRESS.ROUTER_ADDRESS,
        "1000000000000000000000000000000000000"
      );
      await nftTxnApprove.wait();
      await getAllowance(remove.address);
      setLoading(false);
    } catch (error) {
      dispatch(
        liquidityActions.showMessage({
          message: error.data ? error.data.message : error.message,
          variant: "error",
        })
      );
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contractPrice = new ethers.Contract(
      CONTRACT_ADDRESS.ROUTER_ADDRESS,
      RouterABI.abi,
      signer
    );
    const price = (remove.balance * value) / 100;
    //  let contract0 = new ethers.Contract(token0.address, minABI, signer);

    let dateInAWeek = new Date();
    const deadline = Math.floor(dateInAWeek.getTime() / 1000) + 1000000;
    try {
      if (address != null) {
        if (remove.token0Title === "BNB") {
          try {
            let _amount;
            if (Number(price) < 100) {
              _amount = (Number(price) * 10 ** 18).toString();
            } else {
              _amount = parseInt(price).toString() + "000000000000000000";
            }
            let nftTxn = await contractPrice.removeLiquidityETH(
              remove.token1Address,
              _amount,
              0,
              0,
              address,
              deadline
            );
            await nftTxn.wait();
            // setPrice0(0);
            // setPrice1(0);
            dispatch(
              liquidityActions.showMessage({
                message: "Liquidity Remove success",
                variant: "success",
              })
            );
            // await getBalance(token0, 0);
            // await getBalance(token1, 1);
            // await getTokenReserves(token0.address, token1.address);
            // await getPerPrice(token0.address, token1.address);
            // setStatus(false);
            // setSwaps({ ...swaps });
          } catch (error) {
            // setPrice0(0);
            // setPrice1(0);
            dispatch(
              liquidityActions.showMessage({
                message: error.data ? error.data.message : error.message,
                variant: "error",
              })
            );
            // setStatus(false);

            // setSwaps({ ...swaps });
          }
        } else {
          if (remove.token1Title === "BNB") {
            try {
              let _amount;
              if (Number(price) < 100) {
                _amount = (Number(price) * 10 ** 18).toString();
              } else {
                _amount = parseInt(price).toString() + "000000000000000000";
              }
              //  const PriveVal = await contract0.allowance(
              //    address,
              //    CONTRACT_ADDRESS.ROUTER_ADDRESS
              //  );
              console.log("PriveVal==", price);
              let nftTxn;

              nftTxn = await contractPrice.removeLiquidityETH(
                remove.token0Address,
                _amount,
                0,
                0,
                address,
                deadline
              );
              //  console.log("txn===", "helelel");
              console.log("txn===", nftTxn);

              await nftTxn.wait();
              // setPrice0(0);
              // setPrice1(0);
              dispatch(
                liquidityActions.showMessage({
                  message: "swap success",
                  variant: "success",
                })
              );
              // await getBalance(token0, 0);
              // await getBalance(token1, 1);
              // await getTokenReserves(token0.address, token1.address);
              // await getPerPrice(token0.address, token1.address);

              // setStatus(false);
            } catch (error) {
              console.log("error===", error);
              // setPrice0(0);
              // setPrice1(0);
              dispatch(
                liquidityActions.showMessage({
                  message: error.data ? error.data.message : error.message,
                  variant: "error",
                })
              );
              // setStatus(false);
            }
          } else {
            try {
              let _amount;
              if (Number(price) < 100) {
                _amount = (Number(price) * 10 ** 18).toString();
              } else {
                _amount = parseInt(price).toString() + "000000000000000000";
              }

              let nftTxn;

              nftTxn = await contractPrice.removeLiquidity(
                remove.token0Address,
                remove.token1Address,

                _amount,

                0,
                0,
                address,
                deadline
              );
              console.log("txn===", nftTxn);

              await nftTxn.wait();
              // setPrice0(0);
              // setPrice1(0);
              dispatch(
                liquidityActions.showMessage({
                  message: "swap success",
                  variant: "success",
                })
              );
              // await getBalance(token0, 0);
              // await getBalance(token1, 1);
              // await getTokenReserves(token0.address, token1.address);
              // await getPerPrice(token0.address, token1.address);

              // setStatus(false);
            } catch (error) {
              console.log("error===", error);
              // setPrice0(0);
              // setPrice1(0);
              dispatch(
                liquidityActions.showMessage({
                  message: error.data ? error.data.message : error.message,
                  variant: "error",
                })
              );
              // setStatus(false);
            }
          }
        }
      }
    } catch (error) {
      // setPrice0(0);
      // setPrice1(0);
      dispatch(
        liquidityActions.showMessage({
          message: error.data ? error.data.message : error.message,
          variant: "error",
        })
      );
      // setStatus(false);
    }
  };

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
        <Typography>{value}%</Typography>
        <Slider color="secondary" value={value} onChange={handleChange} />
        <Grid container justifyContent="space-between" alignItems="center">
          <Button
            onClick={() => setValue(25)}
            variant="contained"
            sx={{ borderRadius: 4 }}
          >
            25%
          </Button>
          <Button
            onClick={() => setValue(50)}
            variant="contained"
            sx={{ borderRadius: 4 }}
          >
            50%
          </Button>
          <Button
            onClick={() => setValue(75)}
            variant="contained"
            sx={{ borderRadius: 4 }}
          >
            75%
          </Button>
          <Button
            onClick={() => setValue(100)}
            variant="contained"
            sx={{ borderRadius: 4 }}
          >
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
            <Typography>
              {(remove.pool0 * remove.balance * value) / (remove.total * 100)}
            </Typography>
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
            <Typography>
              {" "}
              {(remove.pool1 * remove.balance * value) / (remove.total * 100)}
            </Typography>
          </Grid>
        </Grid>
      </StyledInnerPaper>
      <Grid container columnSpacing={3} sx={{ mt: 3 }}>
        <Grid item sm={6}>
          <Button
            disabled={allowance_price > (remove.balance * value) / 100}
            variant="contained"
            sx={{ height: "50px" }}
            fullWidth
            onClick={handleEnable}
          >
            {loading ? <CircularProgress /> : " Enable"}
          </Button>
        </Grid>
        <Grid item sm={6}>
          <Button
            disabled={allowance_price <= (remove.balance * value) / 100}
            variant="contained"
            fullWidth
            sx={{ height: "50px" }}
            onClick={handleRemove}
          >
            Remove
          </Button>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default RemovePad;
