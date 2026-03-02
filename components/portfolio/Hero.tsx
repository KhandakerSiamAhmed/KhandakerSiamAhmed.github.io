"use client";

import type { PortfolioConfig } from "@/types/portfolio";
import SocialLinks from "./SocialLinks";

interface Props {
    config: PortfolioConfig | null;
}

export default function Hero({ config }: Props) {
    const heroName = config?.heroName || "Khandaker Siam Ahmed";
    const heroSubtitle = config?.heroSubtitle || "Mechanical Engineer & Robotics Enthusiast";
    const profileImage = config?.profileImage || "/assets/Khandaker Siam Ahmed.svg";
    const frameStyle = config?.heroPhotoStyle || "frame-soft";
    const resumeUrl = config?.resumeUrl || "/assets/cv.pdf";

    return (
        <div className="container hero-container">
            {/* Left: Text Content */}
            <div className="hero-content">
                <h1 className="hero-title">{heroName}</h1>
                <p className="hero-subtitle">{heroSubtitle}</p>

                <div className="hero-cta">
                    <a
                        href={resumeUrl}
                        className="btn btn-secondary"
                        download="Khandaker_Siam_Ahmed_CV.pdf"
                    >
                        Download CV
                    </a>
                    <div className="hero-socials">
                        <SocialLinks socials={config?.socials} />
                    </div>
                </div>
            </div>

            {/* Right: Visual */}
            <div className="hero-visual">
                <div className={`hero-image-container ${frameStyle}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={profileImage}
                        alt="Portrait"
                        style={{ opacity: 1, transition: "opacity 0.5s" }}
                    />
                </div>
            </div>

            <div className="scroll-indicator">
                <span className="scroll-text">SCROLL</span>
                <div className="scroll-line" />
            </div>
        </div>
    );
}
