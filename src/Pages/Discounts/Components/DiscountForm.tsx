import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import useCategories from "@Hooks/useCategories";
import { Category } from "@Types/Categories";
import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Loader from "@Components/Loader/AppLoader";

interface OperatorFormProps {
  onSubmit?: any;
  isSubmitting?: any;
  onClose?: () => void;
}
const DiscountForm = ({
  onSubmit,
  isSubmitting,
  onClose,
}: OperatorFormProps) => {
  const { getCategories } = useCategories(false);
  const { data, isLoading } = getCategories();
  const { t, i18n } = useTranslation();

  const formik = useFormik({
    initialValues: {
      code: "",
      from: "",
      to: "",
      subcategory: "",
      percentage: undefined,
      value: undefined,
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Discount Code is Required"),
      from: Yup.string().required("start date is Required"),
      to: Yup.string().required("end date is Required"),
      subcategory: Yup.number().required("subcategory is Required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      try {
        onSubmit(values);
      } catch (error: any) {
        console.error("Submission error:", error);
        toast.error(error?.error?.message);
      } finally {
        setSubmitting(false);
        //toast.success(`${t("modal.success_create_discount")}`);
      }
    },
  });

  if (isLoading) return <Loader />;
  console.log(data.data);

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
        id="code"
        name="code"
        label={t("discountsPage.code")}
        value={formik.values.code}
        onChange={formik.handleChange}
        error={formik.touched.code && Boolean(formik.errors.code)}
        helperText={formik.touched.code && formik.errors.code}
      />
      <TextField
        fullWidth
        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
        id="from"
        name="from"
        type="date"
        InputLabelProps={{ shrink: true }}
        label={t("discountsPage.from")}
        value={formik.values.from}
        onChange={formik.handleChange}
        error={formik.touched.from && Boolean(formik.errors.from)}
        helperText={formik.touched.from && formik.errors.from}
      />
      <TextField
        fullWidth
        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
        type="date"
        id="to"
        name="to"
        InputLabelProps={{ shrink: true }}
        label={t("discountsPage.to")}
        value={formik.values.to}
        onChange={formik.handleChange}
        error={formik.touched.to && Boolean(formik.errors.to)}
        helperText={formik.touched.to && formik.errors.to}
      />
      <FormControl
        fullWidth
        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
        error={formik.touched.subcategory && Boolean(formik.errors.subcategory)}
      >
        <InputLabel id="subcategory-label">
          {t("discountsPage.subcategory")}
        </InputLabel>
        <Select
          labelId="subcategory-label"
          id="subcategory"
          name="subcategory"
          value={formik.values.subcategory}
          onChange={(e) => {
            formik.setFieldValue("subcategory", e.target.value);
          }}
        >
          {data?.data?.map((subcategory: Category) => (
            <MenuItem
              key={subcategory.id}
              value={subcategory.subcategories[0].id}
            >
              {i18n.language === "ar"
                ? subcategory.subcategories[0].name.ar
                : subcategory.subcategories[0].name.en}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.subcategory && formik.errors.subcategory && (
          <FormHelperText>{formik.errors.subcategory}</FormHelperText>
        )}
      </FormControl>
      <TextField
        fullWidth
        type="number"
        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
        id="percentage"
        name="percentage"
        label={t("discountsPage.percentage")}
        value={formik.values.percentage}
        onChange={formik.handleChange}
        error={formik.touched.percentage && Boolean(formik.errors.percentage)}
        //helperText={formik.touched.percentage && formik.errors.percentage}
      />
      <TextField
        fullWidth
        type="number"
        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
        id="value"
        name="value"
        label={t("discountsPage.value")}
        value={formik.values.value}
        onChange={formik.handleChange}
        //error={formik.touched.percentage && Boolean(formik.errors.percentage)}
        //helperText={formik.touched.percentage && formik.errors.percentage}
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
  );
};

export default DiscountForm;
