import type { Metadata } from "next";
import SocialContent from "./content";

export const metadata: Metadata = {
    title: "Contact & Social | Khandaker Siam Ahmed",
    description: "Find Khandaker Siam Ahmed on LinkedIn, GitHub, ResearchGate, ORCID, Instructables, Hackaday, GrabCAD and more.",
    openGraph: {
        title: "Contact & Social | Khandaker Siam Ahmed",
        description: "Connect with Khandaker Siam Ahmed across professional and maker platforms.",
        url: "https://khandakersiamahmed.github.io/social",
        siteName: "Khandaker Siam Ahmed",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Contact & Social | Khandaker Siam Ahmed",
        description: "LinkedIn, GitHub, ResearchGate, and more.",
    },
    alternates: { canonical: "https://khandakersiamahmed.github.io/social" },
    keywords: ["contact", "social", "LinkedIn", "GitHub", "ResearchGate", "ORCID", "Hackaday", "Instructables"],
};

export default function SocialPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProfilePage",
                        "dateCreated": "2023-01-01T12:00:00+00:00",
                        "dateModified": new Date().toISOString(),
                        "mainEntity": {
                            "@type": "Person",
                            "name": "Khandaker Siam Ahmed",
                            "alternateName": "Mahin",
                            "description": "Mechanical Engineer & Robotics Specialist",
                            "image": "https://khandakersiamahmed.github.io/assets/Logo.png",
                            "sameAs": [
                                "https://www.linkedin.com/in/khandakersiamahmed/",
                                "https://github.com/KhandakerSiamAhmed",
                                "https://www.researchgate.net/profile/Khandaker-Ahmed-9",
                                "https://orcid.org/0009-0002-6427-2956",
                                "https://www.instructables.com/member/khandakersiamahmed/",
                                "https://hackaday.io/khandakersiamahmed",
                                "https://grabcad.com/khandaker.siam.ahmed-2",
                                "https://www.facebook.com/khandaker.siam.ahmed.mahin"
                            ]
                        }
                    })
                }}
            />
            <SocialContent />
        </>
    );
}
