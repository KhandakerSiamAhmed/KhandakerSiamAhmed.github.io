import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
    themeColor: "#0a192f",
    colorScheme: "dark",
};

export const metadata: Metadata = {
    metadataBase: new URL("https://khandakersiamahmed.github.io"),
    title: {
        default: "Khandaker Siam Ahmed | Mechanical Engineer & Robotics Portfolio",
        template: "%s | Khandaker Siam Ahmed",
    },
    description:
        "Official portfolio of Khandaker Siam Ahmed, a Mechanical Engineer specializing in Robotics, Mechatronics, and Intelligent Control Systems. Expert in CAD design, mechatronics, and innovative engineering solutions.",
    applicationName: "Khandaker Siam Ahmed Portfolio",
    authors: [{ name: "Khandaker Siam Ahmed", url: "https://khandakersiamahmed.github.io" }],
    generator: "Next.js",
    keywords: [
        "Khandaker Siam Ahmed",
        "Khandaker Siam Ahmed Portfolio",
        "Mechanical Engineer",
        "Robotics Engineer",
        "Mechatronics Specialist",
        "Intelligent Control Systems",
        "CAD Designer",
        "SolidWorks Expert",
        "Arduino Projects",
        "Engineering Portfolio",
        "Bangladesh Engineer",
        "Mechanical Design",
        "IoT Developer",
        "Hardware Interfacing",
        "LFR",
        "Line Follower Robot"
    ],
    referrer: "origin-when-cross-origin",
    creator: "Khandaker Siam Ahmed",
    publisher: "Khandaker Siam Ahmed",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    alternates: {
        canonical: "/",
    },
    verification: {
        google: "DQvo7WOvqO52Tp9gVPZLT7YcOadgT5V5DZ0YAyhPQQk",
    },
    openGraph: {
        title: "Khandaker Siam Ahmed | Mechanical Engineer & Robotics Portfolio",
        description:
            "Official portfolio of Khandaker Siam Ahmed, a Mechanical Engineer specializing in Robotics, Mechatronics, and Intelligent Control Systems. Expert in CAD design, mechatronics, and innovative engineering solutions.",
        url: "https://khandakersiamahmed.github.io/",
        siteName: "Khandaker Siam Ahmed Portfolio",
        images: [
            {
                url: "/assets/social-preview.svg",
                width: 1200,
                height: 630,
                alt: "Khandaker Siam Ahmed Portfolio Preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Khandaker Siam Ahmed | Mechanical Engineer & Robotics Portfolio",
        description:
            "Official portfolio of Khandaker Siam Ahmed, a Mechanical Engineer specializing in Robotics, Mechatronics, and Intelligent Control Systems. Expert in CAD design, mechatronics, and innovative engineering solutions.",
        images: ["/assets/social-preview.svg"],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/assets/Logo.png",
        shortcut: "/assets/Logo.png",
        apple: "/assets/Logo.png",
        other: {
            rel: "apple-touch-icon-precomposed",
            url: "/assets/Logo.png",
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@500;700;800&family=Rajdhani:wght@500;600;700&family=Fira+Code:wght@400;500&display=swap"
                    rel="stylesheet"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([
                            {
                                "@context": "https://schema.org",
                                "@type": "WebSite",
                                name: "Khandaker Siam Ahmed Portfolio",
                                url: "https://khandakersiamahmed.github.io/",
                                description: "Official portfolio of Khandaker Siam Ahmed, a Mechanical Engineer specializing in Robotics and Intelligent Control Systems.",
                                publisher: {
                                    "@type": "Person",
                                    name: "Khandaker Siam Ahmed"
                                }
                            },
                            {
                                "@context": "https://schema.org",
                                "@type": "Person",
                                name: "Khandaker Siam Ahmed",
                                url: "https://khandakersiamahmed.github.io/",
                                image: "https://khandakersiamahmed.github.io/assets/Logo.png",
                                sameAs: [
                                    "https://www.linkedin.com/in/khandakersiamahmed/",
                                    "https://github.com/KhandakerSiamAhmed",
                                    "https://www.researchgate.net/profile/Khandaker-Ahmed-9",
                                    "https://orcid.org/0009-0002-6427-2956",
                                    "https://www.instructables.com/member/khandakersiamahmed/",
                                    "https://hackaday.io/khandakersiamahmed",
                                    "https://grabcad.com/khandaker.siam.ahmed-2",
                                    "https://www.facebook.com/khandaker.siam.ahmed.mahin",
                                ],
                                jobTitle: "Mechanical Engineer & Robotics Specialist",
                                worksFor: {
                                    "@type": "Organization",
                                    name: "Freelance",
                                },
                                description: "Official portfolio of Khandaker Siam Ahmed, a Mechanical Engineer specializing in Robotics, Mechatronics, and Intelligent Control Systems.",
                                knowsAbout: [
                                    "Mechanical Engineering",
                                    "Robotics",
                                    "CAD Design",
                                    "Mechatronics",
                                    "SolidWorks",
                                    "Arduino",
                                    "Hardware Interfacing",
                                    "IoT"
                                ],
                                alumniOf: {
                                    "@type": "CollegeOrUniversity",
                                    name: "Rajshahi University of Engineering & Technology (RUET)"
                                }
                            }
                        ]),
                    }}
                />
            </head>
            <body>
                <a href="#about" className="skip-link">Skip to content</a>
                {children}
            </body>
        </html>
    );
}
