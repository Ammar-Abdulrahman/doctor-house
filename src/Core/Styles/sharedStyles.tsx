import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
  textFieldStyle: {
    border: `1px solid #CACDCC`,
    borderRadius: 4,
    marginTop: "30px",
    height: "80px",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    position: "relative",
  },
  labelStyle: {
    fontWeight: "bold",
    position: "absolute",
    top: -12,
    left: "auto",
    right: 16,
    padding: "0 4px",
  },
  valueStyle: {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginRight: "50px",
  },
}));

export default useStyles;
