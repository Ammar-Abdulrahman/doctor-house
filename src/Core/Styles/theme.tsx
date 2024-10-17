import { createTheme } from "@mui/material/styles";
import { teal, yellow, red, blue } from "@mui/material/colors";

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
  5: "#FFFFFF",
};
const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#efefee", // Apply light mode background color
    },
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
      contrastText: colorPrimary[800],
    },
    info: {
      main: blue[500],
      light: "#F3FEF6",
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
      main: teal[300],
      light: teal[700],
      dark: red["300"],
      contrastText: teal["A400"],
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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colorPrimary[500],
      light: colorPrimary[200],
      dark: colorPrimary[600],
      contrastText: colorPrimary[800],
    },
    secondary: {
      main: teal["A400"],
      light: "dark",
      dark: teal["A700"],
      contrastText: colorPrimary[500],
    },
    info: {
      main: blue[500],
      light: "#424242",
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
      main: teal[200],
      light: teal[500],
      dark: teal["A400"],
      contrastText: teal["A100"],
    },
    warning: {
      main: yellow[700], // Darker yellow for dark mode
      light: yellow[500],
      dark: yellow[900],
      contrastText: yellow[100],
    },
  },
  typography: {
    fontFamily: "Noto Kufi Arabic",
  },
  spacing: [0, 4, 8, 16, 32, 64],
});

export { lightTheme, darkTheme };
