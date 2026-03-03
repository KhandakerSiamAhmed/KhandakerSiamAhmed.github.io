"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import type { Project } from "@/types/portfolio";

interface Props {
    items: Project[];
    onItemClick?: (item: Project) => void;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
        },
    },
};

export default function Projects({ items, onItemClick }: Props) {
    const [activeFilter, setActiveFilter] = useState("All");

    if (!items || items.length === 0) return null;

    const categories = ["All", ...Array.from(new Set(items.map((i) => i.category).filter(Boolean) as string[]))];
    const filtered = activeFilter === "All" ? items : items.filter((i) => i.category === activeFilter);

    return (
        <div className="container" id="projects">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="section-title">Featured Projects</h2>
                <p className="section-subtitle">Spanning robotics, CAD design, embedded systems, and more.</p>
            </motion.div>

            {categories.length > 2 && (
                <motion.div
                    className="section-tabs"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`section-tab ${activeFilter === cat ? "active" : ""}`}
                            onClick={() => setActiveFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>
            )}

            <motion.div
                className="projects-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {filtered.map((item) => {
                    const techstack = Array.isArray(item.techstack)
                        ? item.techstack
                        : item.techstack
                            ? String(item.techstack).split(",").map((s) => s.trim())
                            : [];

                    return (
                        <motion.article
                            key={item.id}
                            variants={cardVariants}
                            whileHover={{ y: -8, scale: 1.01 }}
                            className="project-card"
                            tabIndex={0}
                            role="button"
                            onClick={() => onItemClick?.(item)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    onItemClick?.(item);
                                }
                            }}
                        >
                            <div className="project-image">
                                {item.imageurl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={item.imageurl}
                                        alt={item.title}
                                        loading="lazy"
                                        style={{ width: "100%", height: "100%", objectFit: "contain", padding: "10px" }}
                                    />
                                ) : (
                                    <div className="project-placeholder">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="project-content">
                                <div className="project-header">
                                    <span className="project-status">{item.status || "Project"}</span>
                                </div>
                                <span className="project-category">{item.category || "Development"}</span>
                                <h3 className="project-title">{item.title}</h3>
                                <p className="project-description">
                                    {item.description || ""}
                                </p>
                                <div className="project-tech">
                                    {techstack.map((t, i) => (
                                        <span key={i} className="tech-tag">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.article>
                    );
                })}
            </motion.div>
        </div>
    );
}
