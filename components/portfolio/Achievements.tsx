"use client";

import { motion, Variants } from "framer-motion";
import type { Achievement } from "@/types/portfolio";
import ViewMoreButton from "./ViewMoreButton";

interface Props {
    items: Achievement[];
    onItemClick?: (item: Achievement) => void;
    limit?: number;
    viewAllHref?: string;
    totalCount?: number;
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

export default function Achievements({ items, onItemClick, limit, viewAllHref, totalCount }: Props) {
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
                <h2 className="section-title">Achievements</h2>
            </motion.div>
            <motion.div
                className="projects-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {displayed.map((item) => (
                    <motion.div
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
                    </motion.div>
                ))}
            </motion.div>

            {viewAllHref && (
                <ViewMoreButton href={viewAllHref} label={`View All Achievements (${totalCount ?? items.length})`} />
            )}
        </div>
    );
}
