import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";

type ActionModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ActionModal: React.FC<ActionModalProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Action</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionModal;
