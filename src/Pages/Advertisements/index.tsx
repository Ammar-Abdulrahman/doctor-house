import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import useAdvertisements from "@Hooks/useAdvertisements";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { Advertisement, AdvertisementsRequest } from "@Types/Advertisements";
import PageLoader from "@Components/Loader/PageLoader";
import ConfirmationModal from "@Components/Modal/ConfirmationModal";
import CustomModal from "@Components/Modal/CreateModal";
import AddButton from "@Components/Button/Add";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import theme from "@Styles/theme";
import AdvertisementsForm from "./Components/AdvertisementsForm";
import ViewAdvertisementModal from "./Components/ViewAdvertisementModal";
import ViewModal from "@Components/Modal/ViewModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RefreshIcon from "@mui/icons-material/Refresh";
//import EditDiscountForm from "./Components/EditDiscountForm";
//import ViewModal from "@Components/Modal/ViewModal";

const Advertisements: React.FC = () => {
  const {
    getAdvertisements,
    getAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,
    createAdvertisement,
  } = useAdvertisements();
  const { data, isLoading, isError, error, refetch } = getAdvertisements();
  const { t, i18n } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<Advertisement | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [currentAdvertisement, setCurrentAdvertisement] =
    useState<Advertisement | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setCurrentId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRefetch = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  const handleDeleteClick =
    (id: number) => (event: React.MouseEvent<HTMLElement>) => {
      setOpenModal(true);
      handleDelete();
    };

  const handleDelete = () => {
    //setCurrentId(id);
    //console.log(id)
    setOpenModal(true);
    handleMenuClose();
  };

  const handleViewClick =
    (id: number) => (event: React.MouseEvent<HTMLElement>) => {
      handleView();
    };

  const handleView = () => {
    //setCurrentId(id);
    setOpenViewModal(true);
    handleMenuClose();
  };

  useEffect(() => {
    if (currentId !== null && openViewModal) {
      getAdvertisement(currentId).then((response) => {
        setCurrentAdvertisement(response.data);
      });
    }
  }, [currentId]);

  const handleEditClick =
    (id: number) => (event: React.MouseEvent<HTMLElement>) => {
      handleEdit(id);
    };

  const handleEdit = (id: number) => {
    const advertisement =
      data?.data.find(
        (advertisement: Advertisement) => advertisement.id === id
      ) || null;
    setEditData(advertisement);
    setEditModalOpen(true);
  };

  const confirmDelete = () => {
    if (currentId != null) {
      deleteAdvertisement.mutate(currentId, {
        onSuccess: () => {
          setOpenModal(false);
          setCurrentId(null);
        },
      });
    }
  };

  const handleAddClick = () => {
    setModalOpen(true);
  };

  const handleFormSubmit = async (formData: AdvertisementsRequest) => {
    setSubmitting(true);
    try {
      createAdvertisement.mutate(formData);
      setModalOpen(false);
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading || isRefetching) return <PageLoader />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6} md={8}>
          <HeaderTitle title={t("homePage.advertisements")} />
        </Grid>
        <Grid item xs={6} md={1.5}>
          <Grid container alignItems="center">
            <Grid item xs={3} md={7.5}>
              <AddButton
                requiredPermission="createAd"
                onClickFunction={handleAddClick}
              />
            </Grid>
            <Grid item xs={3} md={1}>
              <IconButton onClick={handleRefetch}>
                <RefreshIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid style={{ margin: "5px" }} container spacing={3}>
        {data?.data.map((advertisement: Advertisement) => (
          <Grid item key={advertisement.id} xs={12} md={4}>
            <Card
              style={{
                boxShadow: "1px 1px 3px 1px #B3B3B3",
                borderRadius: 20,
              }}
            >
              <CardActions style={{ position: "inherit" }}>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={(event) => {
                    handleMenuOpen(event, advertisement.id);
                    setCurrentId(advertisement.id);
                    setCurrentAdvertisement(advertisement);
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  style={{
                    direction: i18n.language === "ar" ? "rtl" : "ltr",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <MenuItem
                    style={{
                      color: theme.palette.warning.main,
                      margin: theme.spacing(1),
                      marginLeft:
                        i18n.language === "ar" ? theme.spacing(2) : "",
                      marginRight:
                        i18n.language === "ar" ? "" : theme.spacing(2),
                    }}
                    onClick={handleEditClick(currentId || 0)}
                  >
                    <EditIcon
                      style={{
                        marginRight: i18n.language === "ar" ? "" : "12px",
                        marginLeft: i18n.language === "ar" ? "12px" : "",
                      }}
                    />{" "}
                    {t("actions.edit")}
                  </MenuItem>
                  <MenuItem
                    style={{
                      color: theme.palette.primary.main,
                      margin: theme.spacing(1),
                      marginLeft:
                        i18n.language === "ar" ? theme.spacing(2) : "",
                      marginRight:
                        i18n.language === "ar" ? "" : theme.spacing(2),
                    }}
                    onClick={handleViewClick(currentId || 0)}
                  >
                    <VisibilityIcon
                      style={{
                        marginRight: i18n.language === "ar" ? "" : "12px",
                        marginLeft: i18n.language === "ar" ? "12px" : "",
                      }}
                    />{" "}
                    {t("actions.view")}
                  </MenuItem>
                  <MenuItem
                    style={{
                      color: theme.palette.error.main,
                      margin: theme.spacing(1),
                      marginLeft:
                        i18n.language === "ar" ? theme.spacing(2) : "",
                      marginRight:
                        i18n.language === "ar" ? "" : theme.spacing(2),
                    }}
                    onClick={handleDeleteClick(currentId || 0)}
                  >
                    <DeleteIcon
                      style={{
                        marginRight: i18n.language === "ar" ? "" : "12px",
                        marginLeft: i18n.language === "ar" ? "12px" : "",
                      }}
                    />
                    {t("actions.delete")}
                  </MenuItem>
                </Menu>
              </CardActions>
              <CardMedia
                style={{
                  //height: "25%",
                  display: "flex",
                  justifyContent: "center",
                  marginRight: i18n.language === "ar" ? "100px" : "",
                  marginLeft: i18n.language === "en" ? "50px" : "",
                  marginTop: "10px",
                  height: "150px",
                  width: "230px",
                  //width: "25%",
                }}
                component="img"
                image={advertisement.image}
                alt={advertisement.url}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  style={{ marginRight: "90px" }}
                >
                  {advertisement.url}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  style={{ marginRight: "90px" }}
                >
                  {i18n.language === "ar"
                    ? advertisement.description.ar
                    : advertisement.description.en}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  <ul>
                    {category?.subcategories
                      ? category?.subcategories?.map((sub) => (
                          <span key={sub.id}> {sub.name}</span>
                        ))
                      : ""}
                  </ul>
                </Typography> */}
              </CardContent>
              {/* <CardActions style={{ justifyContent: "center" }}>
                <Button
                  style={{
                    backgroundColor: theme.palette.warning.dark, borderColor :theme.palette.warning.dark , marginLeft:"7px", 
                    color: "white",
                  }}
                  variant="outlined"
                  size="small"
                  onClick={() => setOpenModal(true)}
                >
                  <EditIcon />
                </Button>
                <Button
                  style={{
                    color: "white",
                    backgroundColor: theme.palette.error.main,
                    borderColor: theme.palette.error.main,
                  }}
                  variant="outlined"
                  size="small"
                  onClick={() => handleDelete(category.id)}
                >
                  <DeleteIcon />
                </Button>
                <Button
                  variant="text"
                  size="small"
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                  }}
                  onClick={() => handleView(category.id)}
                >
                  <VisibilityIcon />
                </Button>
              </CardActions> */}
            </Card>
          </Grid>
        ))}
      </Grid>

      <CustomModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSubmitting(false);
        }}
        title={t("modal.create_advertisement")}
        onSubmit={handleFormSubmit}
      >
        <AdvertisementsForm
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
          onClose={() => {
            setModalOpen(false);
            setSubmitting(false);
          }}
        />
      </CustomModal>

      <ViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        title={t("modal.view_advertisement")}
      >
        <ViewAdvertisementModal advertisement={currentAdvertisement} />
      </ViewModal>

      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmDelete}
        title={t("modal.advertisement")}
        itemId={currentId || 0}
      />
    </div>
  );
};

export default Advertisements;
