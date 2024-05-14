import { Toolbar, Drawer } from "@mui/material";
import theme from "@Styles/theme";
import Sidebar from "../../Sidebar";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const DrawerHeader = () => {
  const { i18n } = useTranslation();
  return (
    <Drawer
      variant="permanent"
      anchor={i18n.language === 'ar' ? 'right' : 'left'}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <div
        style={{
          backgroundColor: theme.palette.primary.contrastText,
          height: "100%",
        }}
      >
        <Sidebar />
      </div>
    </Drawer>
  );
};

export default DrawerHeader;
