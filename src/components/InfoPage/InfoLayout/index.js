import { Container, CssBaseline } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {},
  titleBody: {
    background:
      "linear-gradient(rgba(22, 8, 45,0.6), rgba(22, 8, 45,0.6)), url(/images/main/binary-pattern.png) repeat center",
    marginTop: "-60px",
    width: "100vw",
    height: "120px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "30px",
    // display: "flex",
  },
}));
const InfoLayout = ({ title, children }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.titleBody}>
        <Container>{title}</Container>
      </div>
      <CssBaseline />
      <Container>{children}</Container>
    </>
  );
};

export default InfoLayout;
