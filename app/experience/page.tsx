import type { Metadata } from "next";
import { Suspense } from "react";
import Preloader from "@/components/portfolio/Preloader";
import ExperienceContent from "./content";

export const metadata: Metadata = {
    title: "Experience | Khandaker Siam Ahmed",
    description: "Professional experience and work history of Khandaker Siam Ahmed — engineering roles, research projects, and industry collaborations.",
    openGraph: {
        title: "Experience | Khandaker Siam Ahmed",
        description: "Engineering roles, research and industry work by Khandaker Siam Ahmed.",
        url: "https://khandakersiamahmed.github.io/experience",
        siteName: "Khandaker Siam Ahmed",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Experience | Khandaker Siam Ahmed",
        description: "Engineering roles and research by Khandaker Siam Ahmed.",
    },
    alternates: { canonical: "https://khandakersiamahmed.github.io/experience" },
    keywords: ["experience", "engineering", "research", "work history", "mechanical engineering"],
};

export default function ExperiencePage() {
    return (
        <Suspense fallback={<Preloader variant="timeline" />}>
            <ExperienceContent />
        </Suspense>
    );
}
