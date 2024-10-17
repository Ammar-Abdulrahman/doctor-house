import { useThemeContext } from "@Context/ThemeContext";
import useStyles from "@Styles/sharedStyles";
import { Box, Typography } from "@mui/material";

interface BoxContainerProps {
  title?: string;
  value?: any;
}
const BoxContainerViewLabel: React.FC<BoxContainerProps> = ({
  title,
  value,
}) => {
  const classes = useStyles();
  const { mode } = useThemeContext();
  return (
    <Box component="fieldset" className={classes.textFieldStyle}>
      <Typography
        component="legend"
        sx={{
          backgroundColor:
            mode === "light"
              ? "#fff"
              : //  "#191616"
                "#161313",
        }}
        className={classes.labelStyle}
      >
        {title}
      </Typography>
      <Typography className={classes.valueStyle}>{value}</Typography>
    </Box>
  );
};

export default BoxContainerViewLabel;
