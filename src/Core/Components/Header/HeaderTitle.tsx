import { Typography, Toolbar , useTheme } from "@mui/material";

interface HeaderTitleProps {
  title: string;
}

const HeaderTitle = ({ title }: HeaderTitleProps) => {
  const theme = useTheme();
  return (
    <Toolbar>
      <Typography
        style={{ color: theme.palette.primary.dark }}
        fontWeight={"bold"}
        variant="h6"
      >
        {title}
      </Typography>
    </Toolbar>
  );
};

export default HeaderTitle;
