import {
  Paper,
  Typography,
  styled,
  Grid,
  Button,
  InputBase,
  Fab,
  useTheme,
  IconButton,
  CircularProgress,
  Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TokenSearchModal from "./TokenSearchModal";
import { useSelector, useDispatch } from "react-redux";
import { minABI } from "../../config/TiFI_min_abi";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../config/contract_address";
import getPrice from "../../config/abi/GetPrice.json";
import WalletConnect from "../../components/WalletConnect";
import * as fuseActions from "../../store/actions";
import RouterABI from "../../config/abi/TiFiRouter.json";
import { motion } from "framer-motion/dist/framer-motion";

const StyledPaper = styled(Paper)(({ theme, main }) => ({
  width: main ? 500 : "100%",
  padding: "10px 18px",
  border: main ? "#055080 1px solid" : "#343a40 1px solid",
  borderRadius: 10,
  backgroundColor: main ? "#0F0954" : "#130224",
  color: "white",
  "&:hover": {
    border: !main && "#130224 1px solid",
  },
}));

const StyleInput = styled(InputBase)(({ theme }) => ({
  // width: "16ch",
  fontWeight: 800,
  fontSize: "24px",
  color: "#edf2f4",
}));

const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96],
};
const imageVariants = {
  exit: { y: "10%", opacity: 0, transition },
  enter: {
    y: "0%",
    opacity: 1,
    transition,
  },
};

