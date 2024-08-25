import HeaderTitle from "@Components/Header/HeaderTitle";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import NotauthorizedLoaderAnimation from "@Assets/json/anmi1.json";

const NotAuthorizedPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <HeaderTitle title={t("notAuthorizationsPage.access_denied")} />
      <div
        style={{
          marginLeft: i18n.language === "en" ? "450px" : "",
          marginRight: i18n.language === "ar" ? "450px" : "",
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
