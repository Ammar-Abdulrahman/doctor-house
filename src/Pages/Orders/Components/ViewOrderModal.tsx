import React from "react";
import { Order } from "@Types/Orders";
import { useTranslation } from "react-i18next";
import Loader from "@Components/Loader/ModalViewLoader";
import BoxContainerViewLabel from "@Components/Box";

interface ViewOrderProps {
  order: Order | null;
}

const ViewOrderModal: React.FC<ViewOrderProps> = ({ order }) => {
  const { t } = useTranslation();

  return (
    <>
      {order ? (
        <div style={{ marginTop: "60px" }}>
          <BoxContainerViewLabel title={t("ordersPage.id")} value={order.id} />

          <BoxContainerViewLabel
            title={t("ordersPage.totalPrice")}
            value={order.totalPrice}
          />
          <BoxContainerViewLabel
            title={t("ordersPage.delivery_option")}
            value={order.deliverOption}
          />
          <BoxContainerViewLabel
            title={t("ordersPage.discount")}
            value={order.discount}
          />
          <BoxContainerViewLabel
            title={t("ordersPage.status")}
            value={order.status}
          />
          <BoxContainerViewLabel
            title={t("ordersPage.area")}
            value={order.freeDeliveryArea.area}
          />
          <BoxContainerViewLabel
            title={t("ordersPage.time")}
            value={order.freeDeliveryArea.time}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ViewOrderModal;
