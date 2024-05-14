import { Box, ThemeProvider, CssBaseline, Toolbar } from "@mui/material";
import theme from "@Styles/theme";
import { Outlet } from "react-router-dom";
import Content from "./Content";
import withGuards from "@Routes/withGuard.routes";
import { useTranslation } from "react-i18next";

//const drawerWidth = 240;

const LayoutPage = () => {
  const { i18n } = useTranslation()
  return (
    <ThemeProvider theme={theme}>
      <div style={{ display:"flex" , direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
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
          style={{ direction:"ltr" , overflowY:"hidden" , backgroundColor: '#f5f5f5' , width:"100vh" , height:'100vh' }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default withGuards(LayoutPage);
