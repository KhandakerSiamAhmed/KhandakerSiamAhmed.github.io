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
import SocialSection from "./SocialSection";
import BackToTop from "./BackToTop";
import DetailModal from "./DetailModal";

interface Props {
    data: PortfolioData;
}

type DetailItem = {
    item: Project | EducationType | Achievement;
    type: "project" | "education" | "achievement";
};

/** Returns items to show on home page: starred ones first (max 3), falling back to first-3 */
function getHomeItems<T extends { starred?: boolean }>(items: T[], max = 3): T[] {
    const starred = items.filter((i) => i.starred);
    return (starred.length > 0 ? starred : items).slice(0, max);
}

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

    // Compute home-page preview items (starred → fallback to first-3)
    const homeProjects = getHomeItems(data.projects);
    const homeEducation = getHomeItems(data.education);
    const homeExperience = getHomeItems(data.experience);
    const homeAchievements = getHomeItems(data.achievements);
    const homeSkills = getHomeItems(data.skills, 9);
    // Social section: no starred logic — just cap at 6 (hardcoded links)

    return (
        <>
            {loading && <Preloader variant="home" />}
            <Navbar config={data.config} />

            <section className="hero" id="hero">
                <Hero config={data.config} />
            </section>

            <section className="section about" id="about">
                <About config={data.config} />
            </section>

            <section className="section projects" id="projects">
                <Projects
                    items={homeProjects}
                    onItemClick={(item) => openDetail(item, "project")}
                    viewAllHref={data.projects.length > 3 ? "/projects" : undefined}
                    totalCount={data.projects.length}
                />
            </section>

            <section className="section education" id="education">
                <Education
                    items={homeEducation}
                    onItemClick={(item) => openDetail(item, "education")}
                    viewAllHref={data.education.length > 3 ? "/education" : undefined}
                    totalCount={data.education.length}
                />
            </section>

            <section className="section experience" id="experience">
                <Experience
                    items={homeExperience}
                    viewAllHref={data.experience.length > 3 ? "/experience" : undefined}
                    totalCount={data.experience.length}
                />
            </section>

            <section className="section skills" id="skills">
                <Skills
                    items={homeSkills}
                    viewAllHref={data.skills.length > 9 ? "/skills" : undefined}
                    totalCount={data.skills.length}
                />
            </section>

            <section className="section achievements" id="achievements">
                <Achievements
                    items={homeAchievements}
                    onItemClick={(item) => openDetail(item, "achievement")}
                    viewAllHref={data.achievements.length > 3 ? "/achievements" : undefined}
                    totalCount={data.achievements.length}
                />
            </section>

            <section className="section social" id="social-links">
                <SocialSection limit={6} viewAllHref="/social" />
            </section>

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
