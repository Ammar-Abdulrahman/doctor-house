import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Grid, useTheme } from "@mui/material";
import { DeliveryAreasRequest, DeliveryArea } from "@Types/Delivery-areas";
import { useTranslation } from "react-i18next";

interface EditDeliveryAreaFormProps {
  defaultValues: DeliveryArea;
  onSubmit: (data: DeliveryAreasRequest) => void;
  isSubmitting: boolean;
}

const EditDeliveryAreaForm: React.FC<EditDeliveryAreaFormProps> = ({
  defaultValues,
  onSubmit,
  isSubmitting,
}) => {
  const { control, handleSubmit } = useForm<DeliveryAreasRequest>({
    defaultValues,
  });

  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="area.ar"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Arabic Area"
                fullWidth
                style={{
                  marginTop: theme.spacing(1),
                  marginBottom: theme.spacing(1),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="area.en"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="English Area"
                fullWidth
                style={{
                  marginTop: theme.spacing(1),
                  marginBottom: theme.spacing(1),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="time.ar"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Arabic Time"
                fullWidth
                style={{
                  marginTop: theme.spacing(1),
                  marginBottom: theme.spacing(1),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="time.en"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="English Time"
                fullWidth
                style={{
                  marginTop: theme.spacing(1),
                  marginBottom: theme.spacing(1),
                }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            style={{
              color: "white",
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(1),
            }}
          >
            {t("actions.save")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditDeliveryAreaForm;
