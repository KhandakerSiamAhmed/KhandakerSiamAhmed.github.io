import type { Education as EducationType } from "@/types/portfolio";

interface Props {
    items: EducationType[];
    onItemClick: (item: Record<string, unknown>) => void;
}

export default function Education({ items, onItemClick }: Props) {
    if (!items || items.length === 0) return null;

    return (
        <div className="container">
            <div className="section-header">
                <h2 className="section-title">Education</h2>
            </div>
            <div className="projects-grid">
                {items.map((item) => (
                    <article
                        key={item.id}
                        className="project-card"
                        onClick={() => onItemClick(item as unknown as Record<string, unknown>)}
                    >
                        {item.imageurl && (
                            <div className="project-image">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.imageurl}
                                    alt={item.school}
                                    loading="lazy"
                                    style={{ width: "100%", height: "100%", objectFit: "contain", padding: "10px" }}
                                />
                            </div>
                        )}
                        <div className="project-content" style={{ padding: "2rem" }}>
                            <div className="project-header">
                                <span className="project-status" style={{ borderColor: "var(--text-secondary)", color: "var(--text-secondary)" }}>
                                    {item.start_year} - {item.end_year || "Present"}
                                </span>
                            </div>
                            <h3 className="project-title" style={{ marginTop: "0.5rem" }}>{item.school}</h3>
                            <span className="project-category" style={{ display: "block", marginBottom: "0.5rem" }}>{item.major}</span>
                            {item.cgpa && (
                                <p className="project-description">
                                    CGPA: <strong>{item.cgpa}</strong>
                                </p>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
