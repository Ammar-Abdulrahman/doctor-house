import Lottie from "lottie-react";
import animationData from "@Assets/json/doctor_loader.json";
import { Grid } from "@mui/material";

const gridStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const ModalViewLoader = () => {
  return (
    <Grid container sx={gridStyle}>
      <Lottie loop={true} autoPlay={true} animationData={animationData} />
    </Grid>
  );
};

export default ModalViewLoader;
