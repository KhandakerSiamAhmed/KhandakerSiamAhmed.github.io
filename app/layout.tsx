import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Khandaker Siam Ahmed | Portfolio",
    description:
        "Portfolio of Khandaker Siam Ahmed - Mechanical Engineer & Robotics Enthusiast",
    keywords: [
        "Khandaker Siam Ahmed",
        "Portfolio",
        "Mechanical Engineer",
        "Robotics Enthusiast",
        "Robotics",
        "Engineering",
    ],
    authors: [{ name: "Khandaker Siam Ahmed" }],
    verification: {
        google: "DQvo7WOvqO52Tp9gVPZLT7YcOadgT5V5DZ0YAyhPQQk",
    },
    openGraph: {
        type: "website",
        url: "https://khandakersiamahmed.github.io/",
        title: "Khandaker Siam Ahmed | Portfolio",
        description:
            "Portfolio of Khandaker Siam Ahmed - Mechanical Engineer & Robotics Enthusiast",
        images: [
            {
                url: "https://khandakersiamahmed.github.io/assets/social-preview.svg",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Khandaker Siam Ahmed | Portfolio",
        description:
            "Portfolio of Khandaker Siam Ahmed - Mechanical Engineer & Robotics Enthusiast",
        images: [
            "https://khandakersiamahmed.github.io/assets/social-preview.svg",
        ],
    },
    icons: {
        icon: "/assets/Khandaker Siam Ahmed.svg",
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
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            name: "Khandaker Siam Ahmed",
                            url: "https://khandakersiamahmed.github.io/",
                            image:
                                "https://khandakersiamahmed.github.io/assets/Khandaker%20Siam%20Ahmed.svg",
                            sameAs: [
                                "https://linkedin.com/in/khandakersiamahmed",
                                "https://github.com/KhandakerSiamAhmed",
                                "https://www.facebook.com/khandaker.siam.ahmed.mahin",
                                "https://grabcad.com/khandaker.siam.ahmed-2",
                            ],
                            jobTitle: "Mechanical Engineer & Robotics Enthusiast",
                            worksFor: {
                                "@type": "Organization",
                                name: "Freelance",
                            },
                            description:
                                "Portfolio of Khandaker Siam Ahmed - Mechanical Engineer & Robotics Enthusiast.",
                            knowsAbout: [
                                "Mechanical Engineering",
                                "Robotics",
                                "CAD Design",
                                "Mechatronics",
                            ],
                        }),
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
