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

const Swap = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState();
  const [balance1, setBalance1] = useState();
  const [price0, setPrice0] = useState("");
  const [price1, setPrice1] = useState("");
  const [token_index, setTokenIndex] = useState(0);
  const [swap_available, setSwapAvailable] = useState(false);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();

  const { address, provider } = useSelector(
    ({ authReducers }) => authReducers.auth.auth
  );
  const { token0, token1 } = useSelector(
    ({ tokenReducers }) => tokenReducers.token
  );

  useEffect(() => {
    const getData = async () => {
      setPrice0(0);
      setPrice1(0);
      await getBalance(token0, 0);
      await getBalance(token1, 1);
    };
    if (address && provider) {
      getData();
    }
  }, [address, provider, token0, token1]);

  const handleChange = (e, index) => {
    var tmpValu1 = e.target.value.toString();
    let tmpVlue2 = e.target.value;
    if (tmpValu1.length > 1) {
      if (tmpValu1.substring(0, 2) != "0.") {
        tmpVlue2 = Number(tmpValu1);
      }
    }
    console.log(tmpVlue2);
    // console.log("index=", index, e);
    if (index === 0) {
      setPrice0(tmpVlue2.toString());
      if (tmpVlue2 > balance) {
        setSwapAvailable(false);
      } else {
        setSwapAvailable(true);
        if (
          (token0.title === "BNB" && index === 0) ||
          (token1.title === "BNB" && index === 1)
        ) {
          if (tmpVlue2 > 0.04) {
            setSwapAvailable(false);
          }
        } //TODO: remove
      }
      getTokenPrices(token0.address, tmpVlue2);
    } else {
      setPrice1(tmpVlue2.toString());

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
            console.log("address=", addresfrom, _amount, token1);
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
                  nftTxn = await contractPrice.swapExactTokensForETH(
                    _amount,
                    0,
                    [token0.address, token1.address],
                    address,
                    deadline
                  );
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
    <div>
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
                step="0.000000001"
                placeholder="0.00"
                fullWidth
                type="number"
                value={price0}
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
                    Balance {balance || 0}
                  </Typography>
                </Grid>
                <Grid item>
                  <StyleChipBtn
                    onClick={() => {
                      console.log("hello");
                    }}
                  >
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
                type="number"
                value={parseFloat(price1).toString()}
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
                    Balance {balance1 || 0}
                  </Typography>
                </Grid>
                <Grid item>
                  <StyleChipBtn
                    onClick={() => {
                      console.log("hello");
                    }}
                  >
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
          ) : !swap_available ? (
            <Button
              fullWidth
              sx={{
                background: theme.custom.gradient.grey,
                height: "50px",
                my: 2,
              }}
            >
              Insufficient Balance
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
    </div>
  );
};

export default Swap;
