import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const getDiscountColumns = (t:any, handleDelete:any, handleView:any, handleEdit:any) => [
    { id: 'id', label: t("discountsPage.id"), align: 'center' },
    { id: 'code', label: t("discountsPage.code"), align: 'center' },
    { id: 'percentage', label: t("discountsPage.percentage"), align: 'center' },
    { id: 'from', label: t("discountsPage.from"), align: 'center' },
    { id: 'to', label: t("discountsPage.to"), align: 'center' },
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
    }
];
