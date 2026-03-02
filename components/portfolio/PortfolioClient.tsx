"use client";

import { useEffect, useState } from "react";
import type { PortfolioData } from "@/types/portfolio";
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
import DetailModal from "./DetailModal";
import BackToTop from "./BackToTop";
import ScrollReveal from "./ScrollReveal";

interface Props {
    data: PortfolioData;
}

export default function PortfolioClient({ data }: Props) {
    const [loading, setLoading] = useState(true);
    const [modalItem, setModalItem] = useState<Record<string, unknown> | null>(null);

    // Apply theme
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

    // Apply cached theme immediately
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

    const openDetails = (item: Record<string, unknown>) => {
        setModalItem(item);
    };

    const closeDetails = () => {
        setModalItem(null);
    };

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
                    <Projects items={data.projects} onItemClick={openDetails} />
                </section>
            </ScrollReveal>

            <ScrollReveal>
                <section className="section education" id="education">
                    <Education items={data.education} onItemClick={openDetails} />
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
                    <Achievements items={data.achievements} onItemClick={openDetails} />
                </section>
            </ScrollReveal>

            <Footer config={data.config} />

            {modalItem && (
                <DetailModal item={modalItem} onClose={closeDetails} />
            )}

            <BackToTop />
        </>
    );
}
