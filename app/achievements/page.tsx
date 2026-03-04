import type { Metadata } from "next";
import { Suspense } from "react";
import Preloader from "@/components/portfolio/Preloader";
import AchievementsContent from "./content";

export const metadata: Metadata = {
    title: "Achievements | Khandaker Siam Ahmed",
    description: "Awards, competitions, publications, and achievements by Khandaker Siam Ahmed in engineering, robotics, and academic research.",
    openGraph: {
        title: "Achievements | Khandaker Siam Ahmed",
        description: "Awards, competitions and publications by Khandaker Siam Ahmed.",
        url: "https://khandakersiamahmed.github.io/achievements",
        siteName: "Khandaker Siam Ahmed",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Achievements | Khandaker Siam Ahmed",
        description: "Awards and publications in engineering and robotics.",
    },
    alternates: { canonical: "https://khandakersiamahmed.github.io/achievements" },
    keywords: ["achievements", "awards", "robotics", "competition", "engineering", "research", "publications"],
};

export default function AchievementsPage() {
    return (
        <Suspense fallback={<Preloader variant="grid" />}>
            <AchievementsContent />
        </Suspense>
    );
}
