import {
  Box,
  TextField,
  MenuItem,
  Typography,
  InputAdornment,
  Tooltip,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useCompanies } from "../../context/CompanyContext";
import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import SortIcon from "@mui/icons-material/Sort";

type Props = {
  mode: "light" | "dark";
};

export default function Filters({ mode }: Props) {
  const { setFilters, filtered, filters, toggleSort } = useCompanies();

  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 400);

  const [local, setLocal] = useState({
    industry: "",
    location: "",
    size: "",
    sort: "name",
  });

  useEffect(() => {
    setFilters((prev: any) => ({ ...prev, search: debounced }));
  }, [debounced, setFilters]);

  // helper styles
  const pillStyles = {
    borderRadius: "999px",
    height: 48,
    background: mode === "dark" ? "rgba(15,23,42,0.6)" : "#ffffff",
    border:
      mode === "dark"
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid #e2e8f0",
    backdropFilter: "blur(8px)",
    "& fieldset": { border: "none" },
    "& input": {
      color: mode === "dark" ? "#e2e8f0" : "#0f172a",
    },
  } as const;

  const selectCommon = (key: "industry" | "location" | "size") => ({
    value: (local as any)[key] || "",
    onChange: (e: any) => {
      const value = e.target.value;
      setLocal((prev) => ({ ...prev, [key]: value }));
      setFilters((prev: any) => ({ ...prev, [key]: value }));
    },
    SelectProps: {
      displayEmpty: true,
      renderValue: (selected: any) => {
        if (!selected) {
          const label =
            key === "industry"
              ? "All Industries"
              : key === "location"
                ? "All Locations"
                : "All Sizes";
          return label;
        }
        return selected;
      },
    },
    sx: {
      minWidth: 160,
      "& .MuiOutlinedInput-root": pillStyles,
      "& .MuiSelect-select": {
        color: mode === "dark" ? "#e2e8f0" : "#0f172a",
        display: "flex",
        alignItems: "center",
      },
    },
  });

  return (
    <Box mb={3} pt={3}>
      {/* Top Row */}
      <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
        {/* SEARCH */}
        <TextField
          placeholder="Search companies..."
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#94a3b8" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            minWidth: 280,
            "& .MuiOutlinedInput-root": pillStyles,
          }}
        />

        {/* INDUSTRY */}
        <TextField select {...selectCommon("industry")}>
          <MenuItem value="">All Industries</MenuItem>
          <MenuItem value="Fintech">Fintech</MenuItem>
          <MenuItem value="Design">Design</MenuItem>
          <MenuItem value="Productivity">Productivity</MenuItem>
          <MenuItem value="Developer Tools">Developer Tools</MenuItem>
          <MenuItem value="Cloud Infrastructure">Cloud Infrastructure</MenuItem>
        </TextField>

        {/* LOCATION */}
        <TextField select {...selectCommon("location")}>
          <MenuItem value="">All Locations</MenuItem>
          <MenuItem value="San Francisco, CA">San Francisco, CA</MenuItem>
          <MenuItem value="New York, NY">New York, NY</MenuItem>
          <MenuItem value="Sydney, Australia">Sydney, Australia</MenuItem>
          <MenuItem value="Amsterdam, Netherlands">
            Amsterdam, Netherlands
          </MenuItem>
        </TextField>

        {/* SIZE */}
        <TextField select {...selectCommon("size")}>
          <MenuItem value="">All Sizes</MenuItem>
          <MenuItem value="Startup">Startup</MenuItem>
          <MenuItem value="Mid-Market">Mid-Market</MenuItem>
          <MenuItem value="Enterprise">Enterprise</MenuItem>
        </TextField>

        {/* SORT */}
        <Tooltip
          title={
            filters.sort === ""
              ? "Default"
              : filters.sort === "asc"
                ? "Ascending"
                : "Descending"
          }
        >
          <IconButton onClick={toggleSort}>
            <SortIcon
              sx={{
                transform:
                  filters.sort === "asc"
                    ? "rotate(0deg)"
                    : filters.sort === "desc"
                      ? "rotate(180deg)"
                      : "none",
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>

      {/* COUNT */}
      <Typography m={1} variant="body2" color="text.secondary">
        {filtered.length} companies found
      </Typography>
    </Box>
  );
}
