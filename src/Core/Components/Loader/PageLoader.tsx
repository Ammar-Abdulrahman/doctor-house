import Lottie from "lottie-react";
import animationData from "@Assets/json/doctor_loader3.json";

const PageLoader = () => {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
        width: "400px",
        marginLeft: "350px",
      }}
    >
      <Lottie loop={true} autoPlay={true} animationData={animationData} />
    </div>
  );
};

export default PageLoader;
