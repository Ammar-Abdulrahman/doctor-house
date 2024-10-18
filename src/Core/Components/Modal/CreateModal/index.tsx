import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { useLocale } from "@Context/LanguageContext";

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
  const { locale } = useLocale();
  const cacheRtl = createCache({
    key: "muiltr",
    stylisPlugins: locale === "ar" ? [prefixer, rtlPlugin] : [],
  });
  return (
    <Dialog
      style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <CacheProvider value={cacheRtl}>
        <DialogContent>{children}</DialogContent>
      </CacheProvider>
      <DialogActions>
        {/* <Button onClick={onClose}>{t("modal.cancel")}</Button> */}
        {/* <Button onClick={onSubmit} color="primary">
          Submit
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
