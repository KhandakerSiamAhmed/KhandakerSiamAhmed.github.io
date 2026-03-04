"use client";

import { useEffect, useState } from "react";
import { fetchPortfolioData } from "@/lib/api";
import type { PortfolioData } from "@/types/portfolio";
import PageLayout from "@/components/portfolio/PageLayout";
import Experience from "@/components/portfolio/Experience";
import Preloader from "@/components/portfolio/Preloader";
import ScrollReveal from "@/components/portfolio/ScrollReveal";

export default function ExperienceContent() {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = localStorage.getItem("site-theme");
        if (t) {
            document.documentElement.setAttribute("data-theme", t);
            if (t === "titanium") document.body.classList.add("grid-bg");
            else document.body.classList.remove("grid-bg");
        }
        fetchPortfolioData().then((d) => { setData(d); setLoading(false); });
    }, []);

    if (loading) return <Preloader variant="timeline" />;

    return (
        <PageLayout data={data ?? undefined}>
            <ScrollReveal>
                <section className="section experience inner-page-section" id="experience">
                    <Experience items={data?.experience ?? []} />
                </section>
            </ScrollReveal>
        </PageLayout>
    );
}
