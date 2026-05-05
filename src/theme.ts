import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#020617",
      paper: "#0f172a",
    },
    primary: {
      main: "#3b82f6",
    },
    text: {
      primary: "#e2e8f0",
      secondary: "#94a3b8",
    },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});
