"use client";

import { motion } from "framer-motion";
import type { PortfolioConfig } from "@/types/portfolio";

interface Props {
    config: PortfolioConfig | null;
}

export default function About({ config }: Props) {
    if (!config?.aboutText) return null;

    return (
        <motion.div
            className="container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="section-header">
                <h2 className="section-title">About Me</h2>
            </div>
            <div className="about-content">
                <motion.div
                    className="about-text"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    dangerouslySetInnerHTML={{ __html: config.aboutText }}
                />
            </div>
        </motion.div>
    );
}
