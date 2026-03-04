"use client";

import PageLayout from "@/components/portfolio/PageLayout";
import SocialSection from "@/components/portfolio/SocialSection";
import ScrollReveal from "@/components/portfolio/ScrollReveal";

export default function SocialContent() {
    return (
        <PageLayout>
            <ScrollReveal>
                <section className="section social inner-page-section" id="social-links">
                    <SocialSection />
                </section>
            </ScrollReveal>
        </PageLayout>
    );
}
