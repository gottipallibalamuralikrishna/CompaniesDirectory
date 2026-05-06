import companiesData from "../data/companies.json";

export const getCompanies = async () => {
  // simulate API delay (optional)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(companiesData.companies);
    }, 300);
  });
};
