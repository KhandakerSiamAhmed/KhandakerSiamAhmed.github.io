import type { Metadata } from "next";
import { Suspense } from "react";
import Preloader from "@/components/portfolio/Preloader";
import ProjectsContent from "./content";

export const metadata: Metadata = {
    title: "Projects | Khandaker Siam Ahmed",
    description: "Explore all engineering projects by Khandaker Siam Ahmed — robotics, CAD, mechatronics, embedded systems, and innovative hardware builds.",
    openGraph: {
        title: "Projects | Khandaker Siam Ahmed",
        description: "Robotics, CAD, mechatronics, and hardware builds by Khandaker Siam Ahmed.",
        url: "https://khandakersiamahmed.github.io/projects",
        siteName: "Khandaker Siam Ahmed",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Projects | Khandaker Siam Ahmed",
        description: "Robotics, CAD, mechatronics, and hardware builds.",
    },
    alternates: { canonical: "https://khandakersiamahmed.github.io/projects" },
    keywords: ["projects", "robotics", "CAD", "mechatronics", "engineering", "hardware", "SolidWorks"],
};

export default function ProjectsPage() {
    return (
        <Suspense fallback={<Preloader variant="grid" />}>
            <ProjectsContent />
        </Suspense>
    );
}
