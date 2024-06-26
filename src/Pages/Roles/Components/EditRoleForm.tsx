import React, { useEffect, useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RoleRequest } from "@Types/Roles";
import usePrivileges from "@Hooks/usePrivileges"; // Create this hook to fetch privileges
import { Privilege } from "@Types/Privileges"; // Create this type for privileges

interface EditRoleFormProps {
  initialValues?: RoleRequest;
  onSubmit: (values: RoleRequest) => void;
  onCancel: () => void;
}

const EditRoleForm: React.FC<EditRoleFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const { t, i18n } = useTranslation();
  const [values, setValues] = useState<RoleRequest>(initialValues || { name: { ar: "", en: "" }, privileges: [] });
  const { data: privileges } = usePrivileges();

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, name: { ...values.name, [name]: value } });
  };

  const handlePrivilegeChange = (id: number) => {
    
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
      <TextField
        label={t("role.name_ar")}
        name="ar"
        value={values.name.ar}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label={t("role.name_en")}
        name="en"
        value={values.name.en}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormGroup>
        {privileges?.data.map((privilege: Privilege) => (
          <FormControlLabel
            key={privilege.id}
            control={
              <Checkbox
                checked={values.privileges.includes(privilege.id)}
                onChange={() => handlePrivilegeChange(privilege.id)}
              />
            }
            label={privilege.name.ar}
          />
        ))}
      </FormGroup>
      <Button type="submit" variant="contained" color="primary">
        {t("common.submit")}
      </Button>
      <Button onClick={onCancel} variant="outlined" style={{ marginLeft: "10px" }}>
        {t("common.cancel")}
      </Button>
    </form>
  );
};

export default EditRoleForm;
