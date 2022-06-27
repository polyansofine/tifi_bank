import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import Button from "@mui/material/Button";

import logo from "../../assets/image/TiFi.png";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WalletConnectButton from "../../components/WalletConnectButton";
import useTranslation from "../../context/Localization/useTranslation";
import { useWeb3React } from "@web3-react/core";
import useAuth from "../../components/WalletConnectButton/utils/useAuth";

// const pages = ["home", "liquidity", "swap", "stake", "lend", "poolInfo"];
const pages = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Liquidity",
    url: "/liquidity",
  },
  {
    title: "Swap",
    url: "/swap",
  },
  {
    title: "Stake",
    url: "/stake",
  },
  {
    title: "Lend",
    url: "/lend",
  },
  {
    title: "Pool Info",
    url: "/pool",
  },
];
const settings = ["Home", "Account", "Dashboard", "Logout"];

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { account } = useWeb3React();
  console.log("tt==", account);
  const { logout } = useAuth();
  //   const [anchorElNav, setAnchorElNav] = React.useState(null);
  //   const [anchorElUser, setAnchorElUser] = React.useState(null);

  //   const handleOpenNavMenu = (event) => {
  //     setAnchorElNav(event.currentTarget);
  //   };
  //   const handleOpenUserMenu = (event) => {
  //     setAnchorElUser(event.currentTarget);
  //   };

  //   const handleCloseNavMenu = () => {
  //     setAnchorElNav(null);
  //   };

  //   const handleCloseUserMenu = () => {
  //     setAnchorElUser(null);
  //   };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} alt="logo" width="40px" height="30px" />
          <Typography
            variant="h5"
            sx={{
              color: "#00b5ff",
              fontWeight: 600,
              pl: 2,
              pr: 8,
            }}
          >
            TiFi Bank
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigate(`${page.url}`)}
                sx={{ my: 1, px: 4, display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {account ? (
              <Button
                variant="contained"
                sx={{ background: theme.custom.gradient.pink }}
                onClick={logout}
              >
                disconnect
              </Button>
            ) : (
              <WalletConnectButton />
            )}
            {/* <Button
              variant="contained"
              sx={{ background: theme.custom.gradient.pink }}
            >
              Connect Wallet
            </Button> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
