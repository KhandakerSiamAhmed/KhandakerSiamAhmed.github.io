"use client";

type Variant = "home" | "grid" | "timeline" | "skills" | "social";

interface Props {
    variant?: Variant;
}

/* ── Grid skeleton: 3 cards ── */
function GridSkeleton() {
    return (
        <div style={{
            minHeight: "100vh",
            background: "var(--bg-primary)",
            padding: "calc(80px + 2rem) 1rem 4rem",
        }}>
            <div className="container">
                {/* Section header */}
                <div style={{ marginBottom: "2.5rem" }}>
                    <div className="skeleton" style={{ width: "200px", height: "2.2rem", marginBottom: "0.75rem", maxWidth: "100%" }} />
                    <div className="skeleton" style={{ width: "320px", height: "1rem", maxWidth: "100%" }} />
                </div>
                {/* Cards grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
                    gap: "2rem",
                }}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} style={{
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "12px",
                            overflow: "hidden",
                        }}>
                            <div className="skeleton" style={{ width: "100%", aspectRatio: "1/1", maxHeight: "200px" }} />
                            <div style={{ padding: "1.5rem" }}>
                                <div className="skeleton" style={{ width: "80px", height: "1.2rem", marginBottom: "0.75rem", borderRadius: "20px" }} />
                                <div className="skeleton" style={{ width: "100%", height: "1.4rem", marginBottom: "0.5rem" }} />
                                <div className="skeleton" style={{ width: "75%", height: "1rem", marginBottom: "0.5rem" }} />
                                <div className="skeleton" style={{ width: "60%", height: "1rem", marginBottom: "1rem" }} />
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <div className="skeleton" style={{ width: "60px", height: "1.6rem", borderRadius: "20px" }} />
                                    <div className="skeleton" style={{ width: "50px", height: "1.6rem", borderRadius: "20px" }} />
                                    <div className="skeleton" style={{ width: "70px", height: "1.6rem", borderRadius: "20px" }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── Timeline skeleton ── */
function TimelineSkeleton() {
    return (
        <div style={{
            minHeight: "100vh",
            background: "var(--bg-primary)",
            padding: "calc(80px + 2rem) 1rem 4rem",
        }}>
            <div className="container">
                <div style={{ marginBottom: "2.5rem" }}>
                    <div className="skeleton" style={{ width: "180px", height: "2.2rem", maxWidth: "100%" }} />
                </div>
                <div style={{ borderLeft: "2px solid var(--border-color)", paddingLeft: "2rem" }}>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} style={{ marginBottom: "3rem", position: "relative" }}>
                            <div style={{
                                position: "absolute",
                                left: "-2.4rem",
                                top: "4px",
                                width: "12px",
                                height: "12px",
                                background: "var(--bg-secondary)",
                                border: "2px solid var(--border-color)",
                                borderRadius: "50%",
                            }} />
                            <div className="skeleton" style={{ width: "100px", height: "0.85rem", marginBottom: "0.6rem" }} />
                            <div className="skeleton" style={{ width: "60%", height: "1.25rem", marginBottom: "0.4rem" }} />
                            <div className="skeleton" style={{ width: "40%", height: "1rem", marginBottom: "0.8rem" }} />
                            <div className="skeleton" style={{ width: "100%", height: "0.9rem", marginBottom: "0.3rem" }} />
                            <div className="skeleton" style={{ width: "90%", height: "0.9rem" }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── Skills pill skeleton ── */
function SkillsSkeleton() {
    const widths = [80, 110, 90, 130, 70, 100, 85, 120, 75, 95, 115, 65, 105];
    return (
        <div style={{
            minHeight: "100vh",
            background: "var(--bg-primary)",
            padding: "calc(80px + 2rem) 1rem 4rem",
        }}>
            <div className="container">
                <div style={{ marginBottom: "2.5rem" }}>
                    <div className="skeleton" style={{ width: "200px", height: "2.2rem", maxWidth: "100%" }} />
                </div>
                {/* Category tabs skeleton */}
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                    {[90, 60, 110, 75, 85].map((w, i) => (
                        <div key={i} className="skeleton" style={{ width: `${w}px`, height: "2rem", borderRadius: "6px" }} />
                    ))}
                </div>
                {/* Pill cloud */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                    {widths.map((w, i) => (
                        <div key={i} className="skeleton" style={{ width: `${w}px`, height: "2.2rem", borderRadius: "6px" }} />
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── Social cards skeleton ── */
function SocialSkeleton() {
    return (
        <div style={{
            minHeight: "100vh",
            background: "var(--bg-primary)",
            padding: "calc(80px + 2rem) 1rem 4rem",
        }}>
            <div className="container">
                <div style={{ marginBottom: "2.5rem" }}>
                    <div className="skeleton" style={{ width: "220px", height: "2.2rem", marginBottom: "0.75rem", maxWidth: "100%" }} />
                    <div className="skeleton" style={{ width: "340px", height: "1rem", maxWidth: "100%" }} />
                </div>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
                    gap: "1rem",
                }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} style={{
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "12px",
                            padding: "1.2rem 1.5rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                        }}>
                            <div className="skeleton" style={{ width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0 }} />
                            <div className="skeleton" style={{ flex: 1, height: "1.1rem" }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── Home skeleton (original hero skeleton) ── */
function HomeSkeleton() {
    return (
        <div className="site-loader" style={{ display: "block", paddingTop: "0" }}>
            {/* Navbar Skeleton */}
            <div style={{ padding: "1.25rem 0", borderBottom: "1px solid var(--border-color)", background: "transparent" }}>
                <div className="container nav-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="skeleton" style={{ width: "150px", height: "32px", borderRadius: "4px" }} />
                    <ul className="nav-menu" style={{ margin: 0, padding: 0 }}>
                        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <li key={i}>
                                <div className="skeleton" style={{ width: "60px", height: "18px" }} />
                            </li>
                        ))}
                    </ul>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div className="skeleton" style={{ width: "68px", height: "32px", borderRadius: "4px" }} />
                        <div className="nav-toggle" style={{ display: "flex", flexDirection: "column", gap: "5px", background: "none", cursor: "default" }}>
                            <div className="skeleton" style={{ width: "24px", height: "2px" }} />
                            <div className="skeleton" style={{ width: "24px", height: "2px" }} />
                            <div className="skeleton" style={{ width: "24px", height: "2px" }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Skeleton — same DOM order as real Hero: content first, visual second.
                On desktop (row): text=left, image=right.
                On mobile (column-reverse): image shows on top, text below. */}
            <div className="container hero-container" style={{ paddingTop: "5rem", paddingBottom: "3rem" }}>
                {/* Text side (left on desktop, bottom on mobile) */}
                <div className="hero-content">
                    <div className="skeleton" style={{ width: "80%", height: "3.5rem", marginBottom: "1rem" }} />
                    <div className="skeleton" style={{ width: "60%", height: "3.5rem", marginBottom: "2rem" }} />
                    <div className="skeleton" style={{ width: "95%", height: "1.2rem", marginBottom: "0.5rem" }} />
                    <div className="skeleton" style={{ width: "80%", height: "1.2rem", marginBottom: "0.5rem" }} />
                    <div className="skeleton" style={{ width: "70%", height: "1.2rem", marginBottom: "2rem" }} />
                    <div className="hero-cta" style={{ marginTop: "1rem" }}>
                        <div className="skeleton" style={{ width: "150px", height: "3rem", borderRadius: "8px" }} />
                        <div className="skeleton" style={{ width: "140px", height: "3rem", borderRadius: "8px" }} />
                    </div>
                </div>

                {/* Image side (right on desktop, top on mobile via column-reverse) */}
                <div className="hero-visual">
                    <div className="hero-image-container">
                        <div className="skeleton" style={{ width: "280px", height: "280px", borderRadius: "50%", maxWidth: "100%" }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Preloader({ variant = "home" }: Props) {
    if (variant === "grid") return <GridSkeleton />;
    if (variant === "timeline") return <TimelineSkeleton />;
    if (variant === "skills") return <SkillsSkeleton />;
    if (variant === "social") return <SocialSkeleton />;
    return <HomeSkeleton />;
}
