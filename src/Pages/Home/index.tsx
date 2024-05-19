import HeaderTitle from "@Components/Header/HeaderTitle";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import InProgressLoaderAnimation from "@Assets/json/in_progress.json";
import withGuards from "@Routes/withGuard.routes";

const HomePage = () => {
  const { t, i18n } = useTranslation();
  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <HeaderTitle title={t("homePage.home")} />
      <div
        style={{
          marginLeft: i18n.language === "en" ? "480px" : "",
          marginRight: i18n.language === "ar" ? "480px" : "",
          marginTop: "70px",
          height: "450px",
          width: "450px",
        }}
      >
        <Lottie
          loop={true}
          autoPlay={true}
          animationData={InProgressLoaderAnimation}
        />
      </div>
    </div>
  );
};

export default withGuards(HomePage);
