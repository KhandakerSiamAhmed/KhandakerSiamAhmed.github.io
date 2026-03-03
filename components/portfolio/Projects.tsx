"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/types/portfolio";

interface Props {
    items: Project[];
}

export default function Projects({ items }: Props) {
    const [activeFilter, setActiveFilter] = useState("All");
    const router = useRouter();

    if (!items || items.length === 0) return null;

    const categories = ["All", ...Array.from(new Set(items.map((i) => i.category).filter(Boolean) as string[]))];
    const filtered = activeFilter === "All" ? items : items.filter((i) => i.category === activeFilter);

    return (
        <div className="container">
            <div className="section-header">
                <h2 className="section-title">Featured Projects</h2>
                <p className="section-subtitle">Spanning robotics, CAD design, embedded systems, and more.</p>
            </div>

            {categories.length > 2 && (
                <div className="section-tabs">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`section-tab ${activeFilter === cat ? "active" : ""}`}
                            onClick={() => setActiveFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}

            <div className="projects-grid">
                {filtered.map((item) => {
                    const techstack = Array.isArray(item.techstack)
                        ? item.techstack
                        : item.techstack
                            ? String(item.techstack).split(",").map((s) => s.trim())
                            : [];

                    return (
                        <article
                            key={item.id}
                            className="project-card"
                            onClick={() => router.push(`/projects?id=${item.id}`)}
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
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
