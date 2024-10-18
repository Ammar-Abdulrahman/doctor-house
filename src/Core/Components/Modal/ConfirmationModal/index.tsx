import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocale } from "@Context/LanguageContext";

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
  const { t } = useTranslation();
  const theme = useTheme();
  const { locale } = useLocale();
  return (
    <Dialog
      style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
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
          {locale === "ar" ? "؟" : "?"}
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
