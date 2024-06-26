import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, CircularProgress } from "@mui/material";
import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";

interface OperatorFormProps {
  onSubmit?: any;
  isSubmitting?: any;
}
const DeliveryAreaForm = ({ onSubmit, isSubmitting }: OperatorFormProps) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      area: {
        en: "",
        ar: "",
      },
      time: {
        en: "",
        ar: "",
      },
    },
    // validationSchema: Yup.object({
    //   area_en: Yup.string().required("English Area is Required"),
    //   area_ar: Yup.string().required("Arabic Area is Required"),
    //   time_en: Yup.string().required("English Time is Required"),
    //   time_ar: Yup.string().required("Arabic Time is Required"),
    // }),
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
        id="area.ar"
        name="area.ar"
        label={t("delivery_areasPage.area_ar")}
        value={formik.values.area.ar}
        onChange={formik.handleChange}
        error={formik.touched.area?.ar && Boolean(formik.errors.area?.ar)}
        helperText={formik.touched.area?.ar && formik.errors.area?.ar}
      />{" "}
      <TextField
        fullWidth
        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
        id="area.en"
        name="area.en"
        label={t("delivery_areasPage.area_en")}
        value={formik.values.area.en}
        onChange={formik.handleChange}
        error={formik.touched.area?.en && Boolean(formik.errors.area?.en)}
        helperText={formik.touched.area?.en && formik.errors.area?.en}
      />
      <TextField
        fullWidth
        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
        id="time.ar"
        name="time.ar"
        label={t("delivery_areasPage.time_ar")}
        value={formik.values.time.ar}
        onChange={formik.handleChange}
        error={formik.touched.time?.ar && Boolean(formik.errors.time?.ar)}
        helperText={formik.touched.time?.ar && formik.errors.time?.ar}
      />
      <TextField
        fullWidth
        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
        id="time.en"
        name="time.en"
        label={t("delivery_areasPage.time_en")}
        value={formik.values.time.en}
        onChange={formik.handleChange}
        error={formik.touched.time?.en && Boolean(formik.errors.time?.en)}
        helperText={formik.touched.time?.en && formik.errors.time?.en}
      />
      <Button
        style={{
          color: "white",
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(1),
        }}
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        disabled={isSubmitting || formik.isSubmitting}
      >
        {isSubmitting ? <CircularProgress size={24} /> : t("modal.submit")}
      </Button>
    </form>
  );
};

export default DeliveryAreaForm;
