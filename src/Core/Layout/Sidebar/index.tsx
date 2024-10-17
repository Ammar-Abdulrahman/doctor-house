import { Box } from "@mui/material";
import ListItems from "./List";
import { useLocale } from "@Context/LanguageContext";

const Sidebar = () => {
  const { locale } = useLocale();
  return (
    <Box sx={{ overflow: "auto", direction: locale === "ar" ? "rtl" : "ltr" }}>
      <ListItems />
    </Box>
  );
};

export default Sidebar;
