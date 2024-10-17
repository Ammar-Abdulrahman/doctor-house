import HeaderTitle from "@Components/Header/HeaderTitle";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import NotFoundLoaderAnimation from "@Assets/json/anmi2.json";
import { useLocale } from "@Context/LanguageContext";

const PageNotFound = () => {
  const { t, i18n } = useTranslation();
  const { locale } = useLocale();
  return (
    <div style={{ direction: locale === "ar" ? "rtl" : "ltr" }}>
      <HeaderTitle title={t("notFoundPage.not_found")} />
      <div
        style={{
          marginLeft: locale === "en" ? "300px" : "",
          marginRight: locale === "ar" ? "300px" : "",
          marginTop: "50px",
          height: "750px",
          width: "750px",
        }}
      >
        <Lottie
          loop={true}
          autoPlay={true}
          animationData={NotFoundLoaderAnimation}
        />
      </div>
    </div>
  );
};

export default PageNotFound;
