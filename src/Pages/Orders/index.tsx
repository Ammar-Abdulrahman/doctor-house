import React from "react";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { getOrderColumns } from "./Helper";
import EnhancedTable from "@Components/Table";
import PageLoader from "@Components/Loader/PageLoader";
import { Grid, IconButton } from "@mui/material";
import ViewModal from "@Components/Modal/ViewModal";
import ViewOrderModal from "./Components/ViewOrderModal";
import RefreshIcon from "@mui/icons-material/Refresh";
import useOrdersContainer from "./Container/useOrdersContainer";
import { useLocale } from "@Context/LanguageContext";
import SkeletonTable from "@Components/Skeleton/Table";

const Orders: React.FC = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();

  const {
    rows,
    isLoading,
    isError,
    error,
    isRefetching,
    openViewModal,
    currentOrder,
    handleRefetch,
    handleDelete,
    handleView,
    handleEdit,
    setOpenViewModal,
  } = useOrdersContainer();

  const columns = getOrderColumns(t, handleDelete, handleView, handleEdit);

  return (
    <div style={{ direction: locale === "ar" ? "rtl" : "ltr" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6} md={8}>
          <HeaderTitle title={t("homePage.orders")} />
        </Grid>
        <Grid item xs={6} md={0.5}>
          <IconButton onClick={handleRefetch}>
            <RefreshIcon />
          </IconButton>
        </Grid>
      </Grid>
      {isLoading ? (
        <SkeletonTable />
      ) : !isLoading && isRefetching ? (
        <PageLoader />
      ) : (
        <EnhancedTable rows={rows} columns={columns} />
      )}
      <ViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        title={t("modal.view_order")}
      >
        <ViewOrderModal order={currentOrder} />
      </ViewModal>
    </div>
  );
};

export default Orders;
