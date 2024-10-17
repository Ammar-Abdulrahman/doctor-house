import { useState } from "react";
import { useLocale } from "@Context/LanguageContext";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
//import "@Localization/index";
import { useTranslation } from "react-i18next";
import IconProject from "../../../../../public/doctorHouse.svg";
import LogoutModal from "@Components/Modal/LogoutModal";
import SwitchComponent from "@Components/Switch";

const AppBarHeader = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { locale } = useLocale();

  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 5,
        backgroundColor: theme.palette.secondary.light,
        direction: locale === "ar" ? "ltr" : "rtl",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Tooltip title={t("homePage.logout")}>
          <IconButton
            size="large"
            aria-label="logout"
            aria-haspopup="true"
            onClick={openLogoutModal}
            style={{
              color: theme.palette.primary.dark,
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
        <SwitchComponent />
        <Box sx={{ flexGrow: 1 }} />
        <Typography
          sx={{ color: theme.palette.primary.main }}
          variant="h6"
          noWrap
          component="div"
        >
          {t("homePage.doctor_house")}
        </Typography>
        <img
          style={{ width: "28px", height: "28px", margin: theme.spacing(2) }}
          srcSet={IconProject}
        />
      </Toolbar>
      <LogoutModal open={logoutModalOpen} onClose={closeLogoutModal} />
    </AppBar>
  );
};

export default AppBarHeader;
