// EditDiscountForm.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Grid } from "@mui/material";
import { DiscountsRequest, Discount } from "@Types/Discounts";

interface EditDiscountFormProps {
  defaultValues: Discount;
  onSubmit: (data: DiscountsRequest) => void;
  isSubmitting: boolean;
}

const EditDiscountForm: React.FC<EditDiscountFormProps> = ({
  defaultValues,
  onSubmit,
  isSubmitting,
}) => {
  const { control, handleSubmit } = useForm<DiscountsRequest>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Code" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="percentage"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Percentage" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="value"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Value" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="from"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="From" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="to"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="To" fullWidth />
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

export default EditDiscountForm;
