import React from "react";
import { Category, CategoryOne } from "@Types/Categories";
import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";
import { Typography, Box } from "@mui/material";
import Loader from "@Components/Loader/ModalLoader";

interface ViewCategoryProps {
  category: Category | null;
}

const ViewDeliveryAreaModal: React.FC<ViewCategoryProps> = ({ category }) => {
  const { t, i18n } = useTranslation();

  const textFieldStyle = {
    border: `1px solid #CACDCC`,
    borderRadius: 4,
    marginTop: "30px",
    height: "80px",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    position: "relative",
  };

  const labelStyle = {
    fontWeight: "bold",
    position: "absolute",
    top: -12,
    left: i18n.language === "ar" ? "auto" : 16,
    right: i18n.language === "ar" ? 16 : "auto",
    backgroundColor: "#fff",
    padding: "0 4px",
  };

  const valueStyle = {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginRight: "50px",
  };

  return (
    <>
      {category ? (
        <div style={{ marginTop: "60px" }}>
          <Box
            //style={{ marginLeft: 100 }}
            component="img"
            sx={{
              height: 250,
              width: 250,
              marginRight: "70px",
            }}
            src={category.image}
          />
          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("delivery_areasPage.id")}
            </Typography>
            <Typography style={valueStyle}>{category.id}</Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("delivery_areasPage.time_ar")}
            </Typography>
            <Typography style={valueStyle}>{category.name.ar}</Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("delivery_areasPage.area_ar")}
            </Typography>
            <Typography style={valueStyle}>
              {category.name.en ?? "-"}
            </Typography>
          </Box>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ViewDeliveryAreaModal;
