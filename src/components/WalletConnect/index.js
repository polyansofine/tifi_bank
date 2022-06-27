import { Button, useTheme } from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { networkParams, providerOptions } from "./providerOption";
import { toHex } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/actions";

const web3Modal = new Web3Modal({
  //   network: "binance",
  cacheProvider: true, // optional
  providerOptions, // required
});
const WalletConnect = ({ type }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();
  const { address } = useSelector(({ authReducers }) => authReducers.auth.auth);
  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const network = await library.getNetwork();
      console.log(
        "🚀 -> file: index.js -> line 29 -> connectWal -> network",
        network
      );
      setLibrary(library);
      if (network.chainId != 97) {
        console.log("chain==", network.chainId);
        await switchNetwork(97, library);
      }
      const accounts = await library.listAccounts();
      console.log(
        "🚀 -> file: index.js -> line 39 -> connectWal -> accounts",
        accounts
      );
      setProvider(provider);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);

      dispatch(authActions.login(accounts[0], library));

      //   console.log(
      //     "🚀 -> file: index.js -> line 37 -> connectWal -> accounts",
      //     accounts
      //   );
    } catch (error) {
      setError(error);
    }
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async (network, library) => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]],
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account],
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature],
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    dispatch(authActions.logout());
    refreshState();
  };

  // useEffect(() => {
  //   if (web3Modal.cachedProvider) {
  //     connectWallet();
  //   }
  // }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);
  return (
    <div>
      {!address ? (
        type ? (
          <Button
            variant="contained"
            fullWidth
            sx={{
              background: theme.custom.gradient.pink,
              height: "50px",
              my: 2,
            }}
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ background: theme.custom.gradient.pink }}
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
        )
      ) : (
        <Button onClick={disconnect}>Disconnect</Button>
      )}
    </div>
  );
};

export default WalletConnect;
