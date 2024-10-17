import { useFormik, FormikProvider, FieldArray } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  CircularProgress,
  IconButton,
  Grid,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState } from "react";
//import theme from "@Styles/theme";
import { ProductsRequest, ProductVariant, ProductSku } from "@Types/Products";

interface ProductFormProps {
  onSubmit: (formData: ProductsRequest) => void;
  isSubmitting: boolean;
  onClose?: () => void;
}

const ProductForm = ({ onSubmit, isSubmitting, onClose }: ProductFormProps) => {
  const { t } = useTranslation();
  const [imageUploading, setImageUploading] = useState(false);
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      name: {
        en: "",
        ar: "",
      },
      description: {
        en: "",
        ar: "",
      },
      price: 0,
      image: 0,
      subcategory: 0,
      variants: [],
      stockKeepUnits: [],
    },
    validationSchema: Yup.object({
      name: Yup.object({
        en: Yup.string().required("English Name is Required"),
        ar: Yup.string().required("Arabic Name is Required"),
      }),
      //   name: Yup.string().required(t("validation.required")),
      //   description: Yup.string().required(t("validation.required")),
      //   price: Yup.number().required(t("validation.required")),
      //   subcategory: Yup.number().required(t("validation.required")),
    }),
    onSubmit: (values, { setSubmitting }) => {
      try {
        onSubmit(values);
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name);
      setImageUploading(true);
      try {
        const response = await axios.post(
          "http://192.168.43.208:3000/api/v1/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        const imageId = response.data.data.id;
        formik.setFieldValue("image", imageId);
      } catch (error) {
        console.error("Image upload error:", error);
      } finally {
        setImageUploading(false);
      }
    }
  };

  const handleSkuImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name);
      setImageUploading(true);
      try {
        const response = await axios.post(
          "https://doctor-store.onrender.com/api/v1/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        const imageId = response.data.data.id;
        formik.setFieldValue(field, imageId);
      } catch (error) {
        console.error("Image upload error:", error);
      } finally {
        setImageUploading(false);
      }
    }
  };

  console.log(formik.values);
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} style={{ marginTop: "3px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <TextField
              fullWidth
              style={{
                margin: "5px",
              }}
              id="name.en"
              name="name.en"
              label={t("productsPage.name_en")}
              value={formik.values.name.en}
              onChange={formik.handleChange}
              error={formik.touched.name?.en && Boolean(formik.errors.name?.en)}
              helperText={formik.touched.name?.en && formik.errors.name?.en}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              fullWidth
              style={{
                margin: "5px",
              }}
              id="name.ar"
              name="name.ar"
              label={t("productsPage.name_ar")}
              value={formik.values.name.ar}
              onChange={formik.handleChange}
              error={formik.touched.name?.ar && Boolean(formik.errors.name?.ar)}
              helperText={formik.touched.name?.ar && formik.errors.name?.ar}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <TextField
              fullWidth
              style={{
                margin: "5px",
              }}
              id="description.ar"
              name="description.ar"
              label={t("productsPage.desciption_ar")}
              value={formik.values.description.ar}
              onChange={formik.handleChange}
              error={
                formik.touched.description?.ar &&
                Boolean(formik.errors.description?.ar)
              }
              helperText={
                formik.touched.description?.ar && formik.errors.description?.ar
              }
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              fullWidth
              style={{
                margin: "5px",
              }}
              id="description.en"
              name="description.en"
              label={t("productsPage.desciption_en")}
              value={formik.values.description.en}
              onChange={formik.handleChange}
              error={
                formik.touched.description?.en &&
                Boolean(formik.errors.description?.en)
              }
              helperText={
                formik.touched.description?.en && formik.errors.description?.en
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <TextField
              style={{ margin: "5px" }}
              fullWidth
              id="subcategory"
              name="subcategory"
              label={t("productsPage.subcategory")}
              type="number"
              value={formik.values.subcategory}
              onChange={formik.handleChange}
              error={
                formik.touched.subcategory && Boolean(formik.errors.subcategory)
              }
              helperText={
                formik.touched.subcategory && formik.errors.subcategory
              }
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload"
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="image-upload">
              <Button
                sx={{ margin: "5px", height: "55px" }}
                fullWidth
                variant="contained"
                component="span"
                color="primary"
                disabled={imageUploading}
                style={{
                  color: "white",
                  marginTop: theme.spacing(1),
                  marginBottom: theme.spacing(1),
                }}
              >
                {imageUploading ? (
                  <CircularProgress size={24} />
                ) : (
                  t("productsPage.image")
                )}
              </Button>
            </label>
            {formik.values.image !== 0 && (
              <Typography variant="body2" color="textSecondary">
                {t("productsPage.image")}
              </Typography>
            )}
          </Grid>
        </Grid>

        <FieldArray
          name="variants"
          render={(arrayHelpers) => (
            <div>
              <Button
                type="button"
                onClick={() =>
                  arrayHelpers.push({ name: "", values: [""], type: "" })
                }
              >
                {t("productsPage.variants")}
              </Button>
              {formik.values.variants.map((variant, index) => (
                <div key={index}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <TextField
                        fullWidth
                        style={{ margin: "5px" }}
                        name={`variants.${index}.name.ar`}
                        label={t("productsPage.variant_name.ar")}
                        value={variant.name.ar}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <TextField
                        fullWidth
                        style={{ margin: "5px" }}
                        name={`variants.${index}.name.en`}
                        label={t("productsPage.variant_name.en")}
                        value={variant.name.en}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      style={{ margin: "5px" }}
                      name={`variants.${index}.type`}
                      label={t("productsPage.variant_type")}
                      value={variant.type}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <FieldArray
                    name={`variants.${index}.values`}
                    render={(valuesHelpers) => (
                      <div>
                        <Button
                          type="button"
                          onClick={() => valuesHelpers.push("")}
                        >
                          {t("productsPage.add_variant_values")}
                        </Button>
                        {variant.values.map((value, valueIndex) => (
                          <div key={valueIndex}>
                            <TextField
                              style={{ margin: "5px", width: "480px" }}
                              name={`variants.${index}.values.${valueIndex}`}
                              label={t("productsPage.values")}
                              value={value}
                              onChange={formik.handleChange}
                            />
                            <IconButton
                              type="button"
                              onClick={() => valuesHelpers.remove(valueIndex)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                  <IconButton
                    type="button"
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          )}
        />

        <FieldArray
          name="stockKeepUnits"
          render={(arrayHelpers) => (
            <div>
              <Button
                type="button"
                onClick={() =>
                  arrayHelpers.push({
                    variants: [{ name: "", value: "" }],
                    image: 0,
                    price: 0,
                    quantity: 0,
                  })
                }
              >
                {t("productForm.add_sku")}
              </Button>
              {formik.values.stockKeepUnits.map((sku, index) => (
                <div key={index}>
                  <FieldArray
                    name={`stockKeepUnits.${index}.variants`}
                    render={(variantsHelpers) => (
                      <div>
                        <Button
                          type="button"
                          onClick={() =>
                            variantsHelpers.push({ name: "", value: "" })
                          }
                        >
                          {t("productForm.add_sku_variant")}
                        </Button>
                        {sku.variants.map((variant, variantIndex) => (
                          <div key={variantIndex}>
                            <Grid container spacing={2}>
                              <Grid item xs={6} md={6}>
                                <TextField
                                  fullWidth
                                  style={{ margin: "5px" }}
                                  name={`stockKeepUnits.${index}.variants.${variantIndex}.name`}
                                  label={t("productForm.sku_variant_name")}
                                  value={variant.name}
                                  onChange={formik.handleChange}
                                />
                              </Grid>
                              <Grid item xs={6} md={6}>
                                <TextField
                                  fullWidth
                                  style={{ margin: "5px" }}
                                  name={`stockKeepUnits.${index}.variants.${variantIndex}.value`}
                                  label={t("productForm.sku_variant_value")}
                                  value={variant.value}
                                  onChange={formik.handleChange}
                                />
                              </Grid>
                            </Grid>

                            <IconButton
                              type="button"
                              onClick={() =>
                                variantsHelpers.remove(variantIndex)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <TextField
                        fullWidth
                        style={{ margin: "5px" }}
                        name={`stockKeepUnits.${index}.price`}
                        label={t("productForm.sku_price")}
                        type="number"
                        value={sku.price}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <TextField
                        fullWidth
                        style={{ margin: "5px" }}
                        name={`stockKeepUnits.${index}.quantity`}
                        label={t("productForm.sku_quantity")}
                        type="number"
                        value={sku.quantity}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                  </Grid>

                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id={`sku-image-upload-${index}`}
                    type="file"
                    onChange={(event) =>
                      handleSkuImageUpload(
                        event,
                        `stockKeepUnits.${index}.image`
                      )
                    }
                  />
                  <label htmlFor={`sku-image-upload-${index}`}>
                    <Button
                      variant="contained"
                      component="span"
                      color="primary"
                      disabled={imageUploading}
                      style={{
                        color: "white",
                        marginTop: theme.spacing(1),
                        marginBottom: theme.spacing(1),
                      }}
                    >
                      {imageUploading ? (
                        <CircularProgress size={24} />
                      ) : (
                        t("productForm.upload_image")
                      )}
                    </Button>
                  </label>
                  {formik.values.stockKeepUnits[index].image !== 0 && (
                    <Typography variant="body2" color="textSecondary">
                      {t("productForm.image_uploaded")}
                    </Typography>
                  )}
                  <IconButton
                    type="button"
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          )}
        />

        <Button
          style={{
            color: "white",
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
          }}
          color="primary"
          variant="contained"
          type="submit"
          disabled={isSubmitting || formik.isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : t("modal.submit")}
        </Button>
        <Button
          style={{
            margin: theme.spacing(1),
          }}
          color="primary"
          type="submit"
          disabled={isSubmitting || formik.isSubmitting}
          onClick={onClose}
        >
          {t("modal.cancel")}
        </Button>
      </form>
    </FormikProvider>
  );
};

export default ProductForm;
