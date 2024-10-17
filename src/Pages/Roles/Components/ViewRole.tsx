import React from "react";
import { Role } from "@Types/Roles";
import { lightTheme } from "@Styles/theme";
import { useTranslation } from "react-i18next";
import { useLocale } from "@Context/LanguageContext";

interface ViewRoleModalProps {
  role: Role | null;
}

const roleTitle = {
  marginTop: lightTheme.spacing(4),
};

const rolePrivileges = {
  listStyleType: "none",
  padding: 0,
  "& li": {
    marginBottom: lightTheme.spacing(1),
  },
};

const ViewRoleModal: React.FC<ViewRoleModalProps> = ({ role }) => {
  const { locale } = useLocale();
  return (
    <>
      {role ? (
        <>
          <h2 style={roleTitle}>
            {locale === "ar" ? role.name.ar : role.name.en}
          </h2>
          <ul style={rolePrivileges}>
            {role.privileges?.map((privilege) => (
              <li key={privilege.id}>
                {locale === "ar" ? privilege.name.ar : privilege.name.en}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ViewRoleModal;
