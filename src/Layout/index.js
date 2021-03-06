import { Container, Grid } from "@mui/material";
import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container sx={{ mt: 16 }}>
        <Grid container justifyContent="center">
          <Grid item>{children}</Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Layout;
