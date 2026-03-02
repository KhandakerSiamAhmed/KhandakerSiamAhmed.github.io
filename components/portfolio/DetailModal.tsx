"use client";

interface Props {
    item: Record<string, unknown>;
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

export default function DetailModal({ item, onClose }: Props) {
    const bannerImg = (item.bannerurl as string) || (item.imageurl as string);
    const embedUrl = getYouTubeEmbedUrl(item.youtubeurl as string | undefined);
    const isEdu = item.school !== undefined;

    const techstack: string[] = Array.isArray(item.techstack)
        ? item.techstack
        : typeof item.techstack === "string"
            ? item.techstack.split(",").map((s: string) => s.trim())
            : [];

    return (
        <div
            className="modal-overlay open"
            onClick={(e) => {
                if ((e.target as HTMLElement).classList.contains("modal-overlay")) onClose();
            }}
        >
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <div className="modal-body" id="modal-body-content">
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
                                <span className="project-status">
                                    {item.start_year as string} - {item.end_year as string}
                                </span>
                                <h2 className="modal-title" style={{ marginTop: "10px" }}>
                                    {item.school as string}
                                </h2>
                                <p className="modal-subtitle">{item.major as string}</p>
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
                                style={{ marginTop: "1rem" }}
                            >
                                View Project
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
