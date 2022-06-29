import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#140241",
    },
    secondary: {
      main: "#fff",
      light: "#140241",
      dark: "#0077b6",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
       body {
         -webkit-font-smoothing: auto;
         background: rgb(22,8,45);
             background: linear-gradient(124deg, rgba(22,8,45,1) 26%);
             backgroundRepeat: no-repeat;
           backgroundAttachment: fixed;
           color:#dfd8dc;
          }
          input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;}
          input[type=number] {
  -moz-appearance: textfield;
  
}
        }
       
     `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          //   transition: theme.transitions.create(["transform"], {
          //     duration: theme.transitions.duration.standard,
          //   }),
          borderRadius: "8px",
          fontWeight: 700,
          textTransform: "capitalize",
          color: "#c9c5c7",
          "&:hover": {
            transform: "scale(1.02)",
            transition: "ease-in-out 0.1s",
            color: "white",
          },
          "&$selected": {
            color: "white",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "DM Sans, sans-serif",
    caption: {
      fontSize: "10px",
      color: "#adb5bd",
    },
    body: {
      fontSize: "12px",
      color: "#ffffff",
    },
  },
  custom: {
    palette: {},
    gradient: {
      pink: `linear-gradient(90deg, rgba(198,20,203,1) 32%, rgba(143,13,94,1) 88%)`,
      grey: `linear-gradient(90deg, #969797 0%, #1E2848 100%)`,
      green: `linear-gradient(90deg, #32CE27 0%, #2A4428 100%)`,
      blue: `linear-gradient(90deg, #1FC7D3 0%, #0A4428 100%)`,
    },
  },
});
