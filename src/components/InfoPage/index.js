import {
  alpha,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import InfoLayout from "./InfoLayout";
import SearchIcon from "@mui/icons-material/Search";
import InfoTable from "./InfoTable";
const useStyles = makeStyles((theme) => ({
  input: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 8,
      position: "relative",
      backgroundColor: "#202231",
      border: "1px solid #445760",
      color: "white",
      fontSize: 16,
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      // Use the system font instead of the default Roboto font.

      "&:focus": {
        boxShadow: `${alpha("#ffffff", 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));
const InfoPage = () => {
  const classes = useStyles();
  return (
    <InfoLayout
      title={
        <Grid container direction="column">
          <Typography variant="h4">Pool Analytics.</Typography>
          <Typography>
            Click on the column name to sort pairs by its TVL, volume, fees or
            APY.
          </Typography>
        </Grid>
      }
    >
      <TextField
        fullWidth
        className={classes.input}
        size="small"
        placeholder="Search by token or pool"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="secondary" size="small" />
            </InputAdornment>
          ),
          //   className: classes.input,
        }}
      />
      <InfoTable />
    </InfoLayout>
  );
};

export default InfoPage;
