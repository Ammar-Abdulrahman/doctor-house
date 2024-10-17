import React from "react";
import { Paper } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { lightTheme } from "@Styles/theme";
import { useTranslation } from "react-i18next";
import { useLocale } from "@Context/LanguageContext";

const data = {
  labels: ["Open", "To Do", "In Progress", "Close"],
  datasets: [
    {
      data: [40, 20, 23, 18],
      backgroundColor: [
        lightTheme.palette.success.main,
        lightTheme.palette.success.light,
        lightTheme.palette.success.dark,
        lightTheme.palette.success.contrastText,
      ],
    },
  ],
};

const SummaryChart: React.FC = () => {
  const { locale } = useLocale();
  return (
    <Paper
      elevation={3}
      style={{
        marginTop: "10px",
        padding: "10px",
        height: "315px",
        width: "510px",
        borderRadius: 12,
        backgroundColor: "#F4F8F7",
      }}
    >
      <Pie
        style={{
          marginRight: locale === "ar" ? "85px" : "",
          marginLeft: locale === "ar" ? "" : "85px",
          width: "300px",
        }}
        data={data}
      />
    </Paper>
  );
};

export default SummaryChart;
