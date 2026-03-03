"use client";

import { useEffect, useState } from "react";

const THEMES = [
    { id: "default",   label: "Default" },
    { id: "titanium",  label: "Titanium" },
    { id: "blueprint", label: "Blueprint" },
    { id: "light",     label: "Light" },
    { id: "forest",    label: "Forest" },
    { id: "sunset",    label: "Sunset" },
    { id: "aurora",    label: "Aurora" },
    { id: "ocean",     label: "Ocean" },
];

export default function ThemeSwitcher() {
    const [current, setCurrent] = useState("default");

    useEffect(() => {
        const saved = localStorage.getItem("site-theme") || "default";
        setCurrent(saved);
    }, []);

    const cycle = () => {
        const idx = THEMES.findIndex((t) => t.id === current);
        const next = THEMES[(idx + 1) % THEMES.length];
        const nextId = next.id;

        document.documentElement.setAttribute("data-theme", nextId);
        localStorage.setItem("site-theme", nextId);

        if (nextId === "titanium") {
            document.body.classList.add("grid-bg");
        } else {
            document.body.classList.remove("grid-bg");
        }

        setCurrent(nextId);
    };

    const label = THEMES.find((t) => t.id === current)?.label ?? "Theme";

    return (
        <button
            className="theme-switcher-btn"
            onClick={cycle}
            title={`Current theme: ${label}. Click to cycle.`}
            aria-label={`Switch theme. Current: ${label}`}
        >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
            {label}
        </button>
    );
}
