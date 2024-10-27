import ActionsMenu from "@Components/MenuItems";
import { Column } from "@Types/Column";
import { t } from "i18next";
import * as Yup from "yup";

export const getDiscountColumns = (
  t: any,
  handleDelete: any,
  handleView: any,
  handleEdit: any
): Column[] => [
  { id: "id", label: t("discountsPage.id"), align: "center" },
  { id: "code", label: t("discountsPage.code"), align: "center" },
  { id: "percentage", label: t("discountsPage.percentage"), align: "center" },
  { id: "value", label: t("discountsPage.value"), align: "center" },
  { id: "from", label: t("discountsPage.from"), align: "center" },
  { id: "to", label: t("discountsPage.to"), align: "center" },
  {
    id: "actions",
    label: t("actions.label"),
    align: "center",
    render: (rowData: any) => (
      <ActionsMenu
        rowData={rowData}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />
    ),
  },
];

export const discountValidationSchema = Yup.object().shape({
  code: Yup.string().required(t("discountsPage.codeValidation")),
  from: Yup.string().required(t("discountsPage.fromValidation")),
  to: Yup.string().required(t("discountsPage.toValidation")),
  percentage: Yup.number()
    .nullable()
    .test(
      t("discountsPage.valuePercentage"),
      t("discountsPage.percentageValidation"),
      function (value) {
        const { value: formValue } = this.parent;
        return !!value || !!formValue;
      }
    )
    .min(1, t("discountsPage.minPercentage"))
    .max(100, t("discountsPage.maxPercentage")),

  value: Yup.number()
    .nullable()
    .test(
      t("discountsPage.valuePercentage"),
      t("discountsPage.valueValidation"),
      function (value) {
        const { percentage } = this.parent;
        return !!value || !!percentage;
      }
    )
    .min(1, t("discountsPage.minValue")),
  subcategory: Yup.number().nullable(),
});
