import { Toolbar, Drawer, useTheme } from "@mui/material";
import Sidebar from "../../Sidebar";
import { useLocale } from "@Context/LanguageContext";

const drawerWidth = 240;

const DrawerHeader = () => {
  const theme = useTheme();
  const { locale } = useLocale();
  return (
    <Drawer
      variant="permanent"
      anchor={locale === "ar" ? "right" : "left"}
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
