import { AppBar, Typography, Box } from "@mui/material";
import logo from "../../assets/CompanyHub.png";
import { useCompanies } from "../../context/CompanyContext";

export default function Layout({ children }: any) {
  const { view, setView } = useCompanies();
  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(2,6,23,0.8)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <img src={logo} alt="CompanyHub" style={{ height: 40 }} />

          <Box>
            <Typography variant="h6" fontWeight={600}>
              CompanyHub
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Discover top companies
            </Typography>
          </Box>
        </Box>
      </AppBar>

      <Box p={3}>{children}</Box>
    </>
  );
}
