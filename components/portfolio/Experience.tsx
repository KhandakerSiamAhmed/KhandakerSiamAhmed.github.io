"use client";

import { motion, Variants } from "framer-motion";
import type { Experience as ExperienceType } from "@/types/portfolio";
import ViewMoreButton from "./ViewMoreButton";

interface Props {
    items: ExperienceType[];
    limit?: number;
    viewAllHref?: string;
    totalCount?: number;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 12,
        },
    },
};

export default function Experience({ items, limit, viewAllHref, totalCount }: Props) {
    if (!items || items.length === 0) return null;

    const displayed = limit ? items.slice(0, limit) : items;

    return (
        <div className="container">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title">Experience</h2>
            </motion.div>
            <motion.div
                className="timeline"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {displayed.map((item) => (
                    <motion.div
                        key={item.id}
                        className="timeline-item active"
                        variants={itemVariants}
                    >
                        <span className="timeline-date">{item.date}</span>
                        <h3 className="timeline-title">{item.role}</h3>
                        <span className="timeline-org">{item.company}</span>
                        <div className="timeline-desc" style={{ marginTop: "0.5rem" }}>
                            {item.description?.split('\n').filter(Boolean).map((line, i) => (
                                <p key={i} style={{ marginBottom: line.trim() === '' ? '0' : '0.5rem' }}>
                                    {line}
                                </p>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {viewAllHref && (
                <ViewMoreButton href={viewAllHref} label={`View All Experience (${totalCount ?? items.length})`} />
            )}
        </div>
    );
}
