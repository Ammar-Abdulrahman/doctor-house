import { Box } from "@mui/material";
import ListItems from "./List";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { i18n } = useTranslation()
  return (
    <Box sx={{ overflow: "auto", direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
      <ListItems />
    </Box>
  );
};

export default Sidebar;
