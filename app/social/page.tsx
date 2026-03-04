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
    return <SocialContent />;
}
