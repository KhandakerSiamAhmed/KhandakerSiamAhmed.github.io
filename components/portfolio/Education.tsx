"use client";

import { motion, Variants } from "framer-motion";
import type { Education as EducationType } from "@/types/portfolio";

interface Props {
    items: EducationType[];
    onItemClick?: (item: EducationType) => void;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
        },
    },
};

export default function Education({ items, onItemClick }: Props) {
    if (!items || items.length === 0) return null;

    return (
        <div className="container">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title">Education</h2>
            </motion.div>
            <motion.div
                className="projects-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {items.map((item) => (
                    <motion.article
                        key={item.id}
                        variants={cardVariants}
                        whileHover={{ y: -8, scale: 1.01 }}
                        className="project-card"
                        tabIndex={0}
                        role="button"
                        onClick={() => onItemClick?.(item)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                onItemClick?.(item);
                            }
                        }}
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
                    </motion.article>
                ))}
            </motion.div>
        </div>
    );
}
