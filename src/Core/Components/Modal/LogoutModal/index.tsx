import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ open, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleConfirmLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("privileges");
      setIsLoading(false);
      onClose();
      navigate("/login");
    }, 2000);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
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
              marginRight: i18n.language === "ar" ? "170px" : "-17px",
              marginLeft: i18n.language === "ar" ? "-17px" : "170px",
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
                onClick={handleConfirmLogout}
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
