"use client";

import { useEffect, useState, useCallback } from "react";
import type { PortfolioData, Project, Education as EducationType, Achievement } from "@/types/portfolio";
import Preloader from "./Preloader";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Achievements from "./Achievements";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import ScrollReveal from "./ScrollReveal";
import DetailModal from "./DetailModal";

interface Props {
    data: PortfolioData;
}

type DetailItem = {
    item: Project | EducationType | Achievement;
    type: "project" | "education" | "achievement";
};

export default function PortfolioClient({ data }: Props) {
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState<DetailItem | null>(null);

    // Apply theme from config
    useEffect(() => {
        const theme = data.config?.theme;
        if (theme) {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("site-theme", theme);
            if (theme === "titanium") {
                document.body.classList.add("grid-bg");
            } else {
                document.body.classList.remove("grid-bg");
            }
        } else {
            document.documentElement.removeAttribute("data-theme");
            localStorage.removeItem("site-theme");
            document.body.classList.remove("grid-bg");
        }
    }, [data.config?.theme]);

    // Apply cached theme immediately on mount
    useEffect(() => {
        const cachedTheme = localStorage.getItem("site-theme");
        if (cachedTheme) {
            document.documentElement.setAttribute("data-theme", cachedTheme);
            if (cachedTheme === "titanium") document.body.classList.add("grid-bg");
        }
    }, []);

    // Hide preloader after data is ready
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Handle browser back button to close overlay
    useEffect(() => {
        const onPopState = () => {
            setDetail(null);
        };
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    // Lock body scroll when detail overlay is open
    useEffect(() => {
        if (detail) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [detail]);

    const openDetail = useCallback((item: Project | EducationType | Achievement, type: "project" | "education" | "achievement") => {
        setDetail({ item, type });
        history.pushState({ detail: true }, "");
    }, []);

    const closeDetail = useCallback(() => {
        if (detail) {
            setDetail(null);
            if (history.state?.detail) {
                history.back();
            }
        }
    }, [detail]);

    return (
        <>
            {loading && <Preloader />}
            <Navbar config={data.config} />

            <section className="hero" id="hero">
                <Hero config={data.config} />
            </section>

            <ScrollReveal>
                <section className="section about" id="about">
                    <About config={data.config} />
                </section>
            </ScrollReveal>

            <ScrollReveal>
                <section className="section projects" id="projects">
                    <Projects items={data.projects} onItemClick={(item) => openDetail(item, "project")} />
                </section>
            </ScrollReveal>

            <ScrollReveal>
                <section className="section education" id="education">
                    <Education items={data.education} onItemClick={(item) => openDetail(item, "education")} />
                </section>
            </ScrollReveal>

            <ScrollReveal>
                <section className="section experience" id="experience">
                    <Experience items={data.experience} />
                </section>
            </ScrollReveal>

            <ScrollReveal>
                <section className="section skills" id="skills">
                    <Skills items={data.skills} />
                </section>
            </ScrollReveal>

            <ScrollReveal>
                <section className="section achievements" id="achievements">
                    <Achievements items={data.achievements} onItemClick={(item) => openDetail(item, "achievement")} />
                </section>
            </ScrollReveal>

            <Footer config={data.config} />

            <BackToTop />

            {detail && (
                <DetailModal
                    item={detail.item as unknown as Record<string, unknown>}
                    type={detail.type}
                    onClose={closeDetail}
                />
            )}
        </>
    );
}
