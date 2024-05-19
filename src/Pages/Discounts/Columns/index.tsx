// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { Menu, MenuItem } from "@mui/material";
// import { t } from "i18next";
// import { useState } from "react";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActionsMenu from "@Components/MenuItems";

export const getDiscountColumns = (
  t: any,
  handleDelete: any,
  handleView: any,
  handleEdit: any
) => [
  { id: "id", label: t("discountsPage.id"), align: "center" },
  { id: "code", label: t("discountsPage.code"), align: "center" },
  { id: "percentage", label: t("discountsPage.percentage"), align: "center" },
  { id: "from", label: t("discountsPage.from"), align: "center" },
  { id: "to", label: t("discountsPage.to"), align: "center" },
  {
    id: "actions",
    label: t("actions.label"),
    align: "center",
    render: (rowData: any) => (
        <ActionsMenu
          rowData={rowData}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
        />
    ),
  },
//   {
//     id: "delete",
//     label: t("actions.delete"),
//     align: "center",
//     render: (rowData: any) => (
//       <IconButton onClick={() => handleDelete(rowData.id)}>
//         <DeleteIcon />
//       </IconButton>
//     ),
//   },
//   {
//     id: "view",
//     label: t("actions.view"),
//     align: "center",
//     render: (rowData: any) => (
//       <IconButton onClick={() => handleView(rowData.id)}>
//         <VisibilityIcon />
//       </IconButton>
//     ),
//   },
//   {
//     id: "edit",
//     label: t("actions.edit"),
//     align: "center",
//     render: (rowData: any) => (
//       <IconButton onClick={() => handleEdit(rowData.id)}>
//         <EditIcon />
//       </IconButton>
//     ),
//   },
];

// const ActionsMenu = (rowData: any, onEdit: any, onView: any, onDelete: any) => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event: any) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <IconButton
//         aria-label="more"
//         aria-controls="long-menu"
//         aria-haspopup="true"
//         onClick={handleClick}
//       >
//         <MoreVertIcon />
//       </IconButton>
//       <Menu
//         id="long-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem
//           onClick={() => {
//             onView(rowData.id);
//             handleClose();
//           }}
//         >
//           <VisibilityIcon /> {t("actions.view")}
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             onEdit(rowData.id);
//             handleClose();
//           }}
//         >
//           <EditIcon /> {t("actions.edit")}
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             onDelete(rowData.id);
//             handleClose();
//           }}
//         >
//           <DeleteIcon /> {t("actions.delete")}
//         </MenuItem>
//       </Menu>
//     </>
//   );
// };