const Swap = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState();
  const [balance1, setBalance1] = useState();
  const [price0, setPrice0] = useState("");
  const [price1, setPrice1] = useState("");
  const [token_index, setTokenIndex] = useState(0);
  const [reserve_available, setReserveAvailable] = useState(false);
  const [balance_avaliable, setBalanceAvailable] = useState(false);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();

  const { address, provider } = useSelector(
    ({ authReducers }) => authReducers.auth.auth
  );
  const { token0, token1 } = useSelector(
    ({ tokenReducers }) => tokenReducers.token
  );
  const { reserve0, reserve1 } = useSelector(
    ({ tokenReducers }) => tokenReducers.token
  );
  useEffect(() => {
    const getData = async () => {
      setPrice0(0);
      setPrice1(0);
      await getBalance(token0, 0);
      await getBalance(token1, 1);
      await getTokenReserves(token0.address, token1.address);
    };
    if (address && provider) {
      getData();
    }
  }, [address, provider, token0, token1]);

  const handleMax = async (index) => {
    if (index === 0) {
      setBalanceAvailable(true);
      if (token0.title === "BNB") {
        setPrice0(balance - 0.01 <= 0 ? 0 : balance - 0.01);

        if (balance - 0.01 > reserve0 * 0.9) {
          setReserveAvailable(false);
        } else {
          setReserveAvailable(true);
        }
        //TODO: remove

        getTokenPrices(
          token0.address,
          balance - 0.01 <= 0 ? 0 : balance - 0.01
        );
      } else {
        setPrice0(balance);
        if (balance > reserve0 * 0.9) {
          setReserveAvailable(false);
        } else {
          setReserveAvailable(true);
        }
        getTokenPrices(token0.address, balance);
      }
    } else if (index === 1) {
      let priceBuf;
      if (token1.title === "BNB") {
        setPrice1(balance1 - 0.01 <= 0 ? 0 : balance1 - 0.01);
        priceBuf = await getTokenPrices(
          token1.address,
          balance1 - 0.01 <= 0 ? 0 : balance1 - 0.01
        );
      } else {
        setPrice1(balance1);
        priceBuf = await getTokenPrices(token1.address, balance1);
      }
      if (token0.title === "BNB") {
        if (priceBuf > balance - 0.01) {
          setBalanceAvailable(false);
        } else {
          setBalanceAvailable(true);
        }
      } else {
        if (priceBuf > balance) {
          setBalanceAvailable(false);
        } else {
          setBalanceAvailable(true);
        }
      }
      if (priceBuf > reserve0 * 0.9) {
        setReserveAvailable(false);
      } else {
        setReserveAvailable(true);
      }
    }
  };

  const handleChange = (e, index) => {
    let tmpVlue2;
    const rgx = /^[0-9]*(\.\d{0,9})?$/;
    let result = e.target.value.toString().match(rgx);
    tmpVlue2 = result[0];
    console.log("value==", tmpVlue2);
    // var tmpValu1 = e.target.value.toString();
    // if (tmpValu1.length > 1) {
    //   if (tmpValu1.substring(0, 2) != "0.") {
    //     tmpVlue2 = Math.round(Number(tmpValu1) * 10000000000) / 10000000000;
    //   }
    // }
    if (tmpVlue2[0] == "0") {
      if (tmpVlue2.length < 2) {
      } else {
        if (tmpVlue2[1] == ".") {
        } else {
          tmpVlue2 = tmpVlue2.substring(1);
        }
      }
    }

    if (index === 0) {
      console.log("index=", tmpVlue2);
      setPrice0(tmpVlue2);
      let balanceBuf = balance;
      if (token0.title === "BNB") {
        balanceBuf -= 0.01;
      }
      if (tmpVlue2 > balanceBuf) {
        setBalanceAvailable(false);
      } else {
        setBalanceAvailable(true);
        if (tmpVlue2 > reserve0 * 0.9) {
          console.log("reserve0val==", tmpVlue2);
          setReserveAvailable(false);
        } else {
          setReserveAvailable(true);
        }
        //TODO: remove
      }
      getTokenPrices(token0.address, tmpVlue2);
    } else {
      setPrice1(tmpVlue2.toString());
      let balanceBuf = balance1;
      if (token1.title === "BNB") {
        balanceBuf -= 0.01;
      }
      if (tmpVlue2 > balanceBuf) {
        setBalanceAvailable(false);
      } else {
        setBalanceAvailable(true);

        if (tmpVlue2 > reserve1 * 0.9) {
          setReserveAvailable(false);
        } else {
          setReserveAvailable(true);
        }
        //TODO: remove
      }
      getTokenPrices(token1.address, tmpVlue2);
    }
  };
  const getBalance = async (token, index) => {
    // const providers = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(token.address, minABI, signer);
    console.log("contract===", contract);
    try {
      if (address != null) {
        const token0Bal = await contract.balanceOf(address);
        const token0Decimals = await contract.decimals();
        if (token.title == "BNB") {
          const bnbBalbuf = await provider.getBalance(address);
          const balBNB = ethers.utils.formatUnits(bnbBalbuf, "ether");
          if (index === 0) {
            setBalance(Number(balBNB));
          } else {
            setBalance1(Number(balBNB));
          }
          return Number(balBNB);
        } else {
          if (index === 0) {
            setBalance(Number(token0Bal._hex) / Number(10 ** token0Decimals));
          } else {
            setBalance1(Number(token0Bal._hex) / Number(10 ** token0Decimals));
          }
          return Number(token0Bal._hex) / Number(10 ** token0Decimals);
        }
      } else {
        return 0;
      }
    } catch (error) {
      return 0;
    }
  };
  const getTokenReserves = async (address0, address1) => {
    if (provider) {
      const signer = provider.getSigner();
      let contractPrice = new ethers.Contract(
        CONTRACT_ADDRESS.GET_PRICE_ADDRESS,
        getPrice.abi,
        signer
      );
      if (address1 && address0 && address !== null) {
        try {
          const PriveVal = await contractPrice.getReserves(address0, address1);
          console.log("prive====", PriveVal[0] / 10 ** 18);
          dispatch(
            fuseActions.getReserves(
              PriveVal[0] / 10 ** 18,
              PriveVal[1] / 10 ** 18
            )
          );
        } catch (error) {
          dispatch(
            fuseActions.showMessage({
              message: error.data ? error.data.message : error.message,
              variant: "error",
            })
          );
        }
      }
    }
  };

  async function getTokenPrices(addresfrom, amount) {
    // const chainId = 97;
    if (provider) {
      // const providers = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contractPrice = new ethers.Contract(
        CONTRACT_ADDRESS.GET_PRICE_ADDRESS,
        getPrice.abi,
        signer
      );

      if (address != null) {
        let _amount;
        if (Number(amount) < 100) {
          _amount = (Number(amount) * 10 ** 18).toString();
        } else {
          _amount = parseInt(amount).toString() + "000000000000000000";
        }
        try {
          if (addresfrom === token0.address) {
            const PriveVal = await contractPrice.getTokenPriceUsingAmount(
              addresfrom,
              token1.address,
              _amount
            );

            let token1AmountBuf;
            if (Number(PriveVal) <= 10000000000) {
              token1AmountBuf = 0;
            } else {
              token1AmountBuf = PriveVal / 10 ** 18;
            }
            setPrice1(token1AmountBuf);
            return token1AmountBuf;
          } else {
            const PriveVal = await contractPrice.getTokenPriceUsingAmount(
              addresfrom,
              token0.address,
              _amount
            );
            let token0AmountBuf;
            if (Number(PriveVal) <= 10000000000) {
              token0AmountBuf = 0;
            } else {
              token0AmountBuf = (PriveVal / 10 ** 18).toString();
            }
            setPrice0(token0AmountBuf);
            return token0AmountBuf;
          }
        } catch (error) {
          console.log("error=", error);
          return 0;
        }
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  const handleSwap = async () => {
    // const chainId = 97;
    setStatus(true);
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contractPrice = new ethers.Contract(
      CONTRACT_ADDRESS.ROUTER_ADDRESS,
      RouterABI.abi,
      signer
    );
    let contract0 = new ethers.Contract(token0.address, minABI, signer);

    let dateInAWeek = new Date();
    const deadline = Math.floor(dateInAWeek.getTime() / 1000) + 1000000;
    try {
      if (address != null) {
        if (token0.title === "BNB") {
          try {
            let nftTxn =
              await contractPrice.swapExactETHForTokensSupportingFeeOnTransferTokens(
                0,
                [token0.address, token1.address],
                address,
                deadline,
                {
                  value: ethers.utils.parseUnits(
                    Number(price0).toString(),
                    "ether"
                  )._hex,
                }
              );
            await nftTxn.wait();
            setPrice0(0);
            setPrice1(0);
            dispatch(
              fuseActions.showMessage({
                message: "swap success",
                variant: "success",
              })
            );
            await getBalance(token0, 0);
            await getBalance(token1, 1);
            await getTokenReserves(token0.address, token1.address);
            setStatus(false);
            // setSwaps({ ...swaps });
          } catch (error) {
            setPrice0(0);
            setPrice1(0);
            dispatch(
              fuseActions.showMessage({
                message: error.data ? error.data.message : error.message,
                variant: "error",
              })
            );
            setStatus(false);

            // setSwaps({ ...swaps });
          }
        } else {
          if (token1.title === "BNB") {
            try {
              let _amount;
              if (Number(price0) < 100) {
                _amount = (Number(price0) * 10 ** 18).toString();
              } else {
                _amount = parseInt(price0).toString() + "000000000000000000";
              }
              const PriveVal = await contract0.allowance(
                address,
                CONTRACT_ADDRESS.ROUTER_ADDRESS
              );
              console.log("PriveVal==", price0);
              let nftTxn;
              if (Number(PriveVal._hex) / 10 ** 18 < Number(price0)) {
                console.log("PriveVal==", Number(PriveVal._hex));
                console.log("PriveVal1==", price0);
                let nftTxnApprove = await contract0.approve(
                  CONTRACT_ADDRESS.ROUTER_ADDRESS,
                  "1000000000000000000000000000000000000"
                );
                nftTxnApprove.wait();
                let _interVal = setInterval(async () => {
                  const PriveValBuf = await contract0.allowance(
                    address,
                    CONTRACT_ADDRESS.ROUTER_ADDRESS
                  );
                  if (Number(PriveValBuf._hex) / 10 ** 18 > Number(price0)) {
                    clearInterval(_interVal);
                  }
                }, 3000);
              } else {
                console.log("txn===", "helelel");
                nftTxn = await contractPrice.swapExactTokensForETH(
                  _amount,
                  0,
                  [token0.address, token1.address],
                  address,
                  deadline
                );
                console.log("txn===", nftTxn);
              }

              await nftTxn.wait();
              setPrice0(0);
              setPrice1(0);
              dispatch(
                fuseActions.showMessage({
                  message: "swap success",
                  variant: "success",
                })
              );
              await getBalance(token0, 0);
              await getBalance(token1, 1);
              await getTokenReserves(token0.address, token1.address);
              setStatus(false);
            } catch (error) {
              console.log("error===", error);
              setPrice0(0);
              setPrice1(0);
              dispatch(
                fuseActions.showMessage({
                  message: error.data ? error.data.message : error.message,
                  variant: "error",
                })
              );
              setStatus(false);
            }
          } else {
            try {
              let _amount;
              if (Number(price0) < 100) {
                _amount = (Number(price0) * 10 ** 18).toString();
              } else {
                _amount = parseInt(price0).toString() + "000000000000000000";
              }
              const PriveVal = await contract0.allowance(
                address,
                CONTRACT_ADDRESS.ROUTER_ADDRESS
              );
              console.log("PriveVal==", price0);
              let nftTxn;
              if (Number(PriveVal._hex) / 10 ** 18 < Number(price0)) {
                console.log("PriveVal==", Number(PriveVal._hex));
                console.log("PriveVal1==", price0);
                let nftTxnApprove = await contract0.approve(
                  CONTRACT_ADDRESS.ROUTER_ADDRESS,
                  "1000000000000000000000000000000000000"
                );
                nftTxnApprove.wait();
                let _interVal = setInterval(async () => {
                  const PriveValBuf = await contract0.allowance(
                    address,
                    CONTRACT_ADDRESS.ROUTER_ADDRESS
                  );
                  if (Number(PriveValBuf._hex) / 10 ** 18 > Number(price0)) {
                    clearInterval(_interVal);
                  }
                }, 3000);
              } else {
                console.log("txn===", "helelel");
                nftTxn = await contractPrice.swapExactTokensForTokens(
                  _amount,
                  0,
                  [token0.address, token1.address],
                  address,
                  deadline
                );
                console.log("txn===", nftTxn);
              }

              await nftTxn.wait();
              setPrice0(0);
              setPrice1(0);
              dispatch(
                fuseActions.showMessage({
                  message: "swap success",
                  variant: "success",
                })
              );
              await getBalance(token0, 0);
              await getBalance(token1, 1);
              await getTokenReserves(token0.address, token1.address);
              setStatus(false);
            } catch (error) {
              console.log("error===", error);
              setPrice0(0);
              setPrice1(0);
              dispatch(
                fuseActions.showMessage({
                  message: error.data ? error.data.message : error.message,
                  variant: "error",
                })
              );
              setStatus(false);
            }
          }
        }
      }
    } catch (error) {
      setPrice0(0);
      setPrice1(0);
      dispatch(
        fuseActions.showMessage({
          message: error.data ? error.data.message : error.message,
          variant: "error",
        })
      );
      setStatus(false);
    }
  };

  const CoinButton = React.forwardRef(({ src, children, ...rest }, ref) => {
    return (
      <Button
        ref={ref}
        {...rest}
        startIcon={
          <img
            width="20px"
            height="20px"
            style={{ borderRadius: "50%" }}
            src={src}
            alt="eth"
          />
        }
        color="secondary"
        variant="contained"
        endIcon={<KeyboardArrowDownIcon />}
      >
        {children}
      </Button>
    );
  });

  const StyleChipBtn = React.forwardRef(({ children, ...rest }, ref) => {
    return (
      <Button
        {...rest}
        variant="outlined"
        ref={ref}
        color="info"
        sx={{ color: theme.palette.info.main }}
        size="small"
      >
        {children}
      </Button>
    );
  });
  return (
    <motion.div initial="exit" animate="enter" exit="exit">
      <motion.div variants={imageVariants}>
        <StyledPaper main sx={{ position: "relative" }}>
          <IconButton sx={{ position: "absolute", top: 6, right: 6 }}>
            <SettingsOutlinedIcon sx={{ color: "#c8b6ff" }} />
          </IconButton>
          <Typography variant="h6" sx={{ my: 2 }}>
            Swap
          </Typography>
          <StyledPaper>
            <Grid container direction="row-reverse">
              <CoinButton
                onClick={() => {
                  setOpen(true);
                  setTokenIndex(0);
                }}
                src={`/images/tokens/${token0.address}.png`}
              >
                {token0.title}
              </CoinButton>
            </Grid>
            <Grid container direction="column">
              <Grid item>
                <StyleInput
                  placeholder="0.00"
                  fullWidth
                  // type="number"
                  value={
                    // price0 > 0
                    price0 != null
                      ? price0.toString().split(".").length == 1
                        ? price0
                        : price0.toString().split(".")[0] +
                          "." +
                          price0.toString().split(".")[1].substring(0, 9)
                      : null
                    // Math.round(price0 * 1000000000) / 1000000000
                    // : null
                  }
                  onChange={(e) => handleChange(e, 0)}
                />
              </Grid>

              <Grid item>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography sx={{ color: "#8a817c" }}>
                      Balance{" "}
                      {Math.round(balance * 1000000000) / 1000000000 || 0}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <StyleChipBtn onClick={() => handleMax(0)}>
                      Max
                    </StyleChipBtn>
                  </Grid>
                </Grid>{" "}
              </Grid>
            </Grid>
          </StyledPaper>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <Fab
              size="small"
              onClick={() => dispatch(fuseActions.selectToken(token1, token0))}
            >
              <ArrowDownwardIcon />
            </Fab>
          </Grid>
          <StyledPaper sx={{ mt: 1 }}>
            <Grid container direction="row-reverse">
              <CoinButton
                onClick={() => {
                  setOpen(true);
                  setTokenIndex(1);
                }}
                src={`/images/tokens/${token1.address}.png`}
              >
                {token1.title}
              </CoinButton>
            </Grid>
            <Grid container direction="column">
              <Grid item>
                <StyleInput
                  fullWidth
                  placeholder="0.00"
                  // type="number"
                  value={
                    // price0 > 0
                    price1 != null
                      ? price1.toString().split(".").length == 1
                        ? price1
                        : price1.toString().split(".")[0] +
                          "." +
                          price1.toString().split(".")[1].substring(0, 9)
                      : null
                    // : null
                  }
                  onChange={(e) => handleChange(e, 1)}
                />
              </Grid>
              {/* <Grid item>
              {" "}
              <Typography sx={{ color: "#c8b6ff" }}>$1800</Typography>
            </Grid> */}
              <Grid item>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography sx={{ color: "#8a817c" }}>
                      Balance{" "}
                      {Math.round(balance1 * 1000000000) / 1000000000 || 0}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <StyleChipBtn onClick={() => handleMax(1)}>
                      Max
                    </StyleChipBtn>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </StyledPaper>
          {address ? (
            !price0 ? (
              <Button
                fullWidth
                sx={{
                  background: theme.custom.gradient.pink,
                  height: "50px",
                  my: 2,
                }}
              >
                Enter Amount
              </Button>
            ) : !balance_avaliable || !reserve_available ? (
              <Button
                fullWidth
                sx={{
                  background: theme.custom.gradient.grey,
                  height: "50px",
                  my: 2,
                }}
              >
                {!reserve_available
                  ? "Insufficient Liquidity for This Trade"
                  : "Insufficient Balance"}
              </Button>
            ) : (
              <Button
                onClick={handleSwap}
                disabled={status}
                fullWidth
                sx={{
                  background: theme.custom.gradient.green,
                  height: "50px",
                  my: 2,
                }}
              >
                {status ? <CircularProgress /> : "Swap"}
              </Button>
            )
          ) : (
            <WalletConnect type />
          )}
        </StyledPaper>
        <TokenSearchModal
          open={open}
          handleClose={() => setOpen(false)}
          token_index={token_index}
        />
      </motion.div>
    </motion.div>
  );
};

export default Swap;
