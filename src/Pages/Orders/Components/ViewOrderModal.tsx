import React from "react";
import { Order } from "@Types/Orders";
import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";
import { Typography, Box } from "@mui/material";
import Loader from "@Components/Loader/ModalLoader";

interface ViewOrderProps {
  order: Order | null;
}

const ViewOrderModal: React.FC<ViewOrderProps> = ({ order }) => {
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
      {order ? (
        <div style={{ marginTop: "60px" }}>
          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("ordersPage.id")}
            </Typography>
            <Typography style={valueStyle}>{order.id}</Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("ordersPage.totalPrice")}
            </Typography>
            <Typography style={valueStyle}>{order.totalPrice}</Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("ordersPage.delivery_option")}
            </Typography>
            <Typography style={valueStyle}>
              {order.deliverOption ?? "-"}
            </Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("ordersPage.discount")}
            </Typography>
            <Typography style={valueStyle}>{order.discount ?? "-"}</Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("ordersPage.status")}
            </Typography>
            <Typography style={valueStyle}>{order?.status}</Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("ordersPage.area")}
            </Typography>
            <Typography style={valueStyle}>
              {order?.freeDeliveryArea.area}
            </Typography>
          </Box>
          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("ordersPage.time")}
            </Typography>
            <Typography style={valueStyle}>
              {order?.freeDeliveryArea.time}
            </Typography>
          </Box>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ViewOrderModal;
