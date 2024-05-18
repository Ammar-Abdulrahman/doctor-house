import { Typography, Toolbar } from "@mui/material";
import theme from "@Styles/theme";

interface HeaderTitleProps {
  title: string;
}

const HeaderTitle = ({ title }: HeaderTitleProps) => {
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
