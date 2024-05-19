import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { t } from "i18next";
import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";

// Define the props type for clarity and type-checking
interface ActionsMenuProps {
  rowData: {
    id: number; // Ensure the type matches the expected row data structure
  };
  onEdit: (id: number) => void;
  onView: (id: number) => void;
  onDelete: (id: number) => void;
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({
  rowData,
  onEdit,
  onView,
  onDelete,
}) => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="action-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
        id="action-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          onClick={() => {
            onView(rowData.id);
            handleClose();
          }}
        >
          <VisibilityIcon
            style={{
              color:theme.palette.primary.main,
              margin: theme.spacing(1),
              marginLeft: i18n.language === "ar" ? theme.spacing(2) : "",
              marginRight: i18n.language === "ar" ? "" : theme.spacing(2),
            }}
          />{" "}
          <span style={{ flex: 1 }}>{t("actions.view")}</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onEdit(rowData.id);
            handleClose();
          }}
        >
          <EditIcon
            style={{
              color:theme.palette.warning.main,
              margin: theme.spacing(1),
              marginLeft: i18n.language === "ar" ? theme.spacing(2) : "",
              marginRight: i18n.language === "ar" ? "" : theme.spacing(2),
            }}
          />{" "}
          <span style={{ flex: 1 }}>{t("actions.edit")}</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete(rowData.id);
            handleClose();
          }}
        >
          <DeleteIcon
            style={{
              color:theme.palette.error.main,
              margin: theme.spacing(1),
              marginLeft: i18n.language === "ar" ? theme.spacing(2) : "",
              marginRight: i18n.language === "ar" ? "" : theme.spacing(2),
            }}
          />{" "}
          <span style={{ flex: 1 }}>{t("actions.delete")}</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActionsMenu;
