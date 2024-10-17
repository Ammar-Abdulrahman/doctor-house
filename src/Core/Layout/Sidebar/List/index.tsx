import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
//import theme from "@Styles/theme";
import { menuItems } from "../items/items";
import { Link, useLocation } from "react-router-dom";
import { hasPermission } from "@Utils/index";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useLocale } from "@Context/LanguageContext";

const ListItems = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const theme = useTheme();
  const { locale } = useLocale();

  return (
    <List
      style={{
        color: theme.palette.secondary.light,
        textAlign: locale === "ar" ? "right" : "left",
        marginTop: "18px",
        justifyContent: "flex-start",
        direction: locale === "ar" ? "rtl" : "ltr",
        overflow: "hidden",
      }}
    >
      {menuItems
        .filter((item) => hasPermission(item.permission))
        .map((item) => (
          <motion.div
            key={item.text}
            whileHover={{
              scaleY: 1.2,
              scaleX: 1.1,
              color: "#f8e112",
            }}
            transition={{ stiffness: 300, stype: "spring" }}
          >
            <ListItem
              button
              component={Link}
              to={item.link}
              selected={location.pathname === item.link}
              style={{
                direction: locale === "ar" ? "rtl" : "ltr",
                backgroundColor:
                  location.pathname === item.link
                    ? theme.palette.action.selected
                    : "inherit",
                color:
                  location.pathname === item.link
                    ? theme.palette.getContrastText(
                        theme.palette.action.selected
                      )
                    : "inherit",
              }}
            >
              <ListItemIcon
                style={{
                  color: theme.palette.secondary.light,
                  minWidth: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: locale === "ar" ? theme.spacing(3) : "",
                  marginLeft: locale === "en" ? theme.spacing(3) : "",
                }}
              >
                <item.icon />
              </ListItemIcon>
              <ListItemText
                primary={t(item.text)}
                style={{
                  textAlign: locale === "ar" ? "right" : "left",
                  marginRight: locale === "ar" ? theme.spacing(4) : "",
                  marginLeft: locale === "en" ? theme.spacing(4) : "",
                }}
              />
            </ListItem>
          </motion.div>
        ))}
    </List>
  );
};

export default ListItems;
