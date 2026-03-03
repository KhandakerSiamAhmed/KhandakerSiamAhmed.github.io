"use client";

import { useEffect, useState } from "react";
import { fetchPortfolioData } from "@/lib/api";
import PortfolioClient from "@/components/portfolio/PortfolioClient";
import Preloader from "@/components/portfolio/Preloader";
import type { PortfolioData } from "@/types/portfolio";

export default function Home() {
    const [data, setData] = useState<PortfolioData | null>(null);

    useEffect(() => {
        fetchPortfolioData().then(setData).catch(console.error);
    }, []);

    if (!data) return <Preloader />;

    return <PortfolioClient data={data} />;
}
