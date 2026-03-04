import type { Metadata } from "next";
import { Suspense } from "react";
import Preloader from "@/components/portfolio/Preloader";
import EducationContent from "./content";

export const metadata: Metadata = {
    title: "Education | Khandaker Siam Ahmed",
    description: "Academic background and educational qualifications of Khandaker Siam Ahmed — Mechanical Engineering at RUET and beyond.",
    openGraph: {
        title: "Education | Khandaker Siam Ahmed",
        description: "Mechanical Engineering at RUET — academic journey of Khandaker Siam Ahmed.",
        url: "https://khandakersiamahmed.github.io/education",
        siteName: "Khandaker Siam Ahmed",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Education | Khandaker Siam Ahmed",
        description: "Mechanical Engineering at RUET — academic journey.",
    },
    alternates: { canonical: "https://khandakersiamahmed.github.io/education" },
    keywords: ["education", "RUET", "Mechanical Engineering", "degree", "university"],
};

export default function EducationPage() {
    return (
        <Suspense fallback={<Preloader variant="grid" />}>
            <EducationContent />
        </Suspense>
    );
}
