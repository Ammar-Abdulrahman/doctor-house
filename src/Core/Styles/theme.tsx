import { createTheme } from "@mui/material/styles";
import { teal, green, yellow, red, blue } from "@mui/material/colors";

const colorPrimary = {
  1000: "#002C2A",
  900: "#004945",
  800: "#006D68",
  700: "#00918B",
  600: "#00B6AD",
  500: "#00DAD0",
  400: "#2AE0D8",
  300: "#55E6E0",
  200: "#80ECE7",
  100: "#AAF3EF",
  50: "#B3B3B3",
  5:"#FFFFFF"
};
const theme = createTheme({
  palette: {
    primary: {
      main: colorPrimary[500],
      light: colorPrimary[200],
      dark: colorPrimary[600],
      contrastText: colorPrimary[600],
    },
    secondary: {
      main: teal["A400"],
      light: colorPrimary[5],
      dark: teal["A700"],
      contrastText: teal["A200"],
    },
    info: {
      main: blue[500],
      light: blue[200],
      dark: blue[700],
      contrastText: blue[900],
    },
    error: {
      main: red[500],
      light: red[200],
      dark: red[700],
      contrastText: red[900],
    },
    success: {
      main: green[500],
      light: green[200],
      dark: green[700],
      contrastText: green[900],
    },
    warning: {
      main: yellow[500],
      light: yellow[200],
      dark: yellow[700],
      contrastText: yellow[900],
    },
  },
  typography: {
    fontFamily: "Noto Kufi Arabic",
  },
  spacing: [0, 4, 8, 16, 32, 64],
});

export default theme;
