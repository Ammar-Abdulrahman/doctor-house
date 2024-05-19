import React from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import useProducts from "@Hooks/useProducts";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { Product } from "@Types/Products";

const Products: React.FC = () => {
  const { getProducts } = useProducts(true);
  const { data, isLoading, isError, error } = getProducts();
  const { t, i18n } = useTranslation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <HeaderTitle title={t("homePage.products")} />
      <Grid style={{ margin: "5px" }} container spacing={3}>
        {data?.data.map((product: Product) => (
          <Grid item key={product.id} xs={12} md={4}>
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
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
