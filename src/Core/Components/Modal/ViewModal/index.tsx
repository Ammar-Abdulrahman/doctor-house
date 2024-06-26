import React from "react";
import { Modal, Box, Button, AppBar, Grid } from "@mui/material";
import theme from "@Styles/theme";
import ForwardIcon from "@mui/icons-material/Forward";
import { useTranslation } from "react-i18next";

interface ViewRoleModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const modalContent = {
  position: "absolute",
  top: "50%",
  height: "100%",
  left: "85%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
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
  return (
    <Modal
      style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
      open={open}
      onClose={onClose}
    >
      <Grid
        style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
        sx={modalContent}
      >
        <Box display="flex" justifyContent="flex-end"></Box>
        <AppBar
          style={{
            height: 58,
            backgroundColor: theme.palette.primary.main,
            padding: 2,
            borderTopLeftRadius:8
          }}
          id="show-modal-title"
        >
          <Button
            onClick={onClose}
            style={{
              marginTop: 8,
              position: "absolute",
              marginRight: i18n.language === "ar" ? 425 : "",
              marginLeft: i18n.language === "en" ? 425 : "",
              color: "white",
              direction: i18n.language === "ar" ? "rtl" : "ltr",
            }}
            aria-label="close"
          >
            <ForwardIcon />
          </Button>
          <span
            style={{
              marginRight: i18n.language === "ar" ? 30 : "",
              marginLeft: i18n.language === "en" ? 30 : "",
              color: "white",
              marginTop: 12,
              fontSize: 18,
            }}
          >
            {title}
          </span>
        </AppBar>
        <Box>{children}</Box>
      </Grid>
    </Modal>
  );
};

export default ViewModal;
