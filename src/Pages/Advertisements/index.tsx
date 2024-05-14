import HeaderTitle from "@Components/Header/HeaderTitle";
import { useTranslation } from "react-i18next";

const Advertisements = () => {
  const { t, i18n } = useTranslation();
  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <HeaderTitle title={t("homePage.advertisements")} />
    </div>
  );
};

export default Advertisements;
