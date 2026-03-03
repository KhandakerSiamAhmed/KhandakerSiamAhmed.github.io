"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchPortfolioData } from "@/lib/api";
import type { Achievement } from "@/types/portfolio";
import DetailPage from "@/components/portfolio/DetailPage";
import Preloader from "@/components/portfolio/Preloader";

function AchievementDetail() {
    const params = useSearchParams();
    const router = useRouter();
    const id = params.get("id");
    const [item, setItem] = useState<Achievement | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = localStorage.getItem("site-theme");
        if (t) {
            document.documentElement.setAttribute("data-theme", t);
            if (t === "titanium") document.body.classList.add("grid-bg");
            else document.body.classList.remove("grid-bg");
        }

        fetchPortfolioData().then((data) => {
            const found = data.achievements.find((a) => a.id === id) ?? null;
            setItem(found);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <Preloader />;

    if (!item) {
        return (
            <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                <p style={{ color: "var(--text-secondary)" }}>Achievement not found.</p>
                <button className="btn btn-secondary" onClick={() => router.push("/#achievements")}>
                    Back to Achievements
                </button>
            </div>
        );
    }

    return (
        <DetailPage
            item={item as unknown as Record<string, unknown>}
            type="achievement"
            onBack={() => router.push("/#achievements")}
        />
    );
}

export default function AchievementsPage() {
    return (
        <Suspense fallback={<Preloader />}>
            <AchievementDetail />
        </Suspense>
    );
}
