import React from "react";
import { Paper } from "@mui/material";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

const data = {
  labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      label: "Progress",
      data: [20, 30, 40, 30, 20, 40, 50],
      fill: false,
      borderColor: "#4BC0C0",
    },
  ],
};

const ProgressChart: React.FC = () => {
  const { i18n } = useTranslation();
  return (
    <Paper
      elevation={3}
      style={{
        marginTop: "10px",
        padding: "20px",
        height: "315px",
        marginRight: i18n.language === "ar" ? "-92px" : "" ,
        marginLeft:i18n.language === "ar" ? "" : "-92px",
        width: "700px",
        borderRadius: 12,
        backgroundColor:"#F4F8F7"
        //ECF3F0
      }}
    >
      <Line
        style={{
          marginRight: i18n.language === "ar" ? "50px" : "",
          marginLeft: i18n.language === "ar" ? "" : "50px",
        }}
        data={data}
      />
    </Paper>
  );
};

export default ProgressChart;