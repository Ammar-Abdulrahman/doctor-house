import HeaderTitle from "@Components/Header/HeaderTitle";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import NotFoundLoaderAnimation from "@Assets/json/anmi2.json";

const PageNotFound = () => {
  const { t, i18n } = useTranslation();
  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <HeaderTitle title={t("notFoundPage.not_found")} />
      <div
        style={{
          marginLeft: i18n.language === "en" ? "300px" : "",
          marginRight: i18n.language === "ar" ? "300px" : "",
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
