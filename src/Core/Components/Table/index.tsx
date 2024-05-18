import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from '@mui/x-data-grid';

type DataGridComponentProps = {
  rows: any[];
  columns: GridColDef[];
  pageSizeOptions: number[];
};

const DataGridComponent: React.FC<DataGridComponentProps> = ({
  rows,
  columns,
  pageSizeOptions,
}) => {
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSizeOptions[0],
            },
          },
        }}
        //rowsPerPageOptions={pageSizeOptions}
        //disableSelectionOnClick
        autoHeight
        sx={{
            '& .MuiDataGrid-cell': {
              textAlign: 'right', // Ensuring text alignment in RTL
              paddingLeft: '16px' // Consistent padding for alignment
            },
            '& .MuiDataGrid-cell:first-of-type': {
              paddingLeft: '24px', // Additional padding for the first cell
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'rgba(230, 230, 230, 1)', // Styling headers
              textAlign: 'right' // Header alignment in RTL
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'rgba(217, 217, 217, 0.49)', // Color on hover
            },
            '& .MuiDataGrid-footerContainer': {
              justifyContent: 'flex-start' // Adjust footer alignment for RTL
            }
          }}
      />
    </div>
  );
};

export default DataGridComponent;
