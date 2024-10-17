import Lottie from "lottie-react";
import animationData from "@Assets/json/doctor_loader.json";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  gridStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "400px",
    width: "400px",
  },
}));

const ModalViewLoader = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.gridStyle}>
      <Lottie loop={true} autoPlay={true} animationData={animationData} />
    </Grid>
  );
};

export default ModalViewLoader;
