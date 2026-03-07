import { motion, Variants } from "framer-motion";
import { Box, Code, Cpu, Lightbulb, CheckCircle2 } from "lucide-react";
import type { Skill } from "@/types/portfolio";
import ViewMoreButton from "./ViewMoreButton";

interface Props {
    items: Skill[];
    limit?: number;
    viewAllHref?: string;
    totalCount?: number;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants: Variants = {
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

const categories = [
    {
        title: "CAD & Simulation",
        icon: <Box size={24} className="text-[var(--primary-color)]" />,
        skills: ["SolidWorks (CSWA)", "Blender", "FEA"]
    },
    {
        title: "Languages & Web",
        icon: <Code size={24} className="text-[var(--primary-color)]" />,
        skills: ["C/C++", "Python", "JavaScript", "HTML/CSS"]
    },
    {
        title: "Hardware & Microcontrollers",
        icon: <Cpu size={24} className="text-[var(--primary-color)]" />,
        skills: ["ESP32", "Arduino"]
    },
    {
        title: "Core Disciplines",
        icon: <Lightbulb size={24} className="text-[var(--primary-color)]" />,
        skills: ["Control Theory", "Kinematics"]
    }
];

export default function Skills({ limit, viewAllHref, totalCount, items }: Props) {
    // If you want to use limit effectively without slicing categories:
    const displayCategories = limit ? categories.slice(0, 4) : categories;

    return (
        <div className="container" style={{ padding: "0 1rem" }}>
            <motion.div
                className="section-header text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: "center", marginBottom: "3rem" }}
            >
                <h2 className="section-title" style={{ display: "inline-block" }}>Technical Skills</h2>
            </motion.div>

            <motion.div
                className="skills-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "2rem",
                    marginBottom: "3rem"
                }}
            >
                {displayCategories.map((group, idx) => (
                    <motion.div
                        key={idx}
                        className="skill-card bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                        variants={cardVariants}
                        whileHover={{ y: -5, boxShadow: "0 10px 30px -15px var(--primary-color)" }}
                        style={{
                            padding: "2rem",
                            borderRadius: "1rem",
                            backgroundColor: "var(--bg-secondary)",
                            border: "1px solid var(--border-color)",
                            transition: "all 0.3s ease"
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                            <div style={{
                                padding: "0.75rem",
                                borderRadius: "0.5rem",
                                backgroundColor: "rgba(var(--primary-color-rgb, 0, 255, 150), 0.1)"
                            }}>
                                {group.icon}
                            </div>
                            <h3 style={{ fontSize: "1.25rem", margin: 0, fontWeight: 600 }}>{group.title}</h3>
                        </div>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {group.skills.map((skill, sIdx) => (
                                <li key={sIdx} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                    <CheckCircle2 size={16} style={{ color: "var(--primary-color)" }} />
                                    <span style={{ color: "var(--text-secondary)" }}>{skill}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>

            {viewAllHref && (
                <ViewMoreButton href={viewAllHref} label={`View All Skills (${totalCount ?? items.length})`} />
            )}
        </div>
    );
}
