import { fetchPortfolioData } from "@/lib/api";
import PortfolioClient from "@/components/portfolio/PortfolioClient";

export const dynamic = "force-dynamic";

export default async function Home() {
    const data = await fetchPortfolioData();

    return <PortfolioClient data={data} />;
}
