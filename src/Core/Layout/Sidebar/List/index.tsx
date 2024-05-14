import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Inbox as InboxIcon, Mail as MailIcon } from "@mui/icons-material";
import theme from "@Styles/theme";
import { menuBottomItems, menuItems } from "../items/items";
import { Link, useLocation } from "react-router-dom";
import { hasPermission } from "@Utils/index";
import { useTranslation } from "react-i18next";
//import { menuItems , menuBottomItems } from "../items/items";

const ListItems = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <List
        style={{
          color: theme.palette.secondary.light,
          marginLeft: i18n.language === "en" ? theme.spacing(2) : "",
          marginRight: i18n.language === "ar" ? theme.spacing(2) : "",
          textAlign: i18n.language === "ar" ? "right" : "left",
          marginTop: "5px",
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
        {/* {["التصنيفات", "البائعين", "الحسومات", "الإعلانات"].map(
          (text, index) => (
            <ListItem key={text}>
              <ListItemButton>
                <ListItemIcon style={{ color: theme.palette.secondary.light }}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )} */}
      </List>

      {/* <Divider /> */}
      <List
        style={{
          color: theme.palette.secondary.light,
          marginLeft: i18n.language === "en" ? theme.spacing(2) : "",
          marginRight: i18n.language === "ar" ? theme.spacing(2) : "",
          textAlign: i18n.language === "ar" ? "right" : "left",
          marginTop: "230px",
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
      </List>
    </>
  );
};

export default ListItems;

{
  /* <List
  style={{
    color: theme.palette.secondary.light,
    marginRight: theme.spacing(2), // تغيير من marginLeft إلى marginRight
    textAlign: "right", // تغيير من center إلى right
    marginTop: '250px',
    justifyContent: "flex-start", // تغيير من center إلى flex-start للبدء من اليمين
    direction: 'rtl' // إضافة خاصية direction لتحديد الاتجاه من اليمين لليسار
  }}
>
  {menuBottomItems.map((item) => (
    <ListItem
      button
      key={item.text}
      component={Link}
      to={item.link}
      selected={location.pathname === item.link}
      style={{ direction: 'rtl' }} // تأكد من تطبيق الاتجاه على كل عنصر
    >
      <ListItemIcon style={{
        color: theme.palette.secondary.light,
        minWidth: 0,
        alignItems: "center",
        justifyContent: 'center',
        marginRight: theme.spacing(4) // تغيير من marginLeft إلى marginRight
      }}>
        <item.icon />
      </ListItemIcon>
      <ListItemText primary={t(item.text)} style={{ textAlign: 'right' }} />
    </ListItem>
  ))}
</List> */
}
