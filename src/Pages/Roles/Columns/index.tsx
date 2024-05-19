import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const getRoleColumns = (t:any, handleDelete:any, handleView:any, handleEdit:any) => [
    { id: 'id', label: t("rolesPage.id"), align: 'center' },
    { id: 'name_ar', label: t("rolesPage.name"), align: 'center' },
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
