import React from "react";
import {
  Modal,
  Box,
  Button,
  AppBar,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
//import theme from "@Styles/theme";
import ForwardIcon from "@mui/icons-material/Forward";
import { useTranslation } from "react-i18next";
import { useLocale } from "@Context/LanguageContext";

interface ViewRoleModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const modalContent = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  //position: "absolute",
  //top: "50%",
  height: "100vh",
  //left: "85%",
  //transform: "translate(-50%, -50%)",
  width: "33%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 5,
};
// const roleTitle = {
//   marginTop: theme.spacing(4),
// };

// const rolePrivileges = {
//   listStyleType: "none",
//   padding: 0,
//   "& li": {
//     marginBottom: theme.spacing(1),
//   },
// };

const ViewModal: React.FC<ViewRoleModalProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const {locale} = useLocale()
  return (
    <Modal style={{ direction: "rtl" }} open={open} onClose={onClose}>
      <Grid
        container
        style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
        sx={modalContent}
      >
        <Grid item justifyContent="end" alignItems={"end"}>
          <AppBar
            style={{
              height: 58,
              width: "33%",
              backgroundColor: theme.palette.primary.main,
              padding: 2,
              borderTopLeftRadius: 8,
            }}
            id="show-modal-title"
          >
            <IconButton
              onClick={onClose}
              style={{
                marginTop: 8,
                position: "absolute",
                marginRight: locale === "ar" ? 395 : "",
                marginLeft: locale === "en" ? 395 : "",
                color: "white",
                direction: locale === "ar" ? "rtl" : "ltr",
              }}
              aria-label="close"
            >
              <ForwardIcon />
            </IconButton>
            <span
              style={{
                marginRight: locale === "ar" ? 30 : "",
                marginLeft: locale === "en" ? 30 : "",
                color: "white",
                marginTop: 12,
                fontSize: 18,
              }}
            >
              {title}
            </span>
          </AppBar>
        </Grid>

        <Grid item width={"90%"}>
          {children}
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ViewModal;
