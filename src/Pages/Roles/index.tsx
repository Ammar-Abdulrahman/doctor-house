import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { Role } from "@Types/Roles";
import EnhancedTable from "@Components/Table";
import useRoles from "@Hooks/useRoles";
import { getRoleColumns } from "./Columns";

const Roles: React.FC = () => {
  const [needPagination] = useState(true);
  const { getRoles } = useRoles(needPagination);
  const { data, isLoading, isError, error } = getRoles();
  const { t, i18n } = useTranslation();

 
  const rows = data?.data?.map( (role:Role)  => ({
    id: role.id,
    name: role.name,
  })) || [];
  
  const handleDelete = (id:number) => {
    console.log('Delete:', id);
};

const handleView = (id:number) => {
    console.log('View:', id);
  };

const handleEdit = (id:any) => {
    console.log('Edit:', id);
  };

const columns = getRoleColumns(t, handleDelete, handleView, handleEdit);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <HeaderTitle title={t("homePage.roles")} />
      <EnhancedTable rows={rows} columns={columns} />
    </div>
  );
};

export default Roles;