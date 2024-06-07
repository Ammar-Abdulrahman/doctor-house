import ActionsMenu from "@Components/MenuItems";

interface Column {
  id: string;
  label: string;
  align: "center" | "left" | "right";
  render?: (rowData: any) => JSX.Element;
}

export const getOperatorColumns = (
  t: any,
  handleDelete: any,
  handleView: any,
  handleEdit: any
): Column[] => [
  { id: "id", label: t("operatorsPage.id"), align: "center" },
  { id: "username", label: t("operatorsPage.username"), align: "center" },
  { id: "fullName", label: t("operatorsPage.fullName"), align: "center" },
  { id: "role", label: t("operatorsPage.role"), align: "center" },
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
