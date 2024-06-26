import React from "react";
import { Discount } from "@Types/Discounts";
import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";
import { Typography, Box } from "@mui/material";
import Loader from "@Components/Loader/ModalLoader";
import { formatDate } from "@Utils/index";

interface ViewDiscountProps {
  discount: Discount | null;
}

const ViewDiscountModal: React.FC<ViewDiscountProps> = ({ discount }) => {
  const { t, i18n } = useTranslation();

  const textFieldStyle = {
    border: `1px solid #CACDCC`,
    borderRadius: 4,
    marginTop:"30px",
    height:"80px",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    position: 'relative',
  };

  const labelStyle = {
    fontWeight: 'bold',
    position: 'absolute',
    top: -12,
    left: i18n.language === "ar" ? 'auto' : 16,
    right: i18n.language === "ar" ? 16 : 'auto',
    backgroundColor: '#fff',
    padding: '0 4px',
  };

  const valueStyle = {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginRight: "50px",
  };

  return (
    <>
      {discount ? (
        <div style={{ marginTop: "60px" }}>
          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("discountsPage.id")}
            </Typography>
            <Typography style={valueStyle}>
              {discount.id}
            </Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("discountsPage.code")}
            </Typography>
            <Typography style={valueStyle}>
              {discount.code}
            </Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("discountsPage.percentage")}
            </Typography>
            <Typography style={valueStyle}>
              {discount.percentage ?? "-"}
            </Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("discountsPage.value")}
            </Typography>
            <Typography style={valueStyle}>
              {discount.value ?? "-"}
            </Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("discountsPage.from")}
            </Typography>
            <Typography style={valueStyle}>
              { formatDate(discount?.from) }
            </Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("discountsPage.to")}
            </Typography>
            <Typography style={valueStyle}>
              {formatDate(discount?.to)}
            </Typography>
          </Box>
          
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ViewDiscountModal;
