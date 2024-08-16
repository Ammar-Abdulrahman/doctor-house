import React from "react";
import { DeliveryArea } from "@Types/Delivery-areas";
import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";
import { Typography, Box } from "@mui/material";
import Loader from "@Components/Loader/ModalLoader";

interface ViewDeliveryAreaProps {
  deliveryArea: DeliveryArea | null;
}

const ViewDeliveryAreaModal: React.FC<ViewDeliveryAreaProps> = ({
  deliveryArea,
}) => {
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
      {deliveryArea ? (
        <div style={{ marginTop: "60px" }}>
          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("delivery_areasPage.id")}
            </Typography>
            <Typography style={valueStyle}>{deliveryArea.id}</Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("delivery_areasPage.time_ar")}
            </Typography>
            <Typography style={valueStyle}>{deliveryArea.time.ar}</Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("delivery_areasPage.area_ar")}
            </Typography>
            <Typography style={valueStyle}>
              {deliveryArea.area.ar ?? "-"}
            </Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("delivery_areasPage.time_en")}
            </Typography>
            <Typography style={valueStyle}>
              {deliveryArea.time.en ?? "-"}
            </Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("delivery_areasPage.area_en")}
            </Typography>
            <Typography style={valueStyle}>
              {deliveryArea.area.en ?? "-"}
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
