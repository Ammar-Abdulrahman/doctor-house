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
    userName: operator.username,
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
      {/* <Grid style={{ margin: "5px" }} container spacing={3}>
        {data?.data.map((operator: Operator) => (
          <Grid item key={operator.id} xs={12} md={4}>
            <Card
              style={{
                boxShadow: "1px 1px 3px 1px #B3B3B3",
                borderRadius: 20,
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {operator.id} - {operator.fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {operator.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Role {operator?.isActive}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid> */}
    </div>
  );
};

export default Operators;
