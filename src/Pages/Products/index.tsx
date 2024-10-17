import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import HeaderTitle from "@Components/Header/HeaderTitle";
import { Product } from "@Types/Products";
import PageLoader from "@Components/Loader/PageLoader";
import ConfirmationModal from "@Components/Modal/ConfirmationModal";
import CustomModal from "@Components/Modal/CreateModal";
import AddButton from "@Components/Button/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
//import theme from "@Styles/theme";
import ProductForm from "./Components/ProductForm";
//import ViewProductModal from "./Components/ViewProductModal";
import ViewModal from "@Components/Modal/ViewModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RefreshIcon from "@mui/icons-material/Refresh";
import useProductsContainer from "./Container/useProductsContainer";
import { useLocale } from "@Context/LanguageContext";
//import EditDiscountForm from "./Components/EditDiscountForm";
//import ViewModal from "@Components/Modal/ViewModal";

const Products: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { locale } = useLocale();
  const {
    data,
    isError,
    isLoading,
    isRefetching,
    isSubmitting,
    confirmDelete,
    currentProduct,
    currentId,
    error,
    handleAddClick,
    handleDeleteClick,
    handleEditClick,
    handleFormSubmit,
    handleMenuClose,
    handleMenuOpen,
    handleRefetch,
    handleViewClick,
    anchorEl,
    setCurrentProduct,
    setCurrentId,
    setModalOpen,
    setOpenModal,
    setOpenViewModal,
    setSubmitting,
    modalOpen,
    openModal,
    openViewModal,
  } = useProductsContainer();

  if (isLoading || isRefetching) return <PageLoader />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ direction: locale === "ar" ? "rtl" : "ltr" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6} md={8}>
          <HeaderTitle title={t("homePage.products")} />
        </Grid>
        <Grid item xs={6} md={1.5}>
          <Grid container alignItems="center">
            <Grid item xs={3} md={7.5}>
              <AddButton
                requiredPermission="createProduct"
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
        {data?.data.map((product: Product) => (
          <Grid item key={product.id} xs={12} md={4}>
            <Card
              style={{
                boxShadow: "1px 1px 3px 1px #B3B3B3",
                borderRadius: 20,
                //width: "300px",
                //height: "300px",
              }}
            >
              <CardActions style={{ position: "inherit" }}>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={(event) => {
                    handleMenuOpen(event, product.id);
                    setCurrentId(product.id);
                    setCurrentProduct(product);
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
                    direction: locale === "ar" ? "rtl" : "ltr",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <MenuItem
                    style={{
                      color: theme.palette.warning.main,
                      margin: theme.spacing(1),
                      marginLeft: locale === "ar" ? theme.spacing(2) : "",
                      marginRight: locale === "ar" ? "" : theme.spacing(2),
                    }}
                    onClick={handleEditClick(currentId || 0)}
                  >
                    <EditIcon
                      style={{
                        marginRight: locale === "ar" ? "" : "12px",
                        marginLeft: locale === "ar" ? "12px" : "",
                      }}
                    />{" "}
                    {t("actions.edit")}
                  </MenuItem>
                  <MenuItem
                    style={{
                      color: theme.palette.primary.main,
                      margin: theme.spacing(1),
                      marginLeft: locale === "ar" ? theme.spacing(2) : "",
                      marginRight: locale === "ar" ? "" : theme.spacing(2),
                    }}
                    onClick={handleViewClick(currentId || 0)}
                  >
                    <VisibilityIcon
                      style={{
                        marginRight: locale === "ar" ? "" : "12px",
                        marginLeft: locale === "ar" ? "12px" : "",
                      }}
                    />{" "}
                    {t("actions.view")}
                  </MenuItem>
                  <MenuItem
                    style={{
                      color: theme.palette.error.main,
                      margin: theme.spacing(1),
                      marginLeft: locale === "ar" ? theme.spacing(2) : "",
                      marginRight: locale === "ar" ? "" : theme.spacing(2),
                    }}
                    onClick={handleDeleteClick(currentId || 0)}
                  >
                    <DeleteIcon
                      style={{
                        marginRight: locale === "ar" ? "" : "12px",
                        marginLeft: locale === "ar" ? "12px" : "",
                      }}
                    />
                    {t("actions.delete")}
                  </MenuItem>
                </Menu>
              </CardActions>
              <CardMedia
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginRight: locale === "ar" ? "150px" : "",
                  marginLeft: locale === "en" ? "150px" : "",

                  marginTop: "10px",
                  height: "150px",
                  width: "150px",
                }}
                component="img"
                image={product.image}
                alt={locale === "ar" ? product.name.ar : product.name.en}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  style={{
                    marginRight: locale === "en" ? "130px" : "",
                    marginLeft: locale === "en" ? "50px" : "",
                  }}
                >
                  {locale === "ar" ? product.name.ar : product.name.en}{" "}
                </Typography>
              </CardContent>
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
        title={t("modal.create_product")}
        onSubmit={handleFormSubmit}
      >
        <ProductForm
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
          onClose={() => {
            setModalOpen(false);
            setSubmitting(false);
          }}
        />
      </CustomModal>

      {/* <ViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        title={t("modal.view_product")}
      >
        <ViewProductModal product={currentProduct} />
      </ViewModal> */}

      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmDelete}
        title={t("modal.product")}
        itemId={currentId || 0}
      />
    </div>
  );
};

export default Products;
