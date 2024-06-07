import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, CircularProgress } from "@mui/material";
import useRoles from "@Hooks/useRoles";
import { Role } from "@Types/Roles";
import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";

interface OperatorFormProps {
  onSubmit?: any;
  isSubmitting?: any;
}
const OperatorForm = ({ onSubmit, isSubmitting }: OperatorFormProps) => {
  const { getRoles } = useRoles(true);
  const { data, isLoading: rolesLoading } = getRoles();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is Required"),
      fullName: Yup.string().required("fullName is Required"),
      password: Yup.string().required("Password is Required"),
      role: Yup.number().required("Role is Required"),
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

  console.log(formik.values);

  if (rolesLoading) return <div>Loading roles...</div>;

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
        id="username"
        name="username"
        label="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />
      <TextField
        fullWidth
        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
        id="fullName"
        name="fullName"
        label="Full Name"
        value={formik.values.fullName}
        onChange={formik.handleChange}
        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
        helperText={formik.touched.fullName && formik.errors.fullName}
      />
      <TextField
        fullWidth
        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
        type="password"
        id="password"
        name="password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <TextField
        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
        fullWidth
        select
        id="role"
        type="number"
        name="role"
        label="Role"
        value={formik.values.role}
        onChange={(e) => formik.setFieldValue("role", e.target.value)}
        SelectProps={{
          native: true,
        }}
      >
        {data?.data?.map((role: Role) => (
          <option key={role.id} value={role.id}>
            {role.name.ar}
          </option>
        ))}
      </TextField>
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

export default OperatorForm;
