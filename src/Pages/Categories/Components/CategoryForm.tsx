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
import { CategoryRequest } from "@Types/Categories";

interface CategoryFormProps {
  onSubmit: (formData: CategoryRequest) => void;
  isSubmitting: boolean;
  onClose?: () => void;
}

const CategoryForm = ({
  onSubmit,
  isSubmitting,
  onClose,
}: CategoryFormProps) => {
  const { t } = useTranslation();
  const [imageUploading, setImageUploading] = useState(false);
  const theme = useTheme()

  const formik = useFormik({
    initialValues: {
      name: {
        en: "",
        ar: "",
      },
      image: 0,
      subcategories: [
        {
          name: {
            en: "",
            ar: "",
          },
        },
      ],
    },
    validationSchema: Yup.object({
      name: Yup.object({
        en: Yup.string().required(t("validation.required")),
        ar: Yup.string().required(t("validation.required")),
      }),
      subcategories: Yup.array()
        .of(
          Yup.object({
            name: Yup.object({
              en: Yup.string().required(t("validation.required")),
              ar: Yup.string().required(t("validation.required")),
            }),
          })
        )
        .min(1, t("validation.min_subcategories")),
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
          "https://doctor-store.onrender.com/api/v1/upload",
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
      <form onSubmit={formik.handleSubmit} style={{ marginTop: "1px" }}>
        <TextField
          style={{
            margin: theme.spacing(1),
          }}
          id="name.ar"
          name="name.ar"
          label={t("categoriesPage.ar_name")}
          value={formik.values.name.ar}
          onChange={formik.handleChange}
          error={formik.touched.name?.ar && Boolean(formik.errors.name?.ar)}
          helperText={formik.touched.name?.ar && formik.errors.name?.ar}
        />
        <TextField
          style={{
            margin: theme.spacing(1),
          }}
          id="name.en"
          name="name.en"
          label={t("categoriesPage.en_name")}
          value={formik.values.name.en}
          onChange={formik.handleChange}
          error={formik.touched.name?.en && Boolean(formik.errors.name?.en)}
          helperText={formik.touched.name?.en && formik.errors.name?.en}
        />
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
              color: "white",
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(1),
            }}
          >
            {imageUploading ? (
              <CircularProgress size={24} />
            ) : (
              t("categoriesPage.upload_image")
            )}
          </Button>
        </label>
        {formik.values.image !== 0 && (
          <Typography variant="body2" color="textSecondary">
            {t("categoriesPage.image_uploaded")}
          </Typography>
        )}
        <FieldArray name="subcategories">
          {({ remove, push }) => (
            <div>
              {formik.values.subcategories.map((subcategory, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}
                >
                  <TextField
                    style={{ margin: theme.spacing(1) }}
                    fullWidth
                    id={`subcategories.${index}.name.ar`}
                    name={`subcategories.${index}.name.ar`}
                    label={t("categoriesPage.subcategory_name_ar")}
                    value={formik.values.subcategories[index].name.ar}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.subcategories?.[index]?.name?.ar &&
                      Boolean(formik.errors.subcategories?.[index]?.toString())
                    }
                    helperText={
                      formik.touched.subcategories?.[index]?.name?.ar &&
                      formik.errors.subcategories?.[index]?.toString()
                    }
                  />
                  <TextField
                    style={{ margin: theme.spacing(1) }}
                    fullWidth
                    id={`subcategories.${index}.name.en`}
                    name={`subcategories.${index}.name.en`}
                    label={t("categoriesPage.subcategory_name_en")}
                    value={formik.values.subcategories[index].name.en}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.subcategories?.[index]?.name?.en &&
                      Boolean(formik.errors.subcategories?.[index]?.toString())
                    }
                    helperText={
                      formik.touched.subcategories?.[index]?.name &&
                      formik.errors.subcategories?.[index]?.toString()
                    }
                  />
                  <IconButton
                    onClick={() => remove(index)}
                    disabled={formik.values.subcategories.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                type="button"
                style={{ color: "white" }}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() =>
                  push({
                    id: 0,
                    name: {
                      en: "",
                      ar: "",
                    },
                  })
                }
              >
                {t("actions.add")}
              </Button>
            </div>
          )}
        </FieldArray>
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

export default CategoryForm;
