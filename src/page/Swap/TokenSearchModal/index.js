/* eslint-disable eqeqeq */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { TOKENS } from "../../../config/token";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import * as tokenActions from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const TokenSearchModal = ({
  open,
  handleClose,
  token_index,
  type,
  // selectedToken,
}) => {
  const dispatch = useDispatch();
  const { token0, token1 } = useSelector(
    ({ tokenReducers }) => tokenReducers.token
  );
  const [selectedToken, setSelectedToken] = useState();
  useEffect(() => {
    if (token_index === 0) {
      setSelectedToken(token1.title);
    } else {
      setSelectedToken(token0.title);
    }
  }, [token_index]);
  const SearchText = styled(TextField)(({ theme }) => ({
    background: "white",
    border: "none",
    borderRadius: 6,
    color: "black",
  }));
  const filterFunc = (tokens, selectedToken) => {
    if (selectedToken === "TiFi") {
      return [tokens[0], tokens[1]];
    }
    if (selectedToken === "BUSD") {
      return [tokens[2]];
    }
    if (selectedToken === "BNB") {
      return [tokens[2]];
    }
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          minWidth: "450px",
          borderRadius: 8,
          border: "#1E1E1E 1px solid",
          background: "#130224",
          color: "white",
        },
      }}
      sx={{
        // position: "relative",
        p: 6,
      }}
      onClose={handleClose}
    >
      <IconButton
        onClick={handleClose}
        sx={{ position: "absolute", top: 4, right: 4, color: "white" }}
      >
        <ClearOutlinedIcon />
      </IconButton>
      <DialogTitle>
        <Typography sx={{ mb: 4 }}>Pay with</Typography>
        <SearchText
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      </DialogTitle>
      <DialogContent
        sx={{
          height: "400px",
          background: "#03045e",
          border: "#1E1E1E 1px solid",
          m: 2,
          p: 0,
          borderRadius: 2,
        }}
      >
        <List>
          {/* {type === "swap"
            ? selectedToken &&
              filterFunc(TOKENS, selectedToken).map((item, index) => (
                <ListItem
                  key={index}
                  // disabled={_LP}
                  sx={{
                    "&: hover": {
                      background: "#3730A3",
                      borderRadius: 2,
                    },
                  }}
                  onClick={() => {
                    if (item.title === selectedToken) {
                      return 0;
                    } else {
                      handleClose();
                      if (token_index == 1) {
                        dispatch(tokenActions.selectToken(null, item));
                        dispatch(tokenActions.setTokens({}, item));
                      } else {
                        dispatch(tokenActions.selectToken(item, null));
                        dispatch(tokenActions.setTokens(item, {}));
                      }
                    }
                  }}
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <img
                        width="35px"
                        height="35px"
                        src={`/images/tokens/${item.address}.png`}
                        alt={item.title}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="caption">
                        {item.description}
                      </Typography>
                      <Typography>{item.title}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              )) */}
          {TOKENS.map((item, index) => (
            <ListItem
              key={index}
              disabled={token_index === 1 && item.title === selectedToken}
              sx={{
                "&: hover": {
                  background: "#3730A3",
                  borderRadius: 2,
                },
              }}
              onClick={() => {
                handleClose();
                if (token_index == 1) {
                  dispatch(tokenActions.selectToken(null, item));
                  dispatch(tokenActions.setTokens({}, item));
                } else {
                  if (item.title === token1.title) {
                    if (item.title === "BNB") {
                      dispatch(tokenActions.selectToken(item, TOKENS[1]));
                      dispatch(tokenActions.setTokens(item, TOKENS[1]));
                    } else {
                      dispatch(tokenActions.selectToken(item, TOKENS[0]));
                      dispatch(tokenActions.setTokens(item, TOKENS[0]));
                    }
                  } else {
                    dispatch(tokenActions.selectToken(item, null));
                    dispatch(tokenActions.setTokens(item, {}));
                  }
                }
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <img
                    width="35px"
                    height="35px"
                    src={`/images/tokens/${item.address}.png`}
                    alt={item.title}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="caption">{item.description}</Typography>
                  <Typography>{item.title}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
        <Typography sx={{ color: "white" }}></Typography>
      </DialogContent>
    </Dialog>
  );
};

export default TokenSearchModal;
