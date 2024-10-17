import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
//import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";
import { ProtectedFeature } from "@Utils/index";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
  buttonStyle: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
  },
}));

interface AddButtonProps {
  onClickFunction: any;
  requiredPermission: string;
}

const AddButton = ({ onClickFunction, requiredPermission }: AddButtonProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <ProtectedFeature requiredPermission={requiredPermission}>
      <Button
        className={classes.buttonStyle}
        onClick={onClickFunction}
        variant="contained"
      >
        <AddIcon />
        {t("actions.add")}
      </Button>
    </ProtectedFeature>
  );
};

export default AddButton;
