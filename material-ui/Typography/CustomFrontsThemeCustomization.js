import { createTheme, ThemeProvider, Typography } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    h1: {
      fontSize: "40px",
      fontWeight: "bold",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h1">Custom Font Typography</Typography>
    </ThemeProvider>
  );
}

export default App;
