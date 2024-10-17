import HeaderTitle from "@Components/Header/HeaderTitle";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import NotauthorizedLoaderAnimation from "@Assets/json/anmi1.json";
import { useLocale } from "@Context/LanguageContext";

const NotAuthorizedPage = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();
  return (
    <div style={{ direction: locale === "ar" ? "rtl" : "ltr" }}>
      <HeaderTitle title={t("notAuthorizationsPage.access_denied")} />
      <div
        style={{
          marginLeft: locale === "en" ? "450px" : "",
          marginRight: locale === "ar" ? "450px" : "",
          marginTop: "10px",
          height: "500px",
          width: "500px",
        }}
      >
        <Lottie
          loop={false}
          autoPlay={true}
          animationData={NotauthorizedLoaderAnimation}
        />
      </div>
    </div>
  );
};

export default NotAuthorizedPage;
