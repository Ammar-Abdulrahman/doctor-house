import { useThemeContext } from "@Context/ThemeContext";
import { Label, Value, StyledBox } from "@Styles/sharedStyles";
import { Box, Typography } from "@mui/material";

interface BoxContainerProps {
  title?: string;
  value?: any;
}
const BoxContainerViewLabel: React.FC<BoxContainerProps> = ({
  title,
  value,
}) => {
  const { mode } = useThemeContext();
  return (
    <StyledBox component="fieldset">
      <Label
        sx={{
          backgroundColor: mode === "light" ? "#fff" : "#161313",
        }}
      >
        {title}
      </Label>
      <Value>{value}</Value>
    </StyledBox>
  );
};

export default BoxContainerViewLabel;
