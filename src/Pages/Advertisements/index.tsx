import React from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import useAdvertisements from "@Hooks/useAdvertisements";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { Advertisement } from "@Types/Advertisements";
import PageLoader from "@Components/Loader/PageLoader";

const Advertisements: React.FC = () => {
  const { getAdvertisements } = useAdvertisements();
  const { data, isLoading, isError, error } = getAdvertisements();
  const { t, i18n } = useTranslation();

  if (isLoading) return <PageLoader />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <HeaderTitle title={t("homePage.advertisements")} />
      <Grid style={{ margin: "5px" }} container spacing={3}>
        {data?.data.map((Advertisement: Advertisement) => (
          <Grid item key={Advertisement.id} xs={12} md={4}>
            <Card
              style={{
                boxShadow: "1px 1px 3px 1px #B3B3B3",
                borderRadius: 20,
              }}
            >
              <CardMedia
                style={{
                  height: "50%",
                  display: "flex",
                  justifyContent: "center",
                  marginRight: "100px",
                  width: "50%",
                }}
                component="img"
                image={Advertisement.image}
                alt={Advertisement.url}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {Advertisement.url}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {i18n.language === "ar"
                    ? Advertisement.description?.ar
                    : Advertisement.description?.en}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Advertisements;
