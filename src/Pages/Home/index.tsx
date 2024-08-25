import HeaderTitle from "@Components/Header/HeaderTitle";
import { useTranslation } from "react-i18next";
import withGuards from "@Routes/withGuard.routes";
import { Box, Grid } from "@mui/material";
import StatisticCard from "@Components/StatisticCard";
import OrdersOvertimeChart from "@Components/Charts/Order";
import TopBuyersTable from "@Components/Charts/Table/index";
import theme from "@Styles/theme";
import useDashboardData from "@Hooks/useStatistics";
import PageLoader from "@Components/Loader/PageLoader";

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const {
    getActiveUsersCount,
    getTotalProductsRevenue,
    getTopThreeBuyers,
    getOrdersOvertime,
  } = useDashboardData();

  const { data: activeUsersData, isLoading: isLoadingActiveUsers } =
    getActiveUsersCount();
  const { data: totalRevenueData, isLoading: isLoadingRevenue } =
    getTotalProductsRevenue();
  const { data: topBuyersData, isLoading: isLoadingBuyers } =
    getTopThreeBuyers();
  const { data: ordersOvertimeData, isLoading: isLoadingOrders } =
    getOrdersOvertime();

  if (
    isLoadingActiveUsers ||
    isLoadingRevenue ||
    isLoadingBuyers ||
    isLoadingOrders
  ) {
    return <PageLoader />;
  }

  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <HeaderTitle title={t("homePage.home")} />
      <Box
        sx={{
          padding: "10px",
          marginTop: "5px",
          direction: i18n.language === "ar" ? "rtl" : "ltr",
        }}
      >
        <Grid container spacing={3}>
          <Grid item md={6} xs={6}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={3}>
                <StatisticCard
                  title={t("statisticsPage.total_users")}
                  value={activeUsersData?.data.count.toString()}
                  color={theme.palette.secondary.contrastText}
                />
              </Grid>
              <Grid item md={6} xs={3}>
                <StatisticCard
                  title={t("statisticsPage.total_products_revenue")}
                  value={`${totalRevenueData?.data.total.toLocaleString()} ل.س`}
                  color={theme.palette.success.main}
                />
              </Grid>
            </Grid>
            <Grid item xs={4} md={12}>
              <TopBuyersTable buyers={topBuyersData?.data.buyers || []} />
            </Grid>
          </Grid>
          <Grid item md={6} xs={10}>
            <OrdersOvertimeChart data={ordersOvertimeData.data.data} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default withGuards(HomePage);
