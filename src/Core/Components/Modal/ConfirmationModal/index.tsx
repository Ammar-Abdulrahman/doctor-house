import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemId: number;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  itemId,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <Dialog
      style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        {t("modal.confirm_title")} {title}
      </DialogTitle>
      <DialogContent>
        <Typography>
          {t("modal.confirm_message")}#
          <span style={{ color: theme.palette.primary.main }}>{itemId}</span>
          {i18n.language === "ar" ? "؟" : "?"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("modal.cancel")}</Button>
        <Button
          onClick={onConfirm}
          style={{ color: theme.palette.error.main }}
          autoFocus
        >
          {t("modal.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
