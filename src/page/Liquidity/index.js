import {
  Alert,
  Button,
  Collapse,
  Fab,
  Grid,
  IconButton,
  Paper,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  StyledBtn,
  StyledInnerPaper,
  StyledPaper,
  StyleInput,
} from "../../components/LiquidityComponents/StyledPaper";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import coin from "../../assets/image/coin.gif";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import TokenSearchModal from "../Swap/TokenSearchModal";
import { motion } from "framer-motion/dist/framer-motion";

// const StyledPaper = styled(Paper)(({ theme, main }) => ({
//   width: main ? 500 : "100%",
//   padding: "10px 18px",
//   border: main ? "#055080 1px solid" : "#343a40 1px solid",
//   borderRadius: 10,
//   backgroundColor: main ? "#0F0954" : "#130224",
//   color: "white",
//   "&:hover": {
//     border: !main && "#130224 1px solid",
//   },
// }));
let i = 0;
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
const Liquidity = () => {
  const { token0, token1 } = useSelector(
    ({ tokenReducers }) => tokenReducers.token
  );
  //   const [status,setStatus] = useState(false);
  const [token_index, setTokenIndex] = useState(0);
  //   const [ttoken1, setTToken1] = useState();
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();

  return (
    <motion.div initial="exit" animate="enter" exit="exit">
      <motion.div variants={imageVariants}>
        <Box sx={{ width: "700px" }}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{
                mb: 2,
                background: "#39154F",
                color: "white",
                borderRadius: 4,
              }}
            >
              Tip: By adding liquidity you'll earn 0.18% of all trades on this
              pair proportional to your share of the pool. Fees are added to the
              pool, accrue in real time and can be claimed by withdrawing your
              liquidity.
            </Alert>
          </Collapse>
        </Box>
        <StyledPaper>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ my: 3 }}
          >
            <StyledBtn>Liquidity</StyledBtn>
            <IconButton>
              {" "}
              <SettingsOutlinedIcon sx={{ color: "#c8b6ff" }} />
            </IconButton>
          </Grid>
          <StyledInnerPaper>
            <Grid container columnSpacing={4}>
              <Grid item md={4}>
                <Grid container alignItems="center" columnSpacing={2}>
                  <Grid item>
                    <img
                      src={`/images/tokens/${token0.address}.png`}
                      alt={token0.title}
                      width="50px"
                    />
                  </Grid>
                  <Grid item>
                    <Typography sx={{ ml: 2, fontSize: "14px" }}>
                      Input
                    </Typography>
                    <Button
                      onClick={() => {
                        setOpenModal(true);
                        setTokenIndex(0);
                      }}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {token0.title}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={8}>
                <StyledPaper text>
                  <StyleInput placeholder="0.0" />
                </StyledPaper>
              </Grid>
            </Grid>
          </StyledInnerPaper>
          <div style={{ position: "relative" }}>
            <Box
              sx={{
                border: "3px solid #161522",
                color: "grey",

                width: "65px",
                height: "65px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                backgroundColor: "#202231",
                position: "absolute",
                top: "-25px",
                left: "30px",
              }}
            >
              <AddIcon color="secondary" />
            </Box>
          </div>
          {/* <Fab
          sx={{
            backgroundColor: "#202231",
            color: "grey",
            my: -3,
            ml: 4,
          }}
        >
          <AddIcon color="secondary" />
        </Fab> */}
          <StyledInnerPaper sx={{ mt: 3 }}>
            <Grid container columnSpacing={4}>
              <Grid item md={4}>
                <Grid container alignItems="center" columnSpacing={1}>
                  <Grid item>
                    {token1 ? (
                      <img
                        src={`/images/tokens/${token1.address}.png`}
                        alt={token1.title}
                        width="50px"
                      />
                    ) : (
                      <Box
                        sx={{
                          background: "#2E3348",
                          borderRadius: "8px",
                          p: 1,
                        }}
                      >
                        <img src={coin} alt={token1?.title} width="40px" />
                      </Box>
                    )}
                  </Grid>
                  <Grid item>
                    <Typography sx={{ ml: 2, fontSize: "14px" }}>
                      Input
                    </Typography>
                    {token1 ? (
                      <Button
                        onClick={() => {
                          setOpenModal(true);
                          setTokenIndex(1);
                        }}
                        endIcon={<KeyboardArrowDownIcon />}
                      >
                        {token1.title}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setOpenModal(true);
                          setTokenIndex(1);
                        }}
                        variant="outlined"
                        size="small"
                      >
                        Select a token
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={8}>
                <StyledPaper text>
                  <StyleInput placeholder="0.0" />
                </StyledPaper>
              </Grid>
            </Grid>
          </StyledInnerPaper>
          <Collapse in={open} sx={{ mt: 3 }}>
            <StyledInnerPaper>
              <Typography sx={{ mb: 2 }}>Price and pool share</Typography>
              <StyledInnerPaper text>
                <Grid container columnSpacing={2}>
                  <Grid item md={4}>
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Typography>77777</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>TiFi per bnb</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={4}>
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Typography>77777</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>bnb per TiFi</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={4}>
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Typography>0%</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>Share of pool</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </StyledInnerPaper>
            </StyledInnerPaper>
            <Button
              fullWidth
              variant="contained"
              sx={{
                background: theme.custom.gradient.grey,
                height: "50px",
                my: 2,
              }}
            >
              Add liquidity
            </Button>
          </Collapse>
        </StyledPaper>
        <TokenSearchModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          token_index={token_index}
        />
      </motion.div>
    </motion.div>
  );
};

export default Liquidity;
