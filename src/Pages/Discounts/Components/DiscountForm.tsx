import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import useCategories from "@Hooks/useCategories";
import { Category } from "@Types/Categories";
import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";

interface OperatorFormProps {
  onSubmit?: any;
  isSubmitting?: any;
}
const DiscountForm = ({ onSubmit, isSubmitting }: OperatorFormProps) => {
  const { getCategories } = useCategories(false);
  const { data, isLoading} = getCategories();
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      code: "",
      from: "",
      to: "",
      subcategory: "",
      percentage:""
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Discount Code is Required"),
      from: Yup.string().required("start date is Required"),
      to: Yup.string().required("end date is Required"),
      subcategory: Yup.number().required("subcategory is Required"),
      percentage: Yup.number().required("Percentage is Required"),
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

  console.log(formik.values)

  if (isLoading) return <div>Loading Subcategories...</div>;

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        style={{marginTop:theme.spacing(1),marginBottom:theme.spacing(1) }}
        id="code"
        name="code"
        label="Discount Code"
        value={formik.values.code}
        onChange={formik.handleChange}
        error={formik.touched.code && Boolean(formik.errors.code)}
        helperText={formik.touched.code && formik.errors.code}
      />
      <TextField
        fullWidth
        style={{marginTop:theme.spacing(1),marginBottom:theme.spacing(1)}}
        id="from"
        name="from"
        type="date"
        label="Start Date"
        value={formik.values.from}
        onChange={formik.handleChange}
        error={formik.touched.from && Boolean(formik.errors.from)}
        helperText={formik.touched.from && formik.errors.from}
      />
      <TextField
        fullWidth
        style={{marginTop:theme.spacing(1),marginBottom:theme.spacing(1)}}
        type="date"
        id="to"
        name="to"
        label="End Date"
        value={formik.values.to}
        onChange={formik.handleChange}
        error={formik.touched.to && Boolean(formik.errors.to)}
        helperText={formik.touched.to && formik.errors.to}
      />
      <TextField
      style={{marginTop:theme.spacing(1),marginBottom:theme.spacing(1)}}
        fullWidth
        select
        id="subcategory"
        type="number"
        name="subcategory"
        label="Sub Category"
        value={formik.values.subcategory}
        onChange={(e) => formik.setFieldValue("subcategory", e.target.value)}
        SelectProps={{
          native: true,
        }}
      >
        {data?.data?.map((subcategory:Category) => (
          <option key={subcategory.id} value={subcategory.subcategories[0].id}>
            {subcategory.subcategories[0].name}
          </option>
        ))}
      </TextField>
      <TextField
        fullWidth
        type="number"
        style={{marginTop:theme.spacing(1),marginBottom:theme.spacing(1)}}
        id="percentage"
        name="percentage"
        label="Percentage"
        value={formik.values.percentage}
        onChange={formik.handleChange}
        error={formik.touched.percentage && Boolean(formik.errors.percentage)}
        helperText={formik.touched.percentage && formik.errors.percentage}
      />
      <Button
        style={{color:"white" , marginTop:theme.spacing(1),marginBottom:theme.spacing(1)}}
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

export default DiscountForm;
