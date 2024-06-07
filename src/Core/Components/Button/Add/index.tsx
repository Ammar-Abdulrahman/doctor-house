import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";

interface AddButtonProps {
  onClickFunction: any;
}

const AddButton = ({ onClickFunction }: AddButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      style={{ backgroundColor: theme.palette.primary.dark, color: "white" }}
      onClick={onClickFunction}
      variant="contained"
    >
      <AddIcon />
      {t("actions.add")}
    </Button>
  );
};

export default AddButton;
