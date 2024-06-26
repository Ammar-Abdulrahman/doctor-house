// RoleForm.tsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TextField, Checkbox, FormControlLabel, Button } from "@mui/material";
//import useRoles from "@Hooks/useRoles";
import { fetchData } from "@Services/apiService";
import { RoleRequest } from "@Types/Roles";
import theme from "@Styles/theme";

interface RoleFormProps {
  onSubmit: (data: RoleRequest) => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ onSubmit }) => {
  const { t, i18n } = useTranslation();
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [privileges, setPrivileges] = useState<number[]>([]);
  const [allPrivileges, setAllPrivileges] = useState<any[]>([]);

  useEffect(() => {
    const fetchPrivileges = async () => {
      const response = await fetchData("/privileges?needPagination=false&type=E-commerce");
      setAllPrivileges(response?.data);
    };
    fetchPrivileges();
  }, []);

  const handleCheckboxChange = (id: number) => {
    setPrivileges((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: {
        ar: nameAr,
        en: nameEn,
      },
      privileges,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}
        label={t("rolesPage.name_ar")}
        value={nameAr}
        onChange={(e) => setNameAr(e.target.value)}
        fullWidth
        required
      />
      <TextField
        style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}
        label={t("rolesPage.name_en")}
        value={nameEn}
        onChange={(e) => setNameEn(e.target.value)}
        fullWidth
        required
      />
      <div>
        {allPrivileges.map((privilege) => (
          <FormControlLabel
            key={privilege.id}
            control={
              <Checkbox
                checked={privileges.includes(privilege.id)}
                onChange={() => handleCheckboxChange(privilege.id)}
              />
            }
            label={privilege.name[i18n.language]}
          />
        ))}
      </div>
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
        //disabled={isSubmitting || formik.isSubmitting}
      >
        {t("modal.submit")}
      </Button>
    </form>
  );
};

export default RoleForm;
