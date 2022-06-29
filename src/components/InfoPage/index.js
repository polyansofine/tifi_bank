import { alpha, Container, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import InfoLayout from "./InfoLayout";
import SearchIcon from "@mui/icons-material/Search";
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
    <InfoLayout title="helloworld">
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
    </InfoLayout>
  );
};

export default InfoPage;
