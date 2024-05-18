import React, { useState } from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import useCategories from "@Hooks/useCategories";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { Category } from "@Types/Categories";

const Categories: React.FC = () => {
  const [needPagination]=useState(false);
  const { getCategories } = useCategories(needPagination);
  const { data, isLoading, isError, error } = getCategories();
  const { t, i18n } = useTranslation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;


  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <HeaderTitle title={t("homePage.categories")} />
      <Grid style={{ margin: "5px" }} container spacing={3}>
        {data?.data.map((category: Category) => (
          <Grid item key={category.id} xs={12} md={4}>
            <Card
              style={{
                boxShadow: "1px 1px 3px 1px #B3B3B3",
                borderRadius: 20,
              }}
            >
              <CardMedia
              style={{height:"50%", display:"flex" , justifyContent:"center" , marginRight:"100px" , width:"50%"}}
                component="img"
                image={category.image}
                alt={category.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <ul>
                    { category?.subcategories ? category?.subcategories?.map((sub) => (
                      <span key={sub.id}> {sub.name}</span>
                    )) : ""}
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Categories;
