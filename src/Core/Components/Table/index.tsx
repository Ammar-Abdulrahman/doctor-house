import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import theme from "@Styles/theme";

interface Column {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  render?: (rowData: any) => JSX.Element;
}

interface Row {
  id: number;
  [key: string]: any;
}

interface EnhancedTableProps {
  rows: Row[];
  columns: Column[];
  direction?: "rtl" | "ltr";
}

const EnhancedTable: React.FC<EnhancedTableProps> = ({ rows, columns }) => {
  // const [order, setOrder] = React.useState('asc');
  // const [orderBy, setOrderBy] = React.useState('');
  const { i18n } = useTranslation();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  return (
    <Box
      sx={{ width: "100%", direction: i18n.language === "ar" ? "rtl" : "ltr" }}
    >
      <Paper sx={{ width: "100%", mb: 2, borderRadius: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead>
              <TableRow
                style={{
                  backgroundColor: theme.palette.info.light,
                  height: theme.spacing(5),
                }}
              >
                {columns.map((column: Column) => (
                  <TableCell
                    key={column.id}
                    align={column.align ? "center" : "center"}
                    style={{ fontWeight: "bold" }}
                    // padding={column.disablePadding ? 'none' : 'normal'}
                    // sortDirection={orderBy === column.id ? order : false}
                    // onClick={(event) => handleRequestSort(event, column.id)}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover tabIndex={-1} key={row.id}>
                  {columns.map(column => (
                    <TableCell key={column.id} align={column.numeric ? 'center' : 'center'}>
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody> */}
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? "white" : "rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={`${row.id}-${column.id}`}
                        align={column.align}
                      >
                        {column.render ? column.render(row) : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ direction: "ltr" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) =>
            setRowsPerPage(parseInt(event.target.value, 10))
          }
        />
      </Paper>
    </Box>
  );
};

export default EnhancedTable;

// import React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { GridColDef } from '@mui/x-data-grid';

// type DataGridComponentProps = {
//   rows: any[];
//   columns: GridColDef[];
//   pageSizeOptions: number[];
// };

// const DataGridComponent: React.FC<DataGridComponentProps> = ({
//   rows,
//   columns,
//   pageSizeOptions,
// }) => {
//   return (
//     <div style={{ width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: {
//               pageSize: pageSizeOptions[0],
//             },
//           },
//         }}
//         //rowsPerPageOptions={pageSizeOptions}
//         //disableSelectionOnClick
//         autoHeight
//         sx={{
//             '& .MuiDataGrid-cell': {
//               textAlign: 'right', // Ensuring text alignment in RTL
//               paddingLeft: '16px' // Consistent padding for alignment
//             },
//             '& .MuiDataGrid-cell:first-of-type': {
//               paddingLeft: '24px', // Additional padding for the first cell
//             },
//             '& .MuiDataGrid-columnHeaders': {
//               backgroundColor: 'rgba(230, 230, 230, 1)', // Styling headers
//               textAlign: 'right' // Header alignment in RTL
//             },
//             '& .MuiDataGrid-row:hover': {
//               backgroundColor: 'rgba(217, 217, 217, 0.49)', // Color on hover
//             },
//             '& .MuiDataGrid-footerContainer': {
//               justifyContent: 'flex-start' // Adjust footer alignment for RTL
//             }
//           }}
//       />
//     </div>
//   );
// };

// export default DataGridComponent;
