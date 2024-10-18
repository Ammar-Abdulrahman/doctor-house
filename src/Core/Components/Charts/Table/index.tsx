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
import { useTranslation } from "react-i18next";

interface Buyer {
  user: string;
  total: number;
}

interface TopBuyersTableProps {
  buyers: Buyer[];
}

const TopBuyersTable: React.FC<TopBuyersTableProps> = ({ buyers }) => {
  const { t } = useTranslation();
  return (
    <TableContainer
      style={{
        marginTop: "15px",
        padding: "20px",
        borderRadius: 12,
        //backgroundColor: "#F4F8F7",
      }}
      component={Paper}
    >
      <Typography variant="h6">{t("statisticsPage.top_bayers")}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> {t("statisticsPage.user")} </TableCell>
            <TableCell align="left" color="primary">
             {t("statisticsPage.total_revenue")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buyers.map((buyer) => (
            <TableRow key={buyer.user}>
              <TableCell component="th" scope="row">
                {buyer.user}
              </TableCell>
              <TableCell align="left">
                {buyer.total.toLocaleString()} ل.س
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopBuyersTable;
