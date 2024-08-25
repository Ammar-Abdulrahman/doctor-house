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
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState } from "react";
import theme from "@Styles/theme";
import { AdvertisementsRequest } from "@Types/Advertisements";

interface CategoryFormProps {
  onSubmit: (formData: AdvertisementsRequest) => void;
  isSubmitting: boolean;
  onClose?: () => void;
}

const AdvertisementForm = ({
  onSubmit,
  isSubmitting,
  onClose,
}: CategoryFormProps) => {
  const { t } = useTranslation();
  const [imageUploading, setImageUploading] = useState(false);

  const formik = useFormik({
    initialValues: {
      url: "",
      description: {
        en: "",
        ar: "",
      },
      image: 0,
    },
    validationSchema: Yup.object({}),
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

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={6} md={5}>
            <TextField
              id="url"
              name="url"
              label={t("advertisementsPage.url")}
              value={formik.values.url}
              onChange={formik.handleChange}
              error={formik.touched.url && Boolean(formik.errors.url)}
              helperText={formik.touched.url && formik.errors.url}
              sx={{ margin: "5px" }}
            />
          </Grid>
          <Grid item xs={6} md={5}>
            <TextField
              id="description.ar"
              name="description.ar"
              label={t("advertisementsPage.description_ar")}
              value={formik.values.description.ar}
              onChange={formik.handleChange}
              error={
                formik.touched.description?.ar &&
                Boolean(formik.errors.description?.ar)
              }
              helperText={
                formik.touched.description?.ar && formik.errors.description?.ar
              }
              sx={{ margin: "5px" }}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              id="description.en"
              name="description.en"
              label={t("advertisementsPage.description_en")}
              value={formik.values.description.en}
              onChange={formik.handleChange}
              error={
                formik.touched.description?.en &&
                Boolean(formik.errors.description?.en)
              }
              helperText={
                formik.touched.description?.en && formik.errors.description?.en
              }
              sx={{ margin: "5px" }}
            />
          </Grid>

          <input
            accept="image/*"
            style={{ display: "none" }}
            id="image-upload"
            type="file"
            onChange={handleImageUpload}
          />
          <label htmlFor="image-upload">
            <Button
              variant="contained"
              component="span"
              color="primary"
              disabled={imageUploading}
              style={{
                width: "220px",
                height: "53px",
                color: "white",
                marginRight: "-43px",
                marginTop: "7px",
                marginBottom: theme.spacing(1),
              }}
            >
              {imageUploading ? (
                <CircularProgress size={24} />
              ) : (
                t("advertisementsPage.image")
              )}
            </Button>
          </label>
          {formik.values.image !== 0 && (
            <Typography variant="body2" color="textSecondary">
              {t("categoriesPage.image_uploaded")}
            </Typography>
          )}
        </Grid>
        <Button
          style={{
            color: "white",
            marginTop: theme.spacing(2),
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
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1),
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
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

export default AdvertisementForm;
