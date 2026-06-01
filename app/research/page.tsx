import { fetchPortfolioData } from "@/lib/api";
import PageLayout from "@/components/portfolio/PageLayout";
import ResearchPapers from "@/components/portfolio/ResearchPapers";

export const metadata = {
    title: "Research Papers | Portfolio",
    description: "Peer-reviewed publications and academic research contributions.",
};

export default async function ResearchPage() {
    const data = await fetchPortfolioData();

    return (
        <PageLayout data={data}>
            <ResearchPapers items={data.researchPapers} />
        </PageLayout>
    );
}
