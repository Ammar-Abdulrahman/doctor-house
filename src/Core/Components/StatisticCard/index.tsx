import React from "react";
import { Typography, Paper } from "@mui/material";

interface StatisticCardProps {
  title: string;
  value: string | number;
  color: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  color,
}) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        borderRadius: 12,
        //backgroundColor: "#F4F8F7"
      }}
    >
      <Typography variant="h6" style={{ color: color }}>
        {title}
      </Typography>
      <Typography variant="h5" style={{ color: color }}>
        {value}
      </Typography>
    </Paper>
  );
};

export default StatisticCard;
