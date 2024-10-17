import ActionsMenu from "@Components/MenuItems";
import { Column } from "@Types/Column";
import { t } from "i18next";
import * as Yup from "yup";

export const getRoleColumns = (
  t: any,
  handleDelete: any,
  handleView: any,
  handleEdit: any
): Column[] => [
  { id: "id", label: t("rolesPage.id"), align: "center" },
  { id: "name", label: t("rolesPage.name"), align: "center" },
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
];

export const roleValidationSchema = Yup.object().shape({
  nameAr: Yup.string().required(t("rolesPage.name_enValidation")),
  nameEn: Yup.string().required(t("rolesPage.name_enValidation")),
  privileges: Yup.string().required(t("rolesPage.privilegesValidation")),
});
