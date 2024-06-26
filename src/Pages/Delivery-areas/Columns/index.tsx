import ActionsMenu from "@Components/MenuItems";

interface Column {
  id: string;
  label: string;
  align: 'center' | 'left' | 'right';
  render?: (rowData: any) => JSX.Element;
}

export const getDeliveryAreaColumns = (
  t: any,
  handleDelete: any,
  handleView: any,
  handleEdit: any
) : Column[] => [
  { id: "id", label: t("delivery_areasPage.id"), align: "center" },
  { id: "area", label: t("delivery_areasPage.area"), align: "center" },
  { id: "time", label: t("delivery_areasPage.time"), align: "center" },
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
