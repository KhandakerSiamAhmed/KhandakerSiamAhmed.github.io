"use client";

import { useEffect, useState } from "react";
import type { PortfolioConfig } from "@/types/portfolio";
import ThemeSwitcher from "./ThemeSwitcher";

const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "achievements", label: "Achievements" },
    { id: "contact", label: "Contact" },
];

interface Props {
    config: PortfolioConfig | null;
}

export default function Navbar({ config }: Props) {
    const [activeSection, setActiveSection] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const sections = document.querySelectorAll("section");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setMenuOpen(false);
        }
    };

    const logoText = (config?.heroName || "Portfolio").toUpperCase();
    const profileImage = config?.profileImage;

    return (
        <nav className="navbar" id="navbar">
            <div className="nav-container">
                <a
                    href="#hero"
                    className="nav-logo"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollTo("hero");
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={profileImage || "/assets/Khandaker Siam Ahmed.svg"}
                        alt={config?.heroName || "Profile"}
                        className="logo-img"
                    />
                    <span>{logoText}</span>
                </a>

                <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <button
                                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                                onClick={() => scrollTo(item.id)}
                                aria-current={activeSection === item.id ? "page" : undefined}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                <ThemeSwitcher />

                <button
                    className={`nav-toggle ${menuOpen ? "active" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </nav>
    );
}
