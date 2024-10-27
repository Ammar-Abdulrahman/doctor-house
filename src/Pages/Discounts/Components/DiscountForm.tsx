import { useFormik } from "formik";
import {
  TextField,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  InputLabel,
  Select,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Loader from "@Components/Loader/AppLoader";
import useCategories from "@Hooks/useCategories";
import { Category } from "@Types/Categories";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { discountValidationSchema } from "../Helper";
import dayjs from "dayjs";
import { useLocale } from "@Context/LanguageContext";
import { Discount, DiscountsRequest } from "@Types/Discounts";

interface DiscountFormProps {
  onSubmit: (values: any) => void;
  isSubmitting: boolean;
  onClose?: () => void;
  initialValues: DiscountsRequest;
}

const DiscountForm: React.FC<DiscountFormProps> = ({
  onSubmit,
  isSubmitting,
  onClose,
  initialValues,
}) => {
  const { getCategories } = useCategories(false);
  const { data, isLoading } = getCategories();
  const { t } = useTranslation();
  const { locale } = useLocale();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: discountValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await onSubmit(values);
      } catch (error: any) {
        console.error("Submission error:", error);
        toast.error(error?.error?.message);
      } finally {
        setSubmitting(false);
      }
    },
    validateOnMount: true,
  });

  if (isLoading) return <Loader />;
  console.log(isSubmitting);

  return (
    <form
      style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        sx={{ mt: 1, mb: 1 }}
        variant="filled"
        fullWidth
        id="code"
        name="code"
        label={t("discountsPage.code")}
        value={formik.values.code}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.code && Boolean(formik.errors.code)}
        helperText={formik.touched.code && formik.errors.code}
      />
      <DatePicker
        sx={{ mt: 1, mb: 1 }}
        label={t("discountsPage.from")}
        value={
          formik.values.from ? dayjs(formik.values.from, "YYYY-MM-DD") : null
        }
        onChange={(date) =>
          formik.setFieldValue(
            "from",
            date ? dayjs(date).format("YYYY-MM-DD") : ""
          )
        }
        format="DD-MM-YYYY"
        slotProps={{
          textField: {
            fullWidth: true,
            variant: "filled",
            error: Boolean(formik.touched.from && formik.errors.from),
            helperText:
              formik.touched.from && formik.errors.from
                ? String(formik.errors.from)
                : "",
            InputLabelProps: { shrink: true },
          },
        }}
      />
      <DatePicker
        sx={{ mt: 1, mb: 1 }}
        label={t("discountsPage.to")}
        value={formik.values.to ? dayjs(formik.values.to, "YYYY-MM-DD") : null}
        onChange={(date) =>
          formik.setFieldValue(
            "to",
            date ? dayjs(date).format("YYYY-MM-DD") : ""
          )
        }
        format="DD-MM-YYYY"
        slotProps={{
          textField: {
            fullWidth: true,
            variant: "filled",
            error: Boolean(formik.touched.to && formik.errors.to),
            helperText:
              formik.touched.to && formik.errors.to ? formik.errors.to : "",
            InputLabelProps: { shrink: true },
          },
        }}
      />
      <TextField
        sx={{ mt: 1, mb: 1 }}
        variant="filled"
        fullWidth
        type="number"
        id="percentage"
        name="percentage"
        label={t("discountsPage.percentage")}
        value={formik.values.percentage}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.percentage && Boolean(formik.errors.percentage)}
        helperText={formik.touched.percentage && formik.errors.percentage}
        disabled={!!formik.values.value}
      />
      <TextField
        sx={{ mt: 1, mb: 1 }}
        variant="filled"
        fullWidth
        type="number"
        id="value"
        name="value"
        label={t("discountsPage.value")}
        value={formik.values.value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.value && Boolean(formik.errors.value)}
        helperText={formik.touched.value && formik.errors.value}
        disabled={!!formik.values.percentage}
      />
      <FormControl
        fullWidth
        variant="filled"
        sx={{ mt: 1, mb: 1 }}
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {data?.data?.map((subcategory: Category) => (
            <MenuItem
              key={subcategory.id}
              value={subcategory.subcategories[0].id}
            >
              {locale === "ar"
                ? subcategory.subcategories[0].name.ar
                : subcategory.subcategories[0].name.en}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.subcategory && formik.errors.subcategory && (
          <FormHelperText>{formik.errors.subcategory}</FormHelperText>
        )}
      </FormControl>
      <Grid sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button sx={{ m: 1 }} onClick={onClose} disabled={isSubmitting}>
          {t("modal.cancel")}
        </Button>
        <Button
          sx={{ m: 1, color: "white" }}
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting || !formik.isValid || formik.isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : t("modal.submit")}
        </Button>
      </Grid>
    </form>
  );
};

export default DiscountForm;
