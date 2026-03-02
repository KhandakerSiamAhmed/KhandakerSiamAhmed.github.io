import type { Achievement } from "@/types/portfolio";

interface Props {
    items: Achievement[];
    onItemClick: (item: Record<string, unknown>) => void;
}

export default function Achievements({ items, onItemClick }: Props) {
    if (!items || items.length === 0) return null;

    return (
        <div className="container">
            <div className="section-header">
                <h2 className="section-title">Achievements</h2>
            </div>
            <div className="projects-grid">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="project-card"
                        onClick={() => onItemClick(item as unknown as Record<string, unknown>)}
                    >
                        {item.imageurl && (
                            <div className="project-image">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.imageurl}
                                    alt={item.title}
                                    loading="lazy"
                                    style={{ width: "100%", height: "100%", objectFit: "contain", padding: "10px" }}
                                />
                            </div>
                        )}
                        <div className="project-content" style={{ padding: "2rem" }}>
                            {item.icon && !item.imageurl && (
                                <div style={{ marginBottom: "1rem" }} dangerouslySetInnerHTML={{ __html: item.icon }} />
                            )}
                            <span className="project-category">{item.category}</span>
                            <h3 className="project-title">{item.title}</h3>
                            {item.date && (
                                <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>{item.date}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
