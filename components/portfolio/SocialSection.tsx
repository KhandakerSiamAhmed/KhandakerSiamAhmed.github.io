"use client";

import { motion, Variants } from "framer-motion";

/* ── Social links sorted by importance ── */
const SOCIAL_LINKS = [
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/khandakersiamahmed/",
        description: "Khandaker Siam Ahmed's professional profile on LinkedIn — connect for networking, collaborations, and career opportunities.",
        color: "#0A66C2",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        name: "GitHub",
        url: "https://github.com/KhandakerSiamAhmed",
        description: "Khandaker Siam Ahmed's open-source projects and code repositories on GitHub.",
        color: "#f0f0f0",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: "ResearchGate",
        url: "https://www.researchgate.net/profile/Khandaker-Ahmed-9?ev=hdr_xprf",
        description: "Khandaker Siam Ahmed's academic research publications and scientific contributions on ResearchGate.",
        color: "#00CCBB",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.123 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53h-.005a3.334 3.334 0 0 0 .113.438c.245.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.385-.348.664-.638.876-.29.212-.738.35-1.227.35-.545 0-.901-.15-1.21-.353-.306-.203-.517-.454-.67-.915a3.136 3.136 0 0 1-.147-.762 17.366 17.367 0 0 1-.034-.656c-.01-.26-.014-.572-.014-.939a26.401 26.403 0 0 1 .014-.938 15.821 15.822 0 0 1 .035-.656 3.19 3.19 0 0 1 .148-.76 1.89 1.89 0 0 1 .742-1.01c.344-.244.593-.352 1.137-.352.508 0 .815.096 1.144.303.33.207.528.492.764.925.047.094.111.118.198.07l1.044-.43c.075-.048.09-.115.042-.199a3.549 3.549 0 0 0-.466-.742 3 3 0 0 0-.679-.607 3.313 3.313 0 0 0-.903-.41A4.068 4.068 0 0 0 19.586 0zM8.217 5.836c-1.69 0-3.036.086-4.297.086-1.146 0-2.291 0-3.007-.029v.831l1.088.2c.744.144 1.174.488 1.174 2.264v11.288c0 1.777-.43 2.12-1.174 2.263l-1.088.2v.832c.773-.029 2.12-.086 3.465-.086 1.29 0 2.951.057 3.667.086v-.831l-1.49-.2c-.773-.115-1.174-.487-1.174-2.264v-4.784c.688.057 1.29.057 2.206.057 1.748 3.123 3.41 5.472 4.355 6.56.86 1.032 2.177 1.691 3.839 1.691.487 0 1.003-.086 1.318-.23v-.744c-1.031 0-2.063-.716-2.808-1.518-1.26-1.376-2.95-3.582-4.355-6.074 2.32-.545 4.04-2.722 4.04-4.9 0-3.208-2.492-4.698-5.758-4.698zm-.515 1.29c2.406 0 3.839 1.26 3.839 3.552 0 2.263-1.547 3.782-4.097 3.782-.974 0-1.404-.03-2.063-.086v-7.19c.66-.059 1.547-.059 2.32-.059z" />
            </svg>
        ),
    },
    {
        name: "ORCID",
        url: "https://orcid.org/my-orcid?orcid=0009-0002-6427-2956",
        description: "Khandaker Siam Ahmed's ORCID iD — a unique researcher identifier linking academic publications and scholarly work.",
        color: "#A6CE39",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
            </svg>
        ),
    },
    {
        name: "Instructables",
        url: "https://www.instructables.com/member/khandakersiamahmed/",
        description: "Khandaker Siam Ahmed's DIY projects, tutorials, and maker guides on Instructables.",
        color: "#FEBF01",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.824a9.176 9.176 0 110 18.352 9.176 9.176 0 010-18.352zM8.4 7.2a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6zm7.2 0a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6zM7.2 14.4s1.44 2.4 4.8 2.4 4.8-2.4 4.8-2.4H7.2z" />
            </svg>
        ),
    },
    {
        name: "Hackaday",
        url: "https://hackaday.io/khandakersiamahmed",
        description: "Khandaker Siam Ahmed's hardware hacking and electronics projects on Hackaday.io.",
        color: "#1A1A1A",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M0 4.124c0-.204.021-.401.06-.595l1.956 1.734 2.144-2.38L2.246 1.18c.259-.072.53-.114.812-.114a3.062 3.062 0 0 1 3.058 3.037v.021c0 .152-.012.304-.033.45l2.385 2.112a6.716 6.716 0 0 0-2.013 2.54L3.982 7.037a3.038 3.038 0 0 1-.924.145A3.06 3.06 0 0 1 0 4.124zm20.942 12.694c-.306 0-.601.045-.88.129l-2.308-2.044a6.862 6.862 0 0 1-1.819 2.706l1.993 1.765a3.05 3.05 0 0 0-.044.502 3.06 3.06 0 0 0 3.935 2.929l-1.992-1.77 2.14-2.365 1.981 1.76c.034-.181.052-.364.052-.554v-.026a3.057 3.057 0 0 0-3.058-3.032zm-3.397-7.592l2.473-2.189c.292.093.601.145.924.145A3.06 3.06 0 0 0 23.94 3.53l-1.956 1.734-2.144-2.38 1.914-1.703a3.049 3.049 0 0 0-.812-.114 3.062 3.062 0 0 0-3.058 3.037v.021c0 .152.012.304.033.45l-2.385 2.112a6.716 6.716 0 0 1 2.013 2.54zm-11.3 5.677l-2.307 2.044A3.057 3.057 0 0 0 0 19.85v.026c0 .19.018.373.052.554l1.982-1.76 2.14 2.365-1.993 1.77a3.06 3.06 0 0 0 3.935-2.929 3.05 3.05 0 0 0-.044-.502l1.993-1.765a6.862 6.862 0 0 1-1.82-2.706zm8.971 2.657a1.076 1.076 0 1 1-1.961.424h-.192a1.076 1.076 0 1 1-2.127 0h-.15A1.105 1.105 0 0 1 9.7 19.23c-.604 0-1.094-.5-1.094-1.115 0-.21.057-.405.156-.572-1.493-1.142-2.474-3.051-2.474-5.213 0-3.497 2.559-6.332 5.713-6.332s5.713 2.835 5.713 6.332c0 2.173-.991 4.091-2.497 5.231zm-4.194-5.914a1.995 1.995 0 0 0-.559-.66 1.804 1.804 0 0 0-.918-.264 1.45 1.45 0 0 0-.319.036c-.405.05-.747.327-.983.647-.207.257-.368.569-.372.905-.032.278.024.556.075.828.066.322.293.584.55.774.119.095.29.226.44.116.1-.134.016-.33.107-.478a.5.5 0 0 1 .258-.326c.263-.132.527-.262.808-.355.228-.067.416-.219.61-.349.255-.197.424-.558.303-.874zm.996 2.325c-.279-.007-.63 1.237-.574 1.78.175.72.237-.505.574-.506.323.014.275 1.255.53.504.078-.5-.224-1.77-.53-1.778zm4.036-.833c.051-.272.107-.55.075-.828-.004-.336-.165-.648-.372-.905-.236-.32-.578-.596-.983-.647a1.45 1.45 0 0 0-.319-.036c-.32-.001-.644.1-.918.264-.235.171-.42.406-.559.66-.121.316.048.677.303.874.194.13.382.282.61.35.28.092.545.222.808.354a.5.5 0 0 1 .258.326c.091.147.007.344.106.478.151.11.322-.021.44-.116.258-.19.485-.452.551-.774z" />
            </svg>
        ),
    },
    {
        name: "GrabCAD",
        url: "https://grabcad.com/khandaker.siam.ahmed-2",
        description: "Khandaker Siam Ahmed's 3D CAD models and mechanical engineering designs on GrabCAD.",
        color: "#FFBA00",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        ),
    },
    {
        name: "Facebook",
        url: "https://www.facebook.com/khandaker.siam.ahmed.mahin",
        description: "Khandaker Siam Ahmed's Facebook profile — follow for updates, posts, and social connections.",
        color: "#0866FF",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
    },
];

