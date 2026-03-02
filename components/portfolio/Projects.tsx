import type { Project } from "@/types/portfolio";

interface Props {
    items: Project[];
    onItemClick: (item: Record<string, unknown>) => void;
}

export default function Projects({ items, onItemClick }: Props) {
    if (!items || items.length === 0) return null;

    return (
        <div className="container">
            <div className="section-header">
                <h2 className="section-title">Featured Projects</h2>
                <p className="section-subtitle">A selection of my recent works.</p>
            </div>
            <div className="projects-grid">
                {items.map((item) => {
                    const techstack = Array.isArray(item.techstack)
                        ? item.techstack
                        : item.techstack
                            ? String(item.techstack).split(",").map((s) => s.trim())
                            : [];

                    return (
                        <article
                            key={item.id}
                            className="project-card"
                            onClick={() => onItemClick(item as unknown as Record<string, unknown>)}
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
                                            <circle cx="12" cy="12" r="10" />
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
                                    {item.description ? item.description.substring(0, 100) + "..." : ""}
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
