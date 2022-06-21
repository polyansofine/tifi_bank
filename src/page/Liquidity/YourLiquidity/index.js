import React from "react";
import { motion } from "framer-motion/dist/framer-motion";
import {
  Box,
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
import RestoreIcon from "@mui/icons-material/Restore";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import YourPool from "./YourPool";
import RemovePad from "./RemovePad";
import { useNavigate } from "react-router-dom";

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
  const { address, provider } = useSelector(
    ({ authReducers }) => authReducers.auth.auth
  );
  const navigate = useNavigate();
  const theme = useTheme();
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
                <Grid item>
                  <IconButton>
                    {" "}
                    <RestoreIcon sx={{ color: "#c8b6ff" }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  {" "}
                  <IconButton>
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
              onClick={() => navigate("add", { replace: true })}
            >
              Add Liquidity
            </Button>
          </Grid>
        </StyledPaper>
      </motion.div>
    </motion.div>
  );
};

export default YourLiquidity;