/* ── Framer Motion variants ── */
const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
};

import type { PortfolioConfig } from "@/types/portfolio";
import ViewMoreButton from "./ViewMoreButton";

interface Props {
    limit?: number;
    viewAllHref?: string;
    config?: PortfolioConfig | null;
}

export default function SocialSection({ limit, viewAllHref, config }: Props) {
    // If we have dynamic config, use it. Otherwise fallback to hardcoded list (or empty array)
    let dynamicLinks = SOCIAL_LINKS;
    
    if (config?.socials) {
        // Filter out links that don't exist in config, or update their URLs
        const active = SOCIAL_LINKS.filter(l => {
            const key = l.name.toLowerCase();
            return !!(config.socials as any)[key];
        }).map(l => {
            const key = l.name.toLowerCase();
            return { ...l, url: (config.socials as any)[key] };
        });

        // Use priorities if available
        if (config.socialPriority) {
            active.sort((a, b) => {
                const keyA = a.name.toLowerCase();
                const keyB = b.name.toLowerCase();
                const valA = (config.socialPriority as any)[keyA];
                const valB = (config.socialPriority as any)[keyB];
                const pA = (valA !== undefined && valA !== null && valA !== "") ? Number(valA) : Infinity;
                const pB = (valB !== undefined && valB !== null && valB !== "") ? Number(valB) : Infinity;
                return pA - pB;
            });
        }
        dynamicLinks = active;
    }

    const displayed = limit ? dynamicLinks.slice(0, limit) : dynamicLinks;
    
    return (
        <div className="container">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title">Find Me Online</h2>
                <p className="section-subtitle">
                    Find me across the web — from professional networks and academic research to open-source code and maker communities.
                </p>
            </motion.div>

            <motion.nav
                aria-label="Social media profiles of Khandaker Siam Ahmed"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
            >
                <ul className="social-grid" role="list">
                    {displayed.map((link) => (
                        <motion.li key={link.name} variants={cardVariants}>
                            <motion.a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer me"
                                className="social-card"
                                title={link.description}
                                aria-label={`Visit Khandaker Siam Ahmed on ${link.name}`}
                                whileHover={{ y: -6, scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            >
                                <span className="social-card-icon">{link.icon}</span>
                                <span className="social-card-name">{link.name}</span>
                                <span className="social-card-arrow">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <line x1="7" y1="17" x2="17" y2="7" />
                                        <polyline points="7 7 17 7 17 17" />
                                    </svg>
                                </span>
                                {/* SEO-hidden descriptive text */}
                                <span className="sr-only">{link.description}</span>
                            </motion.a>
                        </motion.li>
                    ))}
                </ul>
            </motion.nav>

            {viewAllHref && dynamicLinks.length > (limit ?? 0) && (
                <ViewMoreButton href={viewAllHref} label={`View All Socials (${dynamicLinks.length})`} />
            )}
        </div>
    );
}
