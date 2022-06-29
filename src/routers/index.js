import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FuseMessage from "../components/FuseMessage/FuseMessage";
import InfoPage from "../components/InfoPage";
import Layout from "../Layout";
import Home from "../page/Home";
import LiquidityRouter from "../page/Liquidity/LiquidityRouter";
import SwapPage from "../page/Swap/SwapPage";
import { theme } from "./../styles/theme";

const Routers = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/swap" element={<SwapPage />} />
            <Route path="/liquidity/*" element={<LiquidityRouter />} />
            <Route path="/pool_info" element={<InfoPage />} />

            {/* <Route path="/" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Home />} /> */}
          </Routes>
          <FuseMessage />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Routers;
