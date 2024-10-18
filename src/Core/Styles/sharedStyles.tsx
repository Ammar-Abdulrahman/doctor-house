import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  border: "1px solid #CACDCC",
  borderRadius: 4,
  marginTop: "30px",
  height: "80px",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  position: "relative",
}));

export const Label = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  position: "absolute",
  top: -12,
  left: "auto",
  right: 16,
  padding: "0 4px",
}));

export const Value = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  marginRight: "50px",
}));
