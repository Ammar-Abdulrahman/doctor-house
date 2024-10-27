import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocale } from "@Context/LanguageContext";
import useAuthentication from "@Hooks/useAuthentication";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { HandleLogout, isLoading } = useAuthentication();

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          style={{ marginTop: "-10px" }}
          fontWeight={"bold"}
          mb={3}
        >
          {t("modal.logout_title")}
        </Typography>
        <>
          <Typography>{t("modal.logout_message")}</Typography>
          <Grid
            item
            style={{
              marginTop: "25px",
              marginBottom: "-17px",
              marginRight: locale === "ar" ? "170px" : "-17px",
              marginLeft: locale === "ar" ? "-17px" : "170px",
            }}
          >
            <Button
              onClick={onClose}
              color="primary"
              variant="contained"
              style={{ color: "white", margin: "3px" }}
            >
              {t("modal.cancel")}
            </Button>
            {isLoading ? (
              <CircularProgress
                style={{
                  marginRight: "15px",
                  marginTop: "-15px",
                  marginBottom: "-6px",
                }}
                color="error"
                size={24}
              />
            ) : (
              <Button
                onClick={HandleLogout}
                color="error"
                autoFocus
                variant="contained"
                style={{ color: "white", margin: "3px" }}
              >
                {t("modal.confirm")}
              </Button>
            )}
          </Grid>
        </>
      </Box>
    </Modal>
  );
};

export default LogoutModal;
