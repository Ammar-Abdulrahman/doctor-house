import React from "react";
import { Advertisement } from "@Types/Advertisements";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import Loader from "@Components/Loader/ModalViewLoader";
import BoxContainerViewLabel from "@Components/Box";

interface ViewAdvertisementProps {
  advertisement: Advertisement | null;
}

const ViewAdvertisementModal: React.FC<ViewAdvertisementProps> = ({
  advertisement,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {advertisement ? (
        <div style={{ marginTop: "60px" }}>
          <Box
            component="img"
            sx={{
              height: 250,
              width: 250,
              marginRight: "70px",
            }}
            src={advertisement.image}
          />
          <BoxContainerViewLabel
            title={t("delivery_areasPage.id")}
            value={advertisement.id}
          />
          <BoxContainerViewLabel
            title={t("delivery_areasPage.url")}
            value={advertisement.url}
          />

          <BoxContainerViewLabel
            title={t("delivery_areasPage.id")}
            value={
              advertisement.description?.ar
                ? advertisement.description?.ar
                : "-"
            }
          />

          <BoxContainerViewLabel
            title={t("delivery_areasPage.id")}
            value={
              advertisement.description?.en
                ? advertisement.description?.en
                : "-"
            }
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ViewAdvertisementModal;
