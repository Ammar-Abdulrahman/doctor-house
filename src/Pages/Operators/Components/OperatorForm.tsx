import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  CircularProgress,
  FormHelperText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import useRoles from "@Hooks/useRoles";
import { Role } from "@Types/Roles";
//import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";
import Loader from "@Components/Loader/AppLoader";

interface OperatorFormProps {
  onSubmit?: any;
  isSubmitting?: any;
  onClose?: () => void;
}
const OperatorForm = ({
  onSubmit,
  isSubmitting,
  onClose,
}: OperatorFormProps) => {
  const { getRoles } = useRoles(true);
  const { data, isLoading: rolesLoading } = getRoles();
  const { t } = useTranslation();
const theme = useTheme()
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

  if (rolesLoading) return <Loader />;

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
        id="username"
        name="username"
        label={t("operatorsPage.username")}
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
        label={t("operatorsPage.fullName")}
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
        label={t("operatorsPage.password")}
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <FormControl
        fullWidth
        style={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
        error={formik.touched.role && Boolean(formik.errors.role)}
      >
        <InputLabel id="role-label">{t("operatorsPage.role")}</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          name="role"
          value={formik.values.role}
          onChange={(e) => {
            formik.setFieldValue("role", e.target.value);
          }}
        >
          {data?.data?.map((role: Role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.name.ar}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.role && formik.errors.role && (
          <FormHelperText>{formik.errors.role}</FormHelperText>
        )}
      </FormControl>
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

export default OperatorForm;
