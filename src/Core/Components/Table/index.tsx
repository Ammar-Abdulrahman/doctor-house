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
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Column } from "@Types/Column";
import { useThemeContext } from "@Context/ThemeContext";
import { useLocale } from "@Context/LanguageContext";

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
  const { i18n } = useTranslation();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const theme = useTheme();
  const { mode } = useThemeContext();
  const { locale } = useLocale();

  return (
    <Box sx={{ width: "100%", direction: locale === "ar" ? "rtl" : "ltr" }}>
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
                // sx={{
                //   "&:last-child td, &:last-child th": {
                //     border: 0,
                //   },
                // }}
              >
                {columns.map((column: Column) => (
                  <TableCell
                    key={column.id}
                    align={column.align ? "center" : "center"}
                    style={{ fontWeight: "bold" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

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
                        index % 2 === 0 && mode === "light"
                          ? "white"
                          : "rgba(0, 0, 0, 0.05)",
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
