import type { PortfolioConfig } from "@/types/portfolio";
import SocialLinks from "./SocialLinks";

interface Props {
    config: PortfolioConfig | null;
}

export default function Footer({ config }: Props) {
    const year = new Date().getFullYear();

    return (
        <footer className="footer" id="contact">
            <div className="container">
                <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: "3rem", textAlign: "center" }}>
                    Let&apos;s Connect
                </h2>

                <div className="footer-socials">
                    <SocialLinks socials={config?.socials} />
                </div>

                <p style={{ marginTop: "3rem", fontSize: "0.8rem", color: "#555" }}>
                    &copy; {year} Khandaker Siam Ahmed. All rights reserved.
                    <br /><br />
                    <a
                        href="/dashboard"
                        style={{ color: "#888", textDecoration: "none", fontSize: "0.7rem" }}
                    >
                        Admin Login
                    </a>
                </p>
            </div>
        </footer>
    );
}
