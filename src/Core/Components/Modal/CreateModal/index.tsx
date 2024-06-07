import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: any;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  children,
  onSubmit,
}) => {
  const { t , i18n } = useTranslation();
  return (
    <Dialog
      style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("modal.cancel")}</Button>
        {/* <Button onClick={onSubmit} color="primary">
          Submit
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
