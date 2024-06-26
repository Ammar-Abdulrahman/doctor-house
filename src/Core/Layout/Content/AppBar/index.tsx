import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import theme from "@Styles/theme";
import "@Localization/index";
import { useTranslation } from "react-i18next";
import IconProject from "../../../../../public/doctorHouse.svg";
import LogoutModal from "@Components/Modal/LogoutModal";

const AppBarHeader = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false); // State to manage logout modal visibility

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const switchLanguage = (language: any) => {
    i18n.changeLanguage(language);
    sessionStorage.setItem("language", language);
    setAnchorEl(null);
  };

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
        direction: i18n.language === "ar" ? "ltr" : "rtl",
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
              // marginLeft: "0px",
              // marginRight: "0px",
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          style={{
            color: theme.palette.primary.dark,
            // marginLeft: "0px",
            // marginRight: "0px",
          }}
        >
          <LanguageIcon />
        </IconButton>
        <Menu
          style={{ marginLeft: "1px", marginTop: "30px" }}
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: i18n.language === "ar" ? "right" : "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: i18n.language === "ar" ? "right" : "left",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => switchLanguage("ar")}>العربية</MenuItem>
          <MenuItem onClick={() => switchLanguage("en")}>English</MenuItem>
        </Menu>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h6" noWrap component="div">
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
