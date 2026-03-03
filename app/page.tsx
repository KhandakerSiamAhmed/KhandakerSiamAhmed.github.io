import { fetchPortfolioData } from "@/lib/api";
import PortfolioClient from "@/components/portfolio/PortfolioClient";

export default async function Home() {
    // Fetch data during build time (or server-side in dev)
    const data = await fetchPortfolioData();

    // PortfolioClient continues to handle interactivity on the client side
    return <PortfolioClient data={data} />;
}
