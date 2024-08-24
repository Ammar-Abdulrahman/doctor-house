import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

interface Buyer {
  user: string;
  total: number;
}

interface TopBuyersTableProps {
  buyers: Buyer[];
}

const TopBuyersTable: React.FC<TopBuyersTableProps> = ({ buyers }) => {
  return (
    <TableContainer
      style={{
        marginTop: "15px",
        padding: "20px",
        borderRadius: 12,
        backgroundColor: "#F4F8F7",
      }}
      component={Paper}
    >
      <Typography variant="h6">Top Buyers</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="left">Total Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buyers.map((buyer) => (
            <TableRow key={buyer.user}>
              <TableCell component="th" scope="row">
                {buyer.user}
              </TableCell>
              <TableCell align="left">
                ${buyer.total.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopBuyersTable;
