"use client";

import { useEffect, useState } from "react";
import { fetchPortfolioData } from "@/lib/api";
import type { PortfolioData } from "@/types/portfolio";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import Preloader from "./Preloader";

interface Props {
    children: React.ReactNode;
    data?: PortfolioData;
}

export default function PageLayout({ children, data: initialData }: Props) {
    const [data, setData] = useState<PortfolioData | null>(initialData ?? null);
    const [loading, setLoading] = useState(!initialData);

    useEffect(() => {
        if (!initialData) {
            fetchPortfolioData().then((d) => {
                setData(d);
                // small delay so the preloader feels intentional
                setTimeout(() => setLoading(false), 600);
            });
        } else {
            const timer = setTimeout(() => setLoading(false), 600);
            return () => clearTimeout(timer);
        }
    }, [initialData]);

    // Apply theme
    useEffect(() => {
        const theme = data?.config?.theme;
        if (theme) {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("site-theme", theme);
            if (theme === "titanium") document.body.classList.add("grid-bg");
            else document.body.classList.remove("grid-bg");
        }
    }, [data?.config?.theme]);

    // Apply cached theme immediately
    useEffect(() => {
        const cachedTheme = localStorage.getItem("site-theme");
        if (cachedTheme) {
            document.documentElement.setAttribute("data-theme", cachedTheme);
            if (cachedTheme === "titanium") document.body.classList.add("grid-bg");
        }
    }, []);

    return (
        <>
            {loading && <Preloader />}
            <Navbar config={data?.config ?? null} />
            <main className="inner-page-main">
                {children}
            </main>
            <Footer config={data?.config ?? null} />
            <BackToTop />
        </>
    );
}
