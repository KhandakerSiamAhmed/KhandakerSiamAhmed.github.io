"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import type { Skill } from "@/types/portfolio";

interface Props {
    items: Skill[];
}

interface ParsedSkill {
    id: string;
    name: string;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
        },
    },
};

export default function Skills({ items }: Props) {
    const [activeTab, setActiveTab] = useState("All");

    if (!items || items.length === 0) return null;

    // Parse "Category: Skill Name" convention
    const grouped = new Map<string, ParsedSkill[]>();
    items.forEach((item) => {
        const colonIdx = item.name.indexOf(":");
        const cat = colonIdx > -1 ? item.name.slice(0, colonIdx).trim() : "General";
        const name = colonIdx > -1 ? item.name.slice(colonIdx + 1).trim() : item.name;
        if (!grouped.has(cat)) grouped.set(cat, []);
        grouped.get(cat)!.push({ id: item.id, name });
    });

    const hasCategories = grouped.size > 1 || !grouped.has("General");
    const categories = ["All", ...Array.from(grouped.keys())];

    const visibleSkills: ParsedSkill[] =
        activeTab === "All"
            ? Array.from(grouped.values()).flat()
            : grouped.get(activeTab) ?? [];

    return (
        <div className="container">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title">Technical Skills</h2>
            </motion.div>

            {hasCategories && (
                <motion.div
                    className="section-tabs"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`section-tab ${activeTab === cat ? "active" : ""}`}
                            onClick={() => setActiveTab(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>
            )}

            <motion.div
                className="skill-items"
                style={{ justifyContent: "center", gap: "1rem" }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {visibleSkills.map((item) => (
                    <motion.span
                        key={item.id}
                        className="skill-pill"
                        variants={itemVariants}
                        whileHover={{ scale: 1.1, backgroundColor: "var(--primary-color)", color: "var(--bg-primary)" }}
                    >
                        {item.name}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}
