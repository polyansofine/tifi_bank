import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import Button from "@mui/material/Button";

import logo from "../../assets/image/TiFi.png";
import {
  List,
  ListItemButton,
  Menu,
  MenuItem,
  Popover,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WalletConnectButton from "../../components/WalletConnectButton";
import useTranslation from "../../context/Localization/useTranslation";
import { useWeb3React } from "@web3-react/core";
import useAuth from "../../components/WalletConnectButton/utils/useAuth";
import { useDispatch } from "react-redux";
import * as tokenActions from "../../store/actions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
    subtitle: [
      { title: "pool info", url: "/pool_info" },
      {
        title: "token info",
        url: "token_info",
      },
    ],
  },
];
const settings = ["Home", "Account", "Dashboard", "Logout"];

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { account, library } = useWeb3React();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (account && library) {
      dispatch(tokenActions.login(account, library));
    }
  }, [account, library]);
  console.log("tt==", account);
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    console.log("hello=");
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
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
            {pages.map((page) =>
              page.subtitle ? (
                <>
                  <Button
                    key={page}
                    onClick={() => navigate(`${page.url}`)}
                    sx={{ my: 1, px: 4 }}
                    endIcon={<KeyboardArrowDownIcon />}
                    onMouseOver={handlePopoverOpen}
                  >
                    {page.title}
                  </Button>
                  <Menu
                    PaperProps={{
                      sx: {
                        p: 1,
                        border: "1px solid #202231",
                        background: "rgba(20, 2, 65,0.4)",
                        backdropFilter: "blur(6px)",
                        color: "#c9c5c7",
                        borderRadius: 4,
                      },
                    }}
                    // onMouseEnter={handlePopoverOpen}
                    MenuListProps={{ onMouseLeave: handlePopoverClose }}
                    // onMouseEnter={handlePopoverOpen}
                    id="mouse-over-popover"
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    onClose={handlePopoverClose}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    // onClose={handlePopoverClose}
                    // disableRestoreFocus
                  >
                    {page.subtitle.map((item, index) => (
                      <MenuItem
                        onClick={() => {
                          handlePopoverClose();
                          navigate(`${item.url}`);
                        }}
                        sx={{
                          "&:hover": {
                            background: "rgba(3, 4, 20,0.6)",
                            borderRadius: 1,
                            color: "white",
                          },
                        }}
                        key={index}
                      >
                        {item.title}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Button
                  key={page}
                  onClick={() => navigate(`${page.url}`)}
                  sx={{ my: 1, px: 4, display: "block" }}
                >
                  {page.title}
                </Button>
              )
            )}
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
