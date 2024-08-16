// EditDiscountForm.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Grid } from "@mui/material";
import { DeliveryAreasRequest, DeliveryArea } from "@Types/Delivery-areas";

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="area.ar"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Arabic Area" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="area.en"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="English Area" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="time.ar"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Arabic Time" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="time.en"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="English Time" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditDeliveryAreaForm;
