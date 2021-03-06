import React, { useState } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import {
  Button,
  Fab,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import {
  StyledInnerPaper,
  StyledPaper,
} from "../../../components/LiquidityComponents/StyledPaper";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import YourPool from "./YourPool";
import { useNavigate } from "react-router-dom";
import * as liquidityActions from "../../../store/actions";
import { TOKENS } from "../../../config/token";
import SettingModal from "../../../components/SettingModal";

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
const YourLiquidity = ({ loading }) => {
  const { address } = useSelector(({ authReducers }) => authReducers.auth.auth);
  // const { balances } = useSelector(
  //   ({ tokenReducers }) => tokenReducers.liquidity
  // );
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [openSetting, setOpenSetting] = useState(false);
  return (
    <motion.div initial="exit" animate="enter" exit="exit">
      <motion.div variants={imageVariants}>
        <StyledPaper>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Grid item>
              <Typography>Your Liquidity</Typography>
              <Typography>Remove liquidity to receive tokens back</Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row-reverse"
                alignItems="center"
                columnSpacing={2}
              >
                {/* <Grid item>
                  <IconButton>
                    {" "}
                    <RestoreIcon sx={{ color: "#c8b6ff" }} />
                  </IconButton>
                </Grid> */}
                <Grid item>
                  {" "}
                  <IconButton onClick={() => setOpenSetting(true)}>
                    {" "}
                    <SettingsOutlinedIcon sx={{ color: "#c8b6ff" }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <StyledInnerPaper>
            {address ? (
              <YourPool loading={loading} />
            ) : (
              // <RemovePad />
              // <Grid container alignItems="center" direction="column" rowGap={2}>
              //   <Grid item>
              //     <Typography>No liquidity found</Typography>
              //   </Grid>
              //   <Grid item>
              //     <Typography>Don't see a pool you joined?</Typography>
              //   </Grid>
              //   <Grid item>
              //     <Fab
              //       variant="extended"
              //       sx={{
              //         backgroundColor: "#202231",
              //         color: "#1FC7D3",
              //         textTransform: "capitalize",
              //         border: "1px solid #1FC7D3",
              //         "&:hover": {
              //           background: "#161522",
              //           color: "#000000",
              //         },
              //       }}
              //     >
              //       Find other LP tokens
              //     </Fab>
              //   </Grid>
              // </Grid>
              <Grid container alignItems="center" direction="column">
                <Typography>
                  Connect to a wallet to view your liquidity.
                </Typography>
              </Grid>
            )}
          </StyledInnerPaper>
          <Grid container justifyContent="center">
            <Fab
              variant="extended"
              sx={{
                backgroundColor: "#202231",
                color: "#1FC7D3",
                mt: 2,
                textTransform: "capitalize",
                border: "1px solid #1FC7D3",
                "&:hover": {
                  background: "#161522",
                  color: "#000000",
                },
              }}
              onClick={() => {
                dispatch(liquidityActions.setTokens(TOKENS[0], {}));
                navigate("find");
              }}
            >
              Import Token
            </Fab>
            <Button
              startIcon={<AddIcon />}
              fullWidth
              variant="contained"
              sx={{
                background: theme.custom.gradient.blue,
                height: "50px",
                mt: 3,
                borderRadius: 6,
              }}
              onClick={() => {
                dispatch(liquidityActions.setTokens({}, {}));
                navigate("add", { replace: true });
              }}
            >
              Add Liquidity
            </Button>
          </Grid>
        </StyledPaper>
        <SettingModal
          open={openSetting}
          handleClose={() => setOpenSetting(false)}
        />
      </motion.div>
    </motion.div>
  );
};

export default YourLiquidity;
