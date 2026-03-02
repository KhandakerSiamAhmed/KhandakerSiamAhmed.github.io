import type { Skill } from "@/types/portfolio";

interface Props {
    items: Skill[];
}

export default function Skills({ items }: Props) {
    if (!items || items.length === 0) return null;

    return (
        <div className="container">
            <div className="section-header">
                <h2 className="section-title">Technical Skills</h2>
            </div>
            <div className="skill-items" style={{ justifyContent: "center", gap: "1rem" }}>
                {items.map((item) => (
                    <span key={item.id} className="skill-pill">
                        {item.name}
                    </span>
                ))}
            </div>
        </div>
    );
}
