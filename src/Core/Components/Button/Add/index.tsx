import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";
import { ProtectedFeature } from "@Utils/index";

interface AddButtonProps {
  onClickFunction: any;
  requiredPermission: string;
}

const AddButton = ({ onClickFunction, requiredPermission }: AddButtonProps) => {
  const { t } = useTranslation();
  return (
    <ProtectedFeature requiredPermission={requiredPermission}>
      <Button
        style={{ backgroundColor: theme.palette.primary.dark, color: "white" }}
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
