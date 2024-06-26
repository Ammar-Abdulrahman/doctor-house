import { labelStyle, textFieldStyle, valueStyle } from "@Styles/sharedStyles";
import { Box, Typography } from "@mui/material";

interface BoxContainerProps {
  title?: string;
  value?: any;
}
const BoxContainer: React.FC<BoxContainerProps> = ({ title, value }) => {
  return (
    <Box component="fieldset" sx={textFieldStyle}>
      <Typography component="legend" sx={labelStyle}>
        {title}
      </Typography>
      <Typography style={valueStyle}>{value}</Typography>
    </Box>
  );
};

export default BoxContainer;
