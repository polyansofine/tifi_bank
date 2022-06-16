import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Layout from "./Layout";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import Swap from "./page/Swap";
import { Provider } from "react-redux";
import store from "./store/store";
import FuseMessage from "./components/FuseMessage/FuseMessage";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/swap" element={<Swap />} />
              {/* <Route path="/" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Home />} /> */}
            </Routes>
            <FuseMessage />
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
