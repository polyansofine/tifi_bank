import React from "react";
import { Route, Routes } from "react-router-dom";
import Liquidity from ".";
import FindLiquidity from "./FindLiquidity";
import LiquidityPage from "./LiquidityPage";

const LiquidityRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LiquidityPage />} />
      <Route path="/add" element={<Liquidity />} />
      <Route path="/find" element={<FindLiquidity />} />
    </Routes>
  );
};

export default LiquidityRouter;
