import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {},
  titleBody: {
    background:
      "linear-gradient(rgba(22, 8, 45,0.6), rgba(22, 8, 45,0.8)), url(/images/main/binary-pattern.png) repeat fixed center",
    marginTop: "-32px",
    width: "100vw",
    height: "140px",
    padding: "40px",
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
      <Container>{children}</Container>
    </>
  );
};

export default InfoLayout;
