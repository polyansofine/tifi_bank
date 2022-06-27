import { useCallback } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { NoBscProviderError } from "@binance-chain/bsc-connector";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";
import { ConnectorNames, connectorLocalStorageKey } from "@pancakeswap/uikit";
import { connectorsByName } from "./web3React";
// import { setupNetwork } from "utils/wallet";
// import useToast from "hooks/useToast";
// import { profileClear } from "state/profile";
// import { useAppDispatch } from "state";
// import { useTranslation } from "contexts/Localization";
import { setupNetwork } from "./wallet";
import useActiveWeb3React from "./useActiveWeb3React";

const useAuth = () => {
  // const { t } = useTranslation();
  // const dispatch = useAppDispatch();
  const { activate, deactivate } = useActiveWeb3React();
  // const { toastError } = useToast();

  const login = useCallback(
    (connectorID) => {
      const connector = connectorsByName[connectorID];
      if (connector) {
        activate(connector, async (error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork();
            if (hasSetup) {
              activate(connector);
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey);
            if (
              error instanceof NoEthereumProviderError ||
              error instanceof NoBscProviderError
            ) {
              // toastError(t("Provider Error"), t("No provider was found"));
              console.log("Provider Error");
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector;
                walletConnector.walletConnectProvider = null;
              }
              // toastError(
              //   t("Authorization Error"),
              //   t("Please authorize to access your account")
              // );
              console.log("Authorization Error");
            } else {
              // toastError(error.name, error.message);
              console.log("error=", error.name, error.message);
            }
          }
        });
      } else {
        // toastError(
        //   t("Unable to find connector"),
        //   t("The connector config is wrong")
        // );
        console.log("Unable to find connector");
      }
    },
    [activate]
  );

  const logout = useCallback(() => {
    // dispatch(profileClear());
    deactivate();
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem("walletconnect")) {
      connectorsByName.walletconnect.close();
      connectorsByName.walletconnect.walletConnectProvider = null;
    }
  }, [deactivate]);

  return { login, logout };
};

export default useAuth;
