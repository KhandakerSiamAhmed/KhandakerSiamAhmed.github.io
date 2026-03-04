"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PortfolioConfig } from "@/types/portfolio";
import ThemeSwitcher from "./ThemeSwitcher";

interface NavItem {
    id: string;
    label: string;
    href: string;
    isAnchor?: boolean; // If true, scroll on home page instead of navigating
}

const navItems: NavItem[] = [
    { id: "about", label: "About", href: "/#about", isAnchor: true },
    { id: "projects", label: "Projects", href: "/projects" },
    { id: "education", label: "Education", href: "/education" },
    { id: "experience", label: "Experience", href: "/experience" },
    { id: "skills", label: "Skills", href: "/skills" },
    { id: "achievements", label: "Achievements", href: "/achievements" },
    { id: "contact", label: "Contact", href: "/social" },
];

interface Props {
    config: PortfolioConfig | null;
}

export default function Navbar({ config }: Props) {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [activeSection, setActiveSection] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Intersection observer only on home page
    useEffect(() => {
        if (!isHome) return;
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
    }, [isHome]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setMenuOpen(false);
        }
    };

    const isNavItemActive = (item: NavItem): boolean => {
        if (isHome && item.isAnchor) {
            return activeSection === item.id;
        }
        if (!item.isAnchor) {
            return pathname === item.href;
        }
        return false;
    };

    const logoText = (config?.heroName || "Portfolio").toUpperCase();
    const profileImage = config?.profileImage;

    return (
        <motion.nav
            className={`navbar ${scrolled ? "scrolled" : ""}`}
            id="navbar"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="nav-container">
                <Link
                    href="/"
                    className="nav-logo"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={profileImage || "/assets/Khandaker Siam Ahmed.svg"}
                        alt={config?.heroName || "Profile"}
                        className="logo-img"
                    />
                    <span>{logoText}</span>
                </Link>

                <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
                    {navItems.map((item, index) => (
                        <motion.li
                            key={item.id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                        >
                            {isHome && item.isAnchor ? (
                                <button
                                    className={`nav-link ${isNavItemActive(item) ? "active" : ""}`}
                                    onClick={() => { scrollTo(item.id); }}
                                    aria-current={isNavItemActive(item) ? "page" : undefined}
                                >
                                    {item.label}
                                </button>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`nav-link ${isNavItemActive(item) ? "active" : ""}`}
                                    aria-current={isNavItemActive(item) ? "page" : undefined}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </motion.li>
                    ))}
                </ul>

                <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
            </div>

            {/* Mobile overlay backdrop */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="nav-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
