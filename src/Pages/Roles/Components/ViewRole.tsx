import React from "react";
import { Role } from "@Types/Roles";
import theme from "@Styles/theme";
import { useTranslation } from "react-i18next";

interface ViewRoleModalProps {
  role: Role | null;
}

const roleTitle = {
  marginTop: theme.spacing(4),
};

const rolePrivileges = {
  listStyleType: "none",
  padding: 0,
  "& li": {
    marginBottom: theme.spacing(1),
  },
};

const ViewRoleModal: React.FC<ViewRoleModalProps> = ({ role }) => {
  const { i18n } = useTranslation();
  return (
    <>
      {role ? (
        <>
          <h2 style={roleTitle}>
            {i18n.language === "ar" ? role.name.ar : role.name.en}
          </h2>
          <ul style={rolePrivileges}>
            {role.privileges?.map((privilege) => (
              <li key={privilege.id}>{privilege.name.en}</li>
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
