import React, { useState } from "react";
//import { Card,CardContent,Grid,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Typography} from "@mui/material";
import useDiscounts from "@Hooks/useDiscounts";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { Discount } from "@Types/Discounts";
import EnhancedTable from "@Components/Table";
import { getDiscountColumns } from './Columns/index';
// import ActionModal from "@Components/Card";

const Discounts: React.FC = () => {
  const [needPagination] = useState(true);
  const { getDiscounts } = useDiscounts(needPagination);
  const { data, isLoading, isError, error } = getDiscounts();
  const { t, i18n } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
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

  const rows = data?.data?.map( (discount:Discount)  => ({
    id: discount.id,
    code: discount.code,
    percentage: `${discount.percentage}%`,
    from: discount.from,
    to: discount.to,
  })) || [];
  
  const handleDelete = (id:number) => {
    console.log('Delete:', id);
     setOpenModal(true);
};

const handleView = (id:number) => {
    console.log('View:', id);
    setOpenModal(true);
  };

const handleEdit = (id:any) => {
    console.log('Edit:', id);
    setOpenModal(true);
  };

const columns = getDiscountColumns(t, handleDelete, handleView, handleEdit);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <HeaderTitle title={t("homePage.discounts")} />
      <EnhancedTable rows={rows} columns={columns} />
    </div>
  );
};

export default Discounts;