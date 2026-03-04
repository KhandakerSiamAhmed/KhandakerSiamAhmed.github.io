"use client";

import { useEffect, useState, useCallback } from "react";
import type { PortfolioData, Project, Education as EducationType, Achievement } from "@/types/portfolio";
import { supabase } from "@/lib/supabase";
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
    data: PortfolioData; // build-time seed data
}

type DetailItem = {
    item: Project | EducationType | Achievement;
    type: "project" | "education" | "achievement";
};

/** Returns starred items (max N), else falls back to first N */
function getHomeItems<T extends { starred?: boolean }>(items: T[], max = 3): T[] {
    const starred = items.filter((i) => i.starred === true);
    return (starred.length > 0 ? starred : items).slice(0, max);
}

export default function PortfolioClient({ data: seedData }: Props) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<PortfolioData>(seedData);
    const [detail, setDetail] = useState<DetailItem | null>(null);

    // Fetch live data from Supabase on mount so starred changes take effect immediately
    useEffect(() => {
        async function fetchLive() {
            try {
                const [configRes, expRes, projRes, skillRes, achRes, eduRes] = await Promise.all([
                    supabase.from("config").select("*").eq("key", "global").single(),
                    supabase.from("experience").select("*").order("date", { ascending: false }),
                    supabase.from("projects").select("*").order("created_at", { ascending: false }),
                    supabase.from("skills").select("*"),
                    supabase.from("achievements").select("*"),
                    supabase.from("education").select("*").order("start_year", { ascending: false }),
                ]);
                setData({
                    config: configRes.data?.value ?? seedData.config,
                    experience: expRes.data ?? seedData.experience,
                    projects: projRes.data ?? seedData.projects,
                    skills: skillRes.data ?? seedData.skills,
                    achievements: achRes.data ?? seedData.achievements,
                    education: eduRes.data ?? seedData.education,
                });
            } catch {
                // Keep seed data on error
            } finally {
                setLoading(false);
            }
        }
        fetchLive();
    }, [seedData]);

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

    // Apply cached theme immediately on mount to prevent flash
    useEffect(() => {
        const cachedTheme = localStorage.getItem("site-theme");
        if (cachedTheme) {
            document.documentElement.setAttribute("data-theme", cachedTheme);
            if (cachedTheme === "titanium") document.body.classList.add("grid-bg");
        }
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
