import { Skeleton, useTheme } from "@mui/material";

const SkeletonTable = () => {
  const theme = useTheme();
  return (
    <>
      <Skeleton
        sx={{ marginRight: theme.spacing(2) }}
        variant="rounded"
        animation="wave"
        width={"100%"}
        height={"40px"}
      />
      <Skeleton
        sx={{ marginRight: theme.spacing(2), marginTop: theme.spacing(1) }}
        variant="rounded"
        animation="pulse"
        width={"100%"}
        height={"150px"}
      />
    </>
  );
};

export default SkeletonTable;
