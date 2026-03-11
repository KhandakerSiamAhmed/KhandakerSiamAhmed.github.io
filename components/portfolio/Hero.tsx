"use client";

import { motion, Variants } from "framer-motion";
import type { PortfolioConfig } from "@/types/portfolio";
import SocialLinks from "./SocialLinks";

interface Props {
    config: PortfolioConfig | null;
}

// Animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
        },
    },
};

const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 15,
            delay: 0.4,
        },
    },
};

export default function Hero({ config }: Props) {
    const heroName = config?.heroName || "Khandaker Siam Ahmed";
    const heroSubtitle = config?.heroSubtitle || "Mechanical Engineer specializing in Robotics & Intelligent Systems";
    const profileImage = config?.profileImage || "/assets/Logo.png";
    const frameStyle = config?.heroPhotoStyle || "frame-soft";
    const resumeUrl = config?.resumeUrl || "/assets/cv.pdf";

    return (
        <motion.div
            className="container hero-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Left: Text Content */}
            <div className="hero-content">
                <motion.h1 variants={itemVariants} className="hero-title">
                    {heroName.split(" ").map((word, index) => (
                        <span key={index} style={{ display: "inline-block", marginRight: "0.25em" }}>
                            {word}
                        </span>
                    ))}
                </motion.h1>
                <motion.p variants={itemVariants} className="hero-subtitle">
                    {heroSubtitle}
                </motion.p>

                <motion.div variants={itemVariants} className="hero-cta">
                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                        }
                        style={{ position: 'relative', overflow: 'hidden' }}
                    >
                        View My Work
                    </button>
                    <a
                        href={resumeUrl}
                        className="btn btn-secondary"
                        download="Khandaker_Siam_Ahmed_CV.pdf"
                        style={{ position: 'relative', overflow: 'hidden' }}
                    >
                        Download CV
                    </a>
                    <div className="hero-socials">
                        <SocialLinks socials={config?.socials} socialPriority={config?.socialPriority as Record<string, string | number>} />
                    </div>
                </motion.div>
            </div>

            {/* Right: Visual */}
            <motion.div variants={imageVariants} className="hero-visual">
                <div className={`hero-image-container ${frameStyle}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={profileImage}
                        alt={heroName}
                    />
                </div>
            </motion.div>

            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <span className="scroll-text">SCROLL</span>
                <div className="scroll-line" />
            </motion.div>
        </motion.div>
    );
}
