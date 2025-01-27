import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { fetchData } from "@Services/Api/apiService";
import { Role, RoleRequest } from "@Types/Roles";
//import theme from "@Styles/theme";
import { useFormik } from "formik";
import { roleValidationSchema } from "../Helper";
import { useLocale } from "@Context/LanguageContext";

interface RoleFormProps {
  onSubmit: (data: RoleRequest) => void;
  onClose?: () => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ onSubmit, onClose }) => {
  const { t } = useTranslation();
  const [allPrivileges, setAllPrivileges] = useState<any[]>([]);
  const theme = useTheme();
  const { locale } = useLocale();

  useEffect(() => {
    const fetchPrivileges = async () => {
      const response: any = await fetchData(
        "/privileges?needPagination=false&type=E-commerce"
      );
      setAllPrivileges(response?.data);
    };
    fetchPrivileges();
  }, []);

  const formik = useFormik({
    initialValues: {
      nameAr: "",
      nameEn: "",
      privileges: [] as number[],
    },
    validationSchema: roleValidationSchema,
    onSubmit: (values) => {
      onSubmit({
        name: {
          ar: values.nameAr,
          en: values.nameEn,
        },
        privileges: values.privileges,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}
        label={t("rolesPage.name_ar")}
        value={formik.values.nameAr}
        name="nameAr"
        onChange={formik.handleChange}
        fullWidth
        required
      />
      <TextField
        style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}
        label={t("rolesPage.name_en")}
        value={formik.values.nameEn}
        name="nameEn"
        onChange={formik.handleChange}
        fullWidth
        required
      />
      <FormControl fullWidth>
        <InputLabel id="role-label">{t("operatorsPage.role")}</InputLabel>
        <Select
          multiple
          labelId="role-label"
          id="privileges"
          name="privileges"
          value={formik.values.privileges}
          onChange={formik.handleChange}
        >
          {allPrivileges.map((role: Role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.name[locale]}
            </MenuItem>
          ))}
        </Select>
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
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? (
          <CircularProgress size={24} />
        ) : (
          t("modal.submit")
        )}
      </Button>
      <Button
        style={{
          margin: theme.spacing(1),
        }}
        color="primary"
        type="submit"
        disabled={formik.isSubmitting}
        onClick={onClose}
      >
        {t("modal.cancel")}
      </Button>
    </form>
  );
};

export default RoleForm;
