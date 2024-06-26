import React from "react";
import { Paper } from "@mui/material";
import { Pie } from "react-chartjs-2";
import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";

const data = {
  labels: ["Open", "To Do", "In Progress", "Close"],
  datasets: [
    {
      data: [40, 20, 23, 18],
      backgroundColor: [
        theme.palette.success.main,
        theme.palette.success.light,
        theme.palette.success.dark,
        theme.palette.success.contrastText,
      ],
    },
  ],
};

const SummaryChart: React.FC = () => {
  const { i18n } = useTranslation();
  return (
    <Paper
      elevation={3}
      style={{
        marginTop: "10px",
        padding: "10px",
        height: "315px",
        width: "510px",
        borderRadius: 12,
        backgroundColor:"#F4F8F7"
      }}
    >
      <Pie
        style={{
          marginRight: i18n.language === "ar" ? "85px" : "",
          marginLeft: i18n.language === "ar" ? "" : "85px",
          width: "300px",
        }}
        data={data}
      />
    </Paper>
  );
};

export default SummaryChart;
