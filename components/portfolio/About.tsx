import type { PortfolioConfig } from "@/types/portfolio";

interface Props {
    config: PortfolioConfig | null;
}

export default function About({ config }: Props) {
    if (!config?.aboutText) return null;

    return (
        <div className="container">
            <div className="section-header">
                <h2 className="section-title">About Me</h2>
            </div>
            <div className="about-content">
                <div
                    className="about-text"
                    dangerouslySetInnerHTML={{ __html: config.aboutText }}
                />
            </div>
        </div>
    );
}
