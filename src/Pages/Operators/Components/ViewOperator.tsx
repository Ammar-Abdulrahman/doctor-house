import React from "react";
import { Operator } from "@Types/Operator";
import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";
import { Typography, Box } from "@mui/material";
import Loader from "@Components/Loader/ModalLoader";

interface ViewOperatorProps {
  operator: Operator | null;
}

const ViewOperatorModal: React.FC<ViewOperatorProps> = ({ operator }) => {
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
      {operator ? (
        <div style={{ marginTop: "60px" }}>
          <Box component="fieldset" style={textFieldStyle}>
            <Typography component="legend" style={labelStyle}>
              {t("operatorsPage.id")}
            </Typography>
            <Typography style={valueStyle}>
              {operator.id}
            </Typography>
          </Box>

          <Box component="fieldset" style={textFieldStyle}>
            <Typography component="legend" style={labelStyle}>
              {t("operatorsPage.username")}
            </Typography>
            <Typography style={valueStyle}>
              {operator.username}
            </Typography>
          </Box>

          <Box component="fieldset" style={textFieldStyle}>
            <Typography component="legend" style={labelStyle}>
              {t("operatorsPage.fullName")}
            </Typography>
            <Typography style={valueStyle}>
              {operator.fullName}
            </Typography>
          </Box>

          <Box component="fieldset" style={textFieldStyle}>
            <Typography component="legend" style={labelStyle}>
              {t("modal.role")}
            </Typography>
            <Typography style={valueStyle}>
              {i18n.language === "ar"
                ? operator.role.name.ar
                : operator.role.name.en}
            </Typography>
          </Box>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ViewOperatorModal;
