"use client";

import { useEffect } from "react";

interface Props {
    item: Record<string, unknown>;
    type: "project" | "education" | "achievement";
    onClose: () => void;
}

function getYouTubeEmbedUrl(url: string | undefined): string | null {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
        ? `https://www.youtube.com/embed/${match[2]}`
        : null;
}

export default function DetailModal({ item, type, onClose }: Props) {
    const bannerImg = (item.bannerurl as string) || (item.imageurl as string);
    const embedUrl = getYouTubeEmbedUrl(item.youtubeurl as string | undefined);
    const isEdu = type === "education";

    const techstack: string[] = Array.isArray(item.techstack)
        ? item.techstack
        : typeof item.techstack === "string"
            ? item.techstack.split(",").map((s: string) => s.trim())
            : [];

    const pageTitle = isEdu
        ? (item.school as string)
        : (item.title as string);

    useEffect(() => {
        const prev = document.title;
        if (pageTitle) document.title = `${pageTitle} | Portfolio`;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);

        return () => {
            document.title = prev;
            document.removeEventListener("keydown", onKey);
        };
    }, [pageTitle, onClose]);

    return (
        <div className="detail-overlay" role="dialog" aria-modal="true" aria-label={pageTitle}>
            <div className="detail-overlay-nav">
                <button className="detail-back-btn" onClick={onClose}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.5rem" }}>
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
            </div>

            <div className="detail-overlay-body">
                {/* Media */}
                {embedUrl ? (
                    <div className="video-container">
                        <iframe src={embedUrl} allowFullScreen title="Video" />
                    </div>
                ) : bannerImg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={bannerImg} className="modal-banner" alt="Banner" loading="lazy" />
                ) : null}

                {/* Header */}
                <div className="modal-header">
                    {isEdu ? (
                        <>
                            <span className="project-status" style={{ borderColor: "var(--text-secondary)", color: "var(--text-secondary)" }}>
                                {item.start_year as string} – {(item.end_year as string) || "Present"}
                            </span>
                            <h2 className="modal-title" style={{ marginTop: "10px" }}>
                                {item.school as string}
                            </h2>
                            <p className="modal-subtitle">{item.major as string}</p>
                            {item.cgpa && (
                                <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                                    CGPA: <strong style={{ color: "var(--text-primary)" }}>{item.cgpa as string}</strong>
                                </p>
                            )}
                        </>
                    ) : (
                        <>
                            {item.status && <span className="project-status">{item.status as string}</span>}
                            <h2 className="modal-title" style={{ marginTop: "10px" }}>
                                {item.title as string}
                            </h2>
                            <p className="modal-subtitle">{(item.category as string) || ""}</p>
                        </>
                    )}
                </div>

                {/* Info */}
                <div className="modal-info">
                    {typeof item.description === "string" && item.description && (
                        <p
                            dangerouslySetInnerHTML={{
                                __html: item.description.replace(/\n/g, "<br>"),
                            }}
                        />
                    )}

                    {techstack.length > 0 && (
                        <div className="modal-tech">
                            {techstack.map((t, i) => (
                                <span key={i} className="skill-pill">{t}</span>
                            ))}
                        </div>
                    )}

                    {typeof item.link === "string" && item.link && (
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{ marginTop: "1.5rem", display: "inline-flex" }}
                        >
                            View Project
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
