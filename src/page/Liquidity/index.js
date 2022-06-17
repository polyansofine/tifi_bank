import { Paper, styled } from "@mui/material";
import React from "react";

const StyledPaper = styled(Paper)(({ theme, main }) => ({
  width: main ? 500 : "100%",
  padding: "10px 18px",
  border: main ? "#055080 1px solid" : "#343a40 1px solid",
  borderRadius: 10,
  backgroundColor: main ? "#0F0954" : "#130224",
  color: "white",
  "&:hover": {
    border: !main && "#130224 1px solid",
  },
}));

const Liquidity = () => {
  return <div>Liquidity</div>;
};

export default Liquidity;
