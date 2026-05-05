import {
  Grid,
  Pagination,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useCompanies } from "../../context/CompanyContext";
import CompanyCard from "./CompanyCard";
import { useState } from "react";

export default function CompanyCardView({ mode }: any) {
  const { filtered, loading, error } = useCompanies();

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const start = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        gap={2}
      >
        <Typography variant="h6" color="error">
          Failed to load companies
        </Typography>

        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }
  if (filtered.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="30vh"
      >
        <Typography color="text.secondary">No companies found</Typography>
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={2}>
        {paginated.map((c: any) => (
          <Grid item xs={12} sm={6} md={4} key={c.id}>
            <CompanyCard company={c} mode={mode} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(filtered.length / itemsPerPage)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </>
  );
}
