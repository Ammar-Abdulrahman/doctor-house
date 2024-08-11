import React from "react";
import { Advertisement } from "@Types/Advertisements";
import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";
import { Typography, Box } from "@mui/material";
import Loader from "@Components/Loader/ModalLoader";

interface ViewAdvertisementProps {
  advertisement: Advertisement | null;
}

const ViewAdvertisementModal: React.FC<ViewAdvertisementProps> = ({
  advertisement,
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
      {advertisement ? (
        <div style={{ marginTop: "60px" }}>
          <Box
            //style={{ marginLeft: 100 }}
            component="img"
            sx={{
              height: 250,
              width: 250,
              marginRight: "70px",
            }}
            src={advertisement.image}
          />
          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("delivery_areasPage.id")}
            </Typography>
            <Typography style={valueStyle}>{advertisement.id}</Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("delivery_areasPage.time_ar")}
            </Typography>
            <Typography style={valueStyle}>{advertisement.url}</Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("delivery_areasPage.area_ar")}
            </Typography>
            <Typography style={valueStyle}>
              {advertisement.description?.ar ? advertisement.description?.ar : "-"}
            </Typography>
          </Box>

          <Box component="fieldset" sx={textFieldStyle}>
            <Typography component="legend" sx={labelStyle}>
              {t("delivery_areasPage.area_ar")}
            </Typography>
            <Typography style={valueStyle}>
              {advertisement.description?.en ? advertisement.description?.en : "-"}
            </Typography>
          </Box>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ViewAdvertisementModal;
