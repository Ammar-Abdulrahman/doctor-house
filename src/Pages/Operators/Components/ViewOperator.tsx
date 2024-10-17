import React from "react";
import { Operator } from "@Types/Operator";
import { useTranslation } from "react-i18next";
import Loader from "@Components/Loader/ModalViewLoader";
import BoxContainerViewLabel from "@Components/Box";
import { useLocale } from "@Context/LanguageContext";

interface ViewOperatorProps {
  operator: Operator | null;
}

const ViewOperatorModal: React.FC<ViewOperatorProps> = ({ operator }) => {
  const { t, i18n } = useTranslation();
  const { locale } = useLocale();
  return (
    <>
      {operator ? (
        <div style={{ marginTop: "60px" }}>
          <BoxContainerViewLabel
            title={t("operatorsPage.id")}
            value={operator.id}
          />

          <BoxContainerViewLabel
            title={t("operatorsPage.username")}
            value={operator.username}
          />

          <BoxContainerViewLabel
            title={t("operatorsPage.fullName")}
            value={operator.fullName}
          />

          <BoxContainerViewLabel
            title={t("modal.role")}
            value={
              locale === "ar" ? operator.role.name.ar : operator.role.name.en
            }
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ViewOperatorModal;
