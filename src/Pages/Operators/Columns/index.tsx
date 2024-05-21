import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ActionsMenu from '@Components/MenuItems';

interface Column {
    id: string;
    label: string;
    align: 'center' | 'left' | 'right'; // This restricts the align values
    render?: (rowData: any) => JSX.Element;
  }

export const getOperatorColumns = (t:any, handleDelete:any, handleView:any, handleEdit:any) : Column[] => [
    { id: 'id', label: t("operatorsPage.id"), align: 'center' },
    { id: 'username', label: t("operatorsPage.username"), align: 'center' },
    { id: 'fullName', label: t("operatorsPage.fullName"), align: 'center' },
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
    {
        id: 'view',
        label: t("actions.view"),
        align: 'center',
        render: (rowData:any) => (
            <IconButton onClick={() => handleView(rowData.id)}>
                <VisibilityIcon />
            </IconButton>
        )
    },
    {
        id: 'edit',
        label: t("actions.edit"),
        align: 'center',
        render: (rowData:any) => (
            <IconButton onClick={() => handleEdit(rowData.id)}>
                <EditIcon />
            </IconButton>
        )
    },
    {
        id: 'delete',
        label: t("actions.delete"),
        align: 'center',
        render: (rowData:any) => (
            <IconButton onClick={() => handleDelete(rowData.id)}>
                <DeleteIcon />
            </IconButton>
        )
    },
];
