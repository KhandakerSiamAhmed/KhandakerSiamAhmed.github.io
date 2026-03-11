"use client";

import { useEffect, useState } from "react";
import PageLayout from "@/components/portfolio/PageLayout";
import SocialSection from "@/components/portfolio/SocialSection";
import ScrollReveal from "@/components/portfolio/ScrollReveal";
import { fetchPortfolioData } from "@/lib/api";
import type { PortfolioData } from "@/types/portfolio";
import Preloader from "@/components/portfolio/Preloader";

export default function SocialContent() {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPortfolioData().then((d) => {
            setData(d);
            setLoading(false);
        });
    }, []);

    if (loading) return <Preloader variant="home" />;

    return (
        <PageLayout data={data ?? undefined}>
            <ScrollReveal>
                <section className="section social inner-page-section" id="social-links">
                    <SocialSection config={data?.config} />
                </section>
            </ScrollReveal>
        </PageLayout>
    );
}
