"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchPortfolioData } from "@/lib/api";
import type { PortfolioData, Education as EducationType } from "@/types/portfolio";
import PageLayout from "@/components/portfolio/PageLayout";
import Education from "@/components/portfolio/Education";
import DetailModal from "@/components/portfolio/DetailModal";
import Preloader from "@/components/portfolio/Preloader";
import ScrollReveal from "@/components/portfolio/ScrollReveal";

export default function EducationContent() {
    const params = useSearchParams();
    const router = useRouter();
    const detailId = params.get("id");

    const [data, setData] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState<EducationType | null>(null);

    useEffect(() => {
        const t = localStorage.getItem("site-theme");
        if (t) {
            document.documentElement.setAttribute("data-theme", t);
            if (t === "titanium") document.body.classList.add("grid-bg");
            else document.body.classList.remove("grid-bg");
        }
        fetchPortfolioData().then((d) => {
            setData(d);
            if (detailId) setDetail(d.education.find((e) => e.id === detailId) ?? null);
            setLoading(false);
        });
    }, [detailId]);

    useEffect(() => {
        document.body.style.overflow = detail ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [detail]);

    const openDetail = useCallback((item: EducationType) => {
        setDetail(item);
        router.push(`/education?id=${item.id}`, { scroll: false });
    }, [router]);

    const closeDetail = useCallback(() => {
        setDetail(null);
        router.push("/education", { scroll: false });
    }, [router]);

    if (loading) return <Preloader variant="grid" />;

    return (
        <PageLayout data={data ?? undefined}>
            <ScrollReveal>
                <section className="section education inner-page-section" id="education">
                    <Education items={data?.education ?? []} onItemClick={openDetail} />
                </section>
            </ScrollReveal>
            {detail && (
                <DetailModal item={detail as unknown as Record<string, unknown>} type="education" onClose={closeDetail} />
            )}
        </PageLayout>
    );
}
