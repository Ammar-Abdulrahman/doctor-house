import React from "react";
import { Category } from "@Types/Categories";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import Loader from "@Components/Loader/ModalViewLoader";
import BoxContainerViewLabel from "@Components/Box";

interface ViewCategoryProps {
  category: Category | null;
}

const ViewDeliveryAreaModal: React.FC<ViewCategoryProps> = ({ category }) => {
  const { t } = useTranslation();
  return (
    <>
      {category ? (
        <div style={{ marginTop: "60px" }}>
          <Box
            //style={{ marginLeft: 100 }}
            component="img"
            sx={{
              height: 250,
              width: 250,
              marginRight: "70px",
            }}
            src={category.image}
          />

          <BoxContainerViewLabel
            title={t("delivery_areasPage.id")}
            value={category.id}
          />

          <BoxContainerViewLabel
            title={t("delivery_areasPage.id")}
            value={category.name.ar}
          />

          <BoxContainerViewLabel
            title={t("delivery_areasPage.id")}
            value={category.name.en}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ViewDeliveryAreaModal;
