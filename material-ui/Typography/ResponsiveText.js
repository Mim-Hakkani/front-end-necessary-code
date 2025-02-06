import { Typography, useMediaQuery } from "@mui/material";

function ResponsiveTypography() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Typography variant={isSmallScreen ? "h5" : "h2"}>
      Responsive Typography
    </Typography>
  );
}

export default ResponsiveTypography;
