import React from "react";
import { Discount } from "@Types/Discounts";
import { useTranslation } from "react-i18next";
import Loader from "@Components/Loader/ModalViewLoader";
import { formatDate } from "@Utils/index";
import BoxContainerViewLabel from "@Components/Box";

interface ViewDiscountProps {
  discount: Discount | null;
}

const ViewDiscountModal: React.FC<ViewDiscountProps> = ({ discount }) => {
  const { t } = useTranslation();

  return (
    <>
      {discount ? (
        <div style={{ marginTop: "60px" }}>
          <BoxContainerViewLabel
            title={t("discountsPage.id")}
            value={discount.id}
          />

          <BoxContainerViewLabel
            title={t("discountsPage.code")}
            value={discount.code}
          />

          <BoxContainerViewLabel
            title={t("discountsPage.percentage")}
            value={discount.percentage}
          />

          <BoxContainerViewLabel
            title={t("discountsPage.value")}
            value={discount.value}
          />
          <BoxContainerViewLabel
            title={t("discountsPage.from")}
            value={formatDate(discount?.from)}
          />

          <BoxContainerViewLabel
            title={t("discountsPage.to")}
            value={formatDate(discount?.to)}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ViewDiscountModal;
