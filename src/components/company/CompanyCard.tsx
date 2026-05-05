import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Avatar,
  Link,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function CompanyCard({ company }: any) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        background: "rgba(15, 23, 42, 0.7)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 10px 40px rgba(59,130,246,0.2)",
        backdropFilter: "blur(10px)",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 15px 50px rgba(59,130,246,0.3)",
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" gap={2}>
            <Avatar sx={{ bgcolor: "#1e293b", color: "#60a5fa" }}>
              {company.name[0]}
            </Avatar>

            <Box>
              <Typography fontWeight={600} color="#e2e8f0">
                {company.name}
              </Typography>

              <Typography variant="body2" color="#94a3b8">
                {company.website}
              </Typography>
            </Box>
          </Box>

          <IconButton>
            <FavoriteBorderIcon sx={{ color: "#94a3b8" }} />
          </IconButton>
        </Box>

        <Typography mt={2} color="#94a3b8">
          {company.description}
        </Typography>

        <Box mt={2} display="flex" gap={1}>
          <Chip
            label={company.industry}
            sx={{
              backgroundColor: "rgba(59,130,246,0.15)",
              color: "#60a5fa",
            }}
          />
          <Chip
            label={company.size}
            sx={{
              backgroundColor: "rgba(16,185,129,0.15)",
              color: "#34d399",
            }}
          />
        </Box>

        <Box mt={2}>
          <Typography variant="body2" color="#94a3b8">
            {company.location}
          </Typography>

          <Typography variant="body2" color="#94a3b8">
            {company.employees} employees
          </Typography>
        </Box>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography variant="caption" color="#64748b">
            Founded {company.founded}
          </Typography>

          <Link
            href={`https://${company.website}`}
            target="_blank"
            sx={{ color: "#3b82f6" }}
          >
            Visit
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
