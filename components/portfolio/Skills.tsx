"use client";

import { useState } from "react";
import type { Skill } from "@/types/portfolio";

interface Props {
    items: Skill[];
}

interface ParsedSkill {
    id: string;
    name: string;
}

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
            <div className="section-header">
                <h2 className="section-title">Technical Skills</h2>
            </div>

            {hasCategories && (
                <div className="section-tabs">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`section-tab ${activeTab === cat ? "active" : ""}`}
                            onClick={() => setActiveTab(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}

            <div className="skill-items" style={{ justifyContent: "center", gap: "1rem" }}>
                {visibleSkills.map((item) => (
                    <span key={item.id} className="skill-pill">
                        {item.name}
                    </span>
                ))}
            </div>
        </div>
    );
}
