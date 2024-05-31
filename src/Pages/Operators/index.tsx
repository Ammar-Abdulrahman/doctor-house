import React, { useState } from "react";
import useOperators from "@Hooks/useOperators";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { Operator } from "@Types/Operator";
import { getOperatorColumns } from "./Columns";
import EnhancedTable from "@Components/Table";
import PageLoader from "@Components/Loader/PageLoader";

const Operators: React.FC = () => {
  const [needPagination] = useState(true);
  const { getOperators } = useOperators(needPagination);
  const { data, isLoading, isError, error } = getOperators();
  const { t, i18n } = useTranslation();

  const rows = data?.data?.map( (operator:Operator)  => ({
    id: operator.id,
    username: operator.username,
    fullName: operator.fullName,
  })) || [];

  const handleView = (id:number) => {
    console.log('View:', id);
  };

const handleEdit = (id:any) => {
    console.log('Edit:', id);
  };

  const handleDelete = (id:number) => {
    console.log('Delete:', id);
};

const columns = getOperatorColumns(t, handleDelete, handleView, handleEdit);

  if (isLoading) return <PageLoader />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <HeaderTitle title={t("homePage.operators")} />
      <EnhancedTable rows={rows} columns={columns} />
    </div>
  );
};

export default Operators;
