import Filters from "../components/company/Filters";
import CompanyCardView from "../components/company/CompanyCardView";

export default function Home({ mode }: any) {
  return (
    <>
      <Filters mode={mode} />
      <CompanyCardView mode={mode} />
    </>
  );
}
