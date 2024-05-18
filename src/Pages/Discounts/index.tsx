import React, { useState } from "react";
import {
  // Card,
  // CardContent,
  // Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // Typography,
} from "@mui/material";
import useDiscounts from "@Hooks/useDiscounts";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { Discount } from "@Types/Discounts";
//import { getDiscountColumns } from './Columns/index';
// import DataGridComponent from "@Components/Table";
// import ActionModal from "@Components/Card";

const table = {
  minWidth: 650,
};

const Discounts: React.FC = () => {
  const [needPagination] = useState(true);
  const { getDiscounts } = useDiscounts(needPagination);
  const { data, isLoading, isError, error } = getDiscounts();
  const { t, i18n } = useTranslation();
  //const [openModal, setOpenModal] = useState(false);
  //const [selectedId, setSelectedId] = useState(null);

  // const handleEdit = (id: number) => {
  //   setSelectedId(id);
  //   setOpenModal(true);
  // };

  // const handleDelete = (id: number) => {
  //   setSelectedId(id);
  //   setOpenModal(true);
  // };

  // const handleView = (id: number) => {
  //   setSelectedId(id);
  //   setOpenModal(true);
  // };

  // const columns = getDiscountColumns(handleEdit, handleDelete, handleView);

  // const rows = data?.data?.map( (discount:Discount)  => ({
  //   id: discount.id,
  //   code: discount.code,
  //   percentage: discount.percentage,
  //   from: discount.from,
  //   to: discount.to,
  // })) || [];
  

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <HeaderTitle title={t("homePage.discounts")} />
      {/* <DataGridComponent rows={rows} columns={columns} pageSizeOptions={[5, 10, 15]} />
      <ActionModal open={openModal} onClose={() => setOpenModal(false)}>
        <p>Action Modal Content</p>
      </ActionModal> */}
      <TableContainer component={Paper}>
        <Table sx={table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("discountsPage.id")}</TableCell>
              <TableCell>{t("discountsPage.code")}</TableCell>
              <TableCell align="center">{t("discountsPage.percentage")}</TableCell>
              <TableCell align="center">{t("discountsPage.from")}</TableCell>
              <TableCell align="center">{t("discountsPage.to")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((discount: Discount) => (
              <TableRow key={discount.id}>
                <TableCell component="th" scope="row">
                  {discount.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {discount.code}
                </TableCell>
                <TableCell align="center">{discount.percentage}%</TableCell>
                <TableCell align="center">{discount.from}</TableCell>
                <TableCell align="center">{discount.to}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Discounts;



// import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   Paper
// } from '@material-ui/core';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
//   stripeRow: {
//     '&:nth-of-type(odd)': {
//       backgroundColor: '#f9f9f9', // Light grey for odd rows
//     },
//     '&:nth-of-type(even)': {
//       backgroundColor: '#e9e9e9', // Slightly darker grey for even rows
//     },
//   },
// });

// const DiscountTable = ({ data }) => {
//   const classes = useStyles();
//   const [orderDirection, setOrderDirection] = useState('asc');
//   const [valueToOrderBy, setValueToOrderBy] = useState('id');

//   const handleRequestSort = (property) => {
//     const isAscending = (valueToOrderBy === property && orderDirection === 'asc');
//     setValueToOrderBy(property);
//     setOrderDirection(isAscending ? 'desc' : 'asc');
//   };

//   const sortedData = [...data].sort((a, b) => {
//     if (a[valueToOrderBy] < b[valueToOrderBy]) {
//       return orderDirection === 'asc' ? -1 : 1;
//     }
//     if (a[valueToOrderBy] > b[valueToOrderBy]) {
//       return orderDirection === 'asc' ? 1 : -1;
//     }
//     return 0;
//   });

//   return (
//     <TableContainer component={Paper}>
//       <Table className={classes.table} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>
//               <TableSortLabel
//                 active={valueToOrderBy === 'id'}
//                 direction={valueToOrderBy === 'id' ? orderDirection : 'asc'}
//                 onClick={() => handleRequestSort('id')}
//               >
//                 ID - Code
//               </TableSortLabel>
//             </TableCell>
//             <TableCell align="right">
//               <TableSortLabel
//                 active={valueToOrderBy === 'percentage'}
//                 direction={valueToOrderBy === 'percentage' ? orderDirection : 'asc'}
//                 onClick={() => handleRequestSort('percentage')}
//               >
//                 Percentage
//               </TableSortLabel>
//             </TableCell>
//             {/* Remove the 'From' column as requested */}
//             {/* Remove the 'To' column as requested */}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {sortedData.map((discount, index) => (
//             <TableRow key={discount.id} className={classes.stripeRow}>
//               <TableCell component="th" scope="row">
//                 {discount.id} - {discount.code}
//               </TableCell>
//               <TableCell align="right">{discount.percentage}%</TableCell>
//               {/* Remove the 'From' data as requested */}
//               {/* Remove the 'To' data as requested */}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default DiscountTable;
