import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import theme from "@Styles/theme";
import { menuItems } from "../items/items";
import { Link , useLocation } from "react-router-dom";
import { hasPermission } from "@Utils/index";
import { useTranslation } from "react-i18next";

const ListItems = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  return (
    <>
      <List
        style={{
          color: theme.palette.secondary.light,
          // marginLeft: i18n.language === "en" ? theme.spacing(2) : "",
          // marginRight: i18n.language === "ar" ? theme.spacing(2) : "",
          textAlign: i18n.language === "ar" ? "right" : "left",
          marginTop: "18px",
          justifyContent: "flex-start",
          direction: i18n.language === "ar" ? "rtl" : "ltr",
        }}
      >
        {menuItems
          .filter((item) => hasPermission(item.permission))
          .map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.link}
              selected={location.pathname === item.link}
              style={{
                direction: i18n.language === "ar" ? "rtl" : "ltr",
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
                  marginRight: i18n.language === "ar" ? theme.spacing(3) : "",
                  marginLeft: i18n.language === "en" ? theme.spacing(3) : "",
                }}
              >
                <item.icon />
              </ListItemIcon>
              <ListItemText
                primary={t(item.text)}
                style={{
                  textAlign: i18n.language === "ar" ? "right" : "left",
                  marginRight: i18n.language === "ar" ? theme.spacing(4) : "",
                  marginLeft: i18n.language === "en" ? theme.spacing(4) : "",
                }}
              />
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default ListItems;

{
  /* <Divider /> */
}
{
  /* <List
        style={{
          color: theme.palette.secondary.light,
          marginLeft: i18n.language === "en" ? theme.spacing(2) : "",
          marginRight: i18n.language === "ar" ? theme.spacing(2) : "",
          textAlign: i18n.language === "ar" ? "right" : "left",
          marginTop: "150px",
          justifyContent: "flex-start",
          direction: i18n.language === "ar" ? "rtl" : "ltr",
        }}
      >
        {menuBottomItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.link}
            selected={location.pathname === item.link}
            style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }} // تأكد من تطبيق الاتجاه على كل عنصر
          >
            <ListItemIcon
              style={{
                color: theme.palette.secondary.light,
                minWidth: 0,
                alignItems: "center",
                justifyContent: "center",
                marginRight: i18n.language === "ar" ? theme.spacing(3) : "",
                marginLeft: i18n.language === "en" ? theme.spacing(3) : "",
              }}
            >
              <item.icon />
            </ListItemIcon>
            <ListItemText
              primary={t(item.text)}
              style={{
                textAlign: i18n.language === "ar" ? "right" : "left",
                marginRight: i18n.language === "ar" ? theme.spacing(4) : "" ,
                marginLeft: i18n.language === "en" ? theme.spacing(4) : "" ,
              }}
            />
          </ListItem>
        ))}
      </List> */
}
