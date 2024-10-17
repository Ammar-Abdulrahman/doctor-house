import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
  imageHeader: {
    height: "20vh",
    width: "101%",
    position: "fixed",
    marginTop: "-10px",
    marginLeft: "-8px",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "95vh",
    overflow: "hidden",
  },
  paper: {
    padding: "2.5rem",
    width: "390px",
    marginTop: "100px",
    textAlign: "center",
    borderRadius: "15px",
  },
  formBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    marginTop: "-15px",
  },
  paperContainer: {
    display: "flex",
    //justifyContent: "end",
    alignItems: "center",
  },
  welcomeHeader: {
    direction: "rtl",
    margin: "12px",
    color: theme.palette.primary.main,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default useStyles;
