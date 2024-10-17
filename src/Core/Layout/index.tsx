import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Content from "./Content";
import withGuards from "@Routes/withGuard.routes";
import { useThemeContext } from "@Context/ThemeContext";
import { useLocale } from "@Context/LanguageContext";

//const drawerWidth = 240;

const LayoutPage = () => {
  const { locale } = useLocale();
  const { mode } = useThemeContext();
  return (
    <>
      <div
        style={{
          display: "flex",
          direction: locale === "ar" ? "rtl" : "ltr",
        }}
      >
        <CssBaseline />
        <Content />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            paddingRight: `${16}px`,
            //paddingLeft: `${16}px`,
          }}
          style={{
            direction: "ltr",
            backgroundColor: mode === "light" ? "#eFeFee" : "",
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </div>
    </>
  );
};

export default withGuards(LayoutPage);
