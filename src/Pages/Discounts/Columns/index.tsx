import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GridColDef } from '@mui/x-data-grid';

export const getDiscountColumns = (handleEdit:any , handleDelete:any, handleView:any): GridColDef[] => [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'code', headerName: 'Code', flex: 1 },
  { field: 'percentage', headerName: 'Percentage', flex: 1, align: 'center' },
  { field: 'from', headerName: 'From', flex: 1, align: 'center' },
  { field: 'to', headerName: 'To', flex: 1, align: 'center' },
  {
    field: 'view',
    headerName: 'View',
    renderCell: (params) => (
      <IconButton onClick={() => handleView(params.row.id)}>
        <VisibilityIcon />
      </IconButton>
    ),
    flex: 0.5,
    sortable: false,
    align: 'center'
  },
  {
    field: 'edit',
    headerName: 'Edit',
    renderCell: (params) => (
      <IconButton onClick={() => handleEdit(params.row.id)}>
        <EditIcon />
      </IconButton>
    ),
    flex: 0.5,
    sortable: false,
    align: 'center'
  },
  {
    field: 'delete',
    headerName: 'Delete',
    renderCell: (params) => (
      <IconButton onClick={() => handleDelete(params.row.id)}>
        <DeleteIcon />
      </IconButton>
    ),
    flex: 0.5,
    sortable: false,
    align: 'center'
  }
];
