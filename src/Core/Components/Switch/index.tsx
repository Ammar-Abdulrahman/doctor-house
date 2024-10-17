import { useState } from "react";
import { useLocale } from "@Context/LanguageContext";
import { useThemeContext } from "@Context/ThemeContext";
import { IconButton, Menu, MenuItem, Tooltip, useTheme } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTranslation } from "react-i18next";

const SwitchComponent = () => {
  const { locale, switchLanguage } = useLocale();
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation();

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSwitchArabicLanguage = (language: any) => {
    switchLanguage(language);
    setAnchorEl(null);
  };

  const handleSwitchEnglishLanguage = (language: any) => {
    switchLanguage(language);
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title={t("actions.language")}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          style={{
            color: theme.palette.primary.dark,
          }}
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={mode === "dark" ? t("actions.light") : t("actions.dark")}>
        <IconButton
          sx={{ color: theme.palette.primary.dark }}
          onClick={toggleTheme}
          color="inherit"
        >
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>

      <Menu
        style={{ marginLeft: "1px", marginTop: "30px" }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: locale === "ar" ? "right" : "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: locale === "ar" ? "right" : "left",
        }}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <MenuItem onClick={() => handleSwitchArabicLanguage("ar")}>
          العربية
        </MenuItem>
        <MenuItem onClick={() => handleSwitchEnglishLanguage("en")}>
          English
        </MenuItem>
      </Menu>
    </>
  );
};

export default SwitchComponent;
