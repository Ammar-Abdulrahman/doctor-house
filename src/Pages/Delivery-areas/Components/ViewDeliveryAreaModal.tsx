import React from "react";
import { DeliveryArea } from "@Types/Delivery-areas";
import { useTranslation } from "react-i18next";
import Loader from "@Components/Loader/ModalViewLoader";
import BoxContainerViewLabel from "@Components/Box";

interface ViewDeliveryAreaProps {
  deliveryArea: DeliveryArea | null;
}

const ViewDeliveryAreaModal: React.FC<ViewDeliveryAreaProps> = ({
  deliveryArea,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {deliveryArea ? (
        <div style={{ marginTop: "60px" }}>
          <BoxContainerViewLabel
            title={t("delivery_areasPage.id")}
            value={deliveryArea.id}
          />

          <BoxContainerViewLabel
            title={t("delivery_areasPage.time_ar")}
            value={deliveryArea.time.ar ?? "-"}
          />

          <BoxContainerViewLabel
            title={t("delivery_areasPage.area_ar")}
            value={deliveryArea.area.ar ?? "-"}
          />

          <BoxContainerViewLabel
            title={t("delivery_areasPage.time_en")}
            value={deliveryArea.time.en ?? "-"}
          />

          <BoxContainerViewLabel
            title={t("delivery_areasPage.area_en")}
            value={deliveryArea.area.en ?? "-"}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ViewDeliveryAreaModal;
