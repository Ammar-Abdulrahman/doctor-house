import { t } from "i18next";
import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  userName: Yup.string().required(t("discountsPage.codeValidation")),
  password: Yup.string().required(t("discountsPage.fromValidation")),
});
