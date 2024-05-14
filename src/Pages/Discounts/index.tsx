import React, { useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import useDiscounts from "@Hooks/useDiscounts";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { Discount } from "@Types/Discounts";

const Discounts: React.FC = () => {
  const [needPagination] = useState(true);
  const { getDiscounts } = useDiscounts(needPagination);
  const { data, isLoading, isError, error } = getDiscounts();
  const { t, i18n } = useTranslation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <HeaderTitle title={t("homePage.discounts")} />
      <Grid style={{ margin: "5px" }} container spacing={3}>
        {data?.data.map((discount: Discount) => (
          <Grid item key={discount.id} xs={12} md={4}>
            <Card
              style={{
                boxShadow: "1px 1px 3px 1px #B3B3B3",
                borderRadius: 20,
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {discount.id} - {discount.code}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {discount.percentage} %
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  from: {discount.from}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  to : {discount.to}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Discounts;
