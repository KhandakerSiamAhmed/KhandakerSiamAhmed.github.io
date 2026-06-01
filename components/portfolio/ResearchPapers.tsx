"use client";

import { motion, Variants } from "framer-motion";
import type { ResearchPaper } from "@/types/portfolio";
import ViewMoreButton from "./ViewMoreButton";

interface Props {
    items: ResearchPaper[];
    limit?: number;
    viewAllHref?: string;
    totalCount?: number;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 12 },
    },
};

function DoiIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    );
}

function BookIcon() {
    return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
    );
}

export default function ResearchPapers({ items, limit, viewAllHref, totalCount }: Props) {
    if (!items || items.length === 0) return null;

    const displayed = limit ? items.slice(0, limit) : items;

    return (
        <div className="container" id="research">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="section-title">Research Papers</h2>
                <p className="section-subtitle">Peer-reviewed publications and academic contributions.</p>
            </motion.div>

            <motion.div
                className="research-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {displayed.map((paper) => (
                    <motion.article
                        key={paper.id}
                        variants={cardVariants}
                        whileHover={{ y: -6, scale: 1.01 }}
                        className="research-card"
                    >
                        {/* Paper thumbnail */}
                        <div className="research-card-image">
                            {paper.imageurl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={paper.imageurl}
                                    alt={paper.title}
                                    loading="lazy"
                                />
                            ) : (
                                <div className="research-card-placeholder">
                                    <BookIcon />
                                </div>
                            )}
                        </div>

                        {/* Paper content */}
                        <div className="research-card-content">
                            {/* Meta row */}
                            <div className="research-card-meta">
                                {paper.journal && (
                                    <span className="research-journal">{paper.journal}</span>
                                )}
                                {paper.year && (
                                    <span className="research-year">{paper.year}</span>
                                )}
                            </div>

                            <h3 className="research-title">{paper.title}</h3>

                            {paper.authors && (
                                <p className="research-authors">{paper.authors}</p>
                            )}

                            {paper.abstract && (
                                <p className="research-abstract">{paper.abstract}</p>
                            )}

                            {/* DOI link */}
                            {paper.doi && (
                                <a
                                    href={`https://doi.org/${paper.doi}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="research-doi-btn"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <DoiIcon />
                                    <span>View Paper (DOI)</span>
                                </a>
                            )}
                        </div>
                    </motion.article>
                ))}
            </motion.div>

            {viewAllHref && (
                <ViewMoreButton href={viewAllHref} label={`View All Papers (${totalCount ?? items.length})`} />
            )}
        </div>
    );
}
