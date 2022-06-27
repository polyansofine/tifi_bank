import {
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputBase,
  styled,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const StyledButton = styled(ButtonBase)(({ active, theme }) => ({
  height: "30px",
  paddingRight: 10,
  paddingLeft: "10px",
  borderRadius: 12,
  background: active ? "#1FC7D3" : "#3B384C",
  color: active ? "#ffffff" : "#1FC7D3",
  fontWeight: 700,
}));
const StyledInput = styled(InputBase)(({ theme }) => ({
  height: "30px",
  width: "60px",
  paddingRight: 10,
  paddingLeft: "10px",
  background: "#3B384C",
  borderRadius: 12,
  color: "#ffffff",
  "&.Mui-focused": {
    border: "2px solid #8C62E6",
  },
}));

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 60,
  height: 34,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(26px)",
      color: "#27262C",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#1FC7D3",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    // "&.Mui-focusVisible .MuiSwitch-thumb": {
    //   color: "#3A364B",
    //   border: "6px solid #fff",
    // },
    // "&.Mui-disabled .MuiSwitch-thumb": {
    //   color: "#27262C",
    // },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 30,
    height: 30,
    color: "#27262C",
    "&:hover, &.Mui-focusVisible": {
      color: "#8C62E6",
    },
  },

  "& .MuiSwitch-track": {
    borderRadius: 60 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#3A364B" : "#39393D",
    opacity: 1,
    // transition: theme.transitions.create(["background-color"], {
    //   duration: 500,
    // }),
  },
}));

const SettingModal = ({ open, handleClose }) => {
  const theme = useTheme();
  //   const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  //   console.log("fullscreen=", fullScreen);
  return (
    <Dialog
      //   fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: 12,
          background: "#27262C",
          width: "400px",

          "*::-webkit-scrollbar": {
            width: "0.4em",
          },
          "*::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#B8ADD2",
            outline: "2px solid slategrey",
            borderRadius: 6,
          },
        },
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle sx={{ background: "#3B384C", py: 4 }}>
        <>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography color="secondary">Settings</Typography>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </>
      </DialogTitle>
      <DialogContent sx={{ p: 4 }}>
        <Typography sx={{ color: "#8C62E6", my: 2 }}>GLOBAL</Typography>
        <Typography sx={{ color: "white", my: 2 }}>
          Default Transaction Speed (GWEI)
        </Typography>
        <Grid container columnSpacing={2}>
          <Grid item>
            <StyledButton active="true">Standard(5)</StyledButton>
          </Grid>
          <Grid item>
            <StyledButton>Fast(6)</StyledButton>
          </Grid>
          <Grid item>
            <StyledButton>Instant(7)</StyledButton>
          </Grid>
        </Grid>
        <Divider sx={{ border: "1px solid #3B384C", my: 2 }} />
        <Typography sx={{ color: "#8C62E6", my: 2 }}>
          SWAP & LIQUIDITY
        </Typography>
        <Typography sx={{ color: "white", my: 1 }}>
          Slippage Tolerance
        </Typography>
        <Grid container columnSpacing={1}>
          <Grid item>
            <StyledButton>0.1%</StyledButton>
          </Grid>
          <Grid item>
            <StyledButton>0.5%</StyledButton>
          </Grid>
          <Grid item>
            <StyledButton active="true">1.0%</StyledButton>
          </Grid>
          <Grid item>
            <Grid container justifyContent="center" columnSpacing={1}>
              <Grid item>
                <StyledInput />
              </Grid>
              <Grid item>
                <Typography sx={{ color: "#1FC7D3" }}>%</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" sx={{ my: 2 }}>
          <Grid item>
            <Typography sx={{ color: "#ffffff" }}>Tx deadline(mins)</Typography>
          </Grid>
          <Grid item>
            <StyledInput defaultValue={20} />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" sx={{ my: 2 }}>
          <Grid item>
            <Typography sx={{ color: "#ffffff" }}>Expert Mode</Typography>
          </Grid>
          <Grid item>
            <IOSSwitch />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" sx={{ my: 2 }}>
          <Grid item>
            <Typography sx={{ color: "#ffffff" }}>Disable Multihops</Typography>
          </Grid>
          <Grid item>
            <IOSSwitch />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" sx={{ my: 2 }}>
          <Grid item>
            <Typography sx={{ color: "#ffffff" }}>
              Subgraph Health Indicator
            </Typography>
          </Grid>
          <Grid item>
            <IOSSwitch />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default SettingModal;
