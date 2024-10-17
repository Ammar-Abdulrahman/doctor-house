import ActionsMenu from "@Components/MenuItems";

interface Column {
  id: string;
  label: string;
  align: 'center' | 'left' | 'right';
  render?: (rowData: any) => JSX.Element;
}

export const getOrderColumns = (
  t: any,
  handleDelete: any,
  handleView: any,
  handleEdit: any
) : Column[] => [
  { id: "id", label: t("ordersPage.id"), align: "center" },
  { id: "user", label: t("ordersPage.user"), align: "center" },
  { id: "status", label: t("ordersPage.status"), align: "center" },
  { id: "date", label: t("ordersPage.date"), align: "center" },
  { id: "deliveryOption", label: t("ordersPage.delivery_option"), align: "center" },
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
]
