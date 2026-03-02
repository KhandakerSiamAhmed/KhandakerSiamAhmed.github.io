import type { Experience as ExperienceType } from "@/types/portfolio";

interface Props {
    items: ExperienceType[];
}

export default function Experience({ items }: Props) {
    if (!items || items.length === 0) return null;

    return (
        <div className="container">
            <div className="section-header">
                <h2 className="section-title">Experience</h2>
            </div>
            <div className="timeline">
                {items.map((item) => (
                    <div key={item.id} className="timeline-item active">
                        <span className="timeline-date">{item.date}</span>
                        <h3 className="timeline-title">{item.role}</h3>
                        <span className="timeline-org">{item.company}</span>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
