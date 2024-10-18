import { Button, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { ProtectedFeature } from "@Utils/index";

interface AddButtonProps {
  onClickFunction: any;
  requiredPermission: string;
}

const AddButton = ({ onClickFunction, requiredPermission }: AddButtonProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <ProtectedFeature requiredPermission={requiredPermission}>
      <Button
        sx={{
          backgroundColor: theme.palette.primary.dark,
          color: "white",
        }}
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
