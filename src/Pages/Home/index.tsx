import HeaderTitle from "@Components/Header/HeaderTitle";
import { useTranslation } from "react-i18next";
// import Lottie from "lottie-react";
// import InProgressLoaderAnimation from "@Assets/json/in_progress.json";
import withGuards from "@Routes/withGuard.routes";
import { Box, Grid } from "@mui/material";
import StatisticCard from "@Components/StatisticCard";
import SummaryChart from "@Components/Charts/Summary";
import ProgressChart from "@Components/Charts/Progress";
import OrdersChart from "@Components/Charts/Order";
import theme from "@Styles/theme";

// #58508D (Deep Purple)
// #BC5090 (Magenta)
// #FF6361 (Coral)
// #00B6AD (Teal, which you’ve already used for the sidebar background)
// #009FFF (Bright Blue)
// #00BFFF (Sky Blue)
// #00FFFF (Cyan)
// #0040FF (Royal Blue)

const HomePage = () => {
  const { t, i18n } = useTranslation();
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <StatisticCard
              title={t("statisticsPage.total_users")}
              value="1,146"
              color={theme.palette.success.main}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatisticCard
              title={t("statisticsPage.total_products_revenue")}
              value="5:32 Hr"
              color={theme.palette.success.dark}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatisticCard
              title={t("statisticsPage.total_discounts")}
              value="38:27 Hr"
              color={theme.palette.success.light}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatisticCard
              title={t("statisticsPage.total_advertisements")}
              value="$4,6139"
              color={theme.palette.success.contrastText}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SummaryChart />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProgressChart />
          </Grid>
          <Grid item xs={12}>
            <OrdersChart />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default withGuards(HomePage);
