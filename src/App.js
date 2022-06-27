import "./App.css";

// import Swap from "./page/Swap";
import { Provider } from "react-redux";
import store from "./store/store";

import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./components/WalletConnectButton/utils/web3React";
import { ModalProvider, dark } from "@pancakeswap/uikit";
import { ThemeProvider } from "styled-components";
import { LanguageProvider } from "./context/Localization/Provider";
import Routers from "./routers";

const ThemeProviderWrapper = (props) => {
  return <ThemeProvider theme={dark} {...props} />;
};
function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ThemeProviderWrapper>
          <LanguageProvider>
            <ModalProvider>
              <Routers />
            </ModalProvider>
          </LanguageProvider>
        </ThemeProviderWrapper>
        {/* <ThemeProvider theme={theme}> */}
        {/* </ThemeProvider> */}
      </Provider>
    </Web3ReactProvider>
  );
}

export default App;
