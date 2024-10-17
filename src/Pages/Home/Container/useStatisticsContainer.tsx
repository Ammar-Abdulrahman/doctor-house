import useDashboardData from "@Hooks/useStatistics";

const useStatisticsContainer = () => {
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

  return {
    activeUsersData,
    totalRevenueData,
    topBuyersData,
    ordersOvertimeData,
    isLoadingActiveUsers,
    isLoadingBuyers,
    isLoadingOrders,
    isLoadingRevenue,
  };
};
export default useStatisticsContainer;
