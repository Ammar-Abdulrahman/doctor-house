import { useTranslation } from "react-i18next";
import theme from "./theme";
const { i18n } = useTranslation();

export const textFieldStyle = {
    border: `1px solid #CACDCC`,
    borderRadius: 4,
    marginTop:"30px",
    height:"80px",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    position: 'relative',
  };

  export const labelStyle = {
    fontWeight: 'bold',
    position: 'absolute',
    top: -12,
    left: i18n.language === "ar" ? 'auto' : 16,
    right: i18n.language === "ar" ? 16 : 'auto',
    backgroundColor: '#fff',
    padding: '0 4px',
  };

  export const valueStyle = {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginRight: "50px",
  };