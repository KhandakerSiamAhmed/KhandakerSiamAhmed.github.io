"use client";

import { useEffect, useState } from "react";
import { fetchPortfolioData } from "@/lib/api";
import type { PortfolioData } from "@/types/portfolio";
import PageLayout from "@/components/portfolio/PageLayout";
import Skills from "@/components/portfolio/Skills";
import Preloader from "@/components/portfolio/Preloader";
import ScrollReveal from "@/components/portfolio/ScrollReveal";

export default function SkillsContent() {
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

    if (loading) return <Preloader variant="skills" />;

    return (
        <PageLayout data={data ?? undefined}>
            <ScrollReveal>
                <section className="section skills inner-page-section" id="skills">
                    <Skills items={data?.skills ?? []} />
                </section>
            </ScrollReveal>
        </PageLayout>
    );
}
