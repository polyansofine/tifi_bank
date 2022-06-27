import React from "react";
import { useWalletModal } from "@pancakeswap/uikit";
// import useAuth from "hooks/useAuth";
// import { useTranslation } from "contexts/Localization";
// import styled from "styled-components";
import useAuth from "./utils/useAuth";
import { Button } from "@mui/material";
import useTranslation from "./../../context/Localization/useTranslation";

// const Button = styled.button`
//   background-color: #000f26;
//   border-radius: 7px;
//   padding: 8px 30px;
//   border: none;
//   color: white;
//   font-size: 16px;
//   font-weight: 600;
//   cursor: pointer;
//   float: right;
//   margin-right: 20px;
//   margin-top: 17px;
// `;

const WalletConnectButton = (props) => {
  const { t } = useTranslation();
  const { login, logout } = useAuth();
  //   console.log("login==", login);
  const { onPresentConnectModal } = useWalletModal(
    login,
    logout,

    t
  );

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      Connect Wallet
    </Button>
  );
};

export default WalletConnectButton;
