import { createContext, useContext, useEffect, useState } from "react";

type Company = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  size: string;
  employees: number;
  description: string;
  founded: number;
  website: string;
  bookmarked?: boolean;
};

type Filters = {
  search: string;
  industry: string;
  location: string;
  size: string;
  sort: string;
};

const CompanyContext = createContext<any>(null);

export const CompanyProvider = ({ children }: any) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filtered, setFiltered] = useState<Company[]>([]);

  const [filters, setFilters] = useState<Filters>({
    search: "",
    industry: "",
    location: "",
    size: "",
    sort: "name",
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const toggleSort = () => {
    setFilters((prev: any) => {
      let next = "";

      if (prev.sort === "") next = "asc";
      else if (prev.sort === "asc") next = "desc";
      else next = "";

      return { ...prev, sort: next };
    });
  };
  // ✅ FETCH FROM API
  useEffect(() => {
    fetch("http://localhost:3001/companies")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...companies];

    // Search
    if (filters.search) {
      result = result.filter((c) =>
        c.name.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    // Industry
    if (filters.industry) {
      result = result.filter((c) => c.industry === filters.industry);
    }

    // Location
    if (filters.location) {
      result = result.filter((c) => c.location === filters.location);
    }

    // Size
    if (filters.size) {
      result = result.filter((c) => c.size === filters.size);
    }

    // 🔥 Sorting
    if (filters.sort === "asc") {
      result.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
      );
    }

    if (filters.sort === "desc") {
      result.sort((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase()),
      );
    }

    setFiltered(result);
    setPage(0);
  }, [filters, companies]);

  // ✅ PAGINATION
  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <CompanyContext.Provider
      value={{
        companies,
        filtered,
        paginated,

        filters,
        setFilters,
        toggleSort,

        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,

        loading,
        error,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanies = () => useContext(CompanyContext);
