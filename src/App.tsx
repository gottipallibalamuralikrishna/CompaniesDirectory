import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { theme } from "./theme";
import { CompanyProvider } from "./context/CompanyContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* ✅ THIS IS THE FIX */}
      <CompanyProvider>
        <Layout>
          <Box
            sx={{
              minHeight: "80vh",
              background: `
                radial-gradient(circle at 10% 10%, rgba(37, 99, 235, 0.25), transparent 40%),
                radial-gradient(circle at 90% 0%, rgba(16, 185, 129, 0.2), transparent 40%),
                #020617
              `,
            }}
          >
            <Home />
          </Box>
        </Layout>
      </CompanyProvider>
    </ThemeProvider>
  );
}
