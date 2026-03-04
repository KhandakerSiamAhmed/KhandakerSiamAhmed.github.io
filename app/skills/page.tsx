import type { Metadata } from "next";
import { Suspense } from "react";
import Preloader from "@/components/portfolio/Preloader";
import SkillsContent from "./content";

export const metadata: Metadata = {
    title: "Skills | Khandaker Siam Ahmed",
    description: "Technical skills of Khandaker Siam Ahmed — CAD (SolidWorks, CATIA), programming (Arduino, Python), mechatronics, hardware interfacing, and more.",
    openGraph: {
        title: "Skills | Khandaker Siam Ahmed",
        description: "SolidWorks, CATIA, Arduino, Python, mechatronics and more.",
        url: "https://khandakersiamahmed.github.io/skills",
        siteName: "Khandaker Siam Ahmed",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Skills | Khandaker Siam Ahmed",
        description: "SolidWorks, CATIA, Arduino, Python, mechatronics skills.",
    },
    alternates: { canonical: "https://khandakersiamahmed.github.io/skills" },
    keywords: ["skills", "SolidWorks", "CATIA", "Arduino", "Python", "CAD", "mechatronics", "engineering"],
};

export default function SkillsPage() {
    return (
        <Suspense fallback={<Preloader variant="skills" />}>
            <SkillsContent />
        </Suspense>
    );
}
