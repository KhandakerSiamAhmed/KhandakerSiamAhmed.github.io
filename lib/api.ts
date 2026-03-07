import { supabase } from './supabase';
import type { PortfolioData } from '@/types/portfolio';

export async function fetchPortfolioData(): Promise<PortfolioData> {
    const [configRes, expRes, projRes, skillRes, achRes, eduRes] = await Promise.all([
        supabase.from('config').select('*').eq('key', 'global').single(),
        supabase.from('experience').select('*').order('date', { ascending: false }),
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('skills').select('*'),
        supabase.from('achievements').select('*'),
        supabase.from('education').select('*').order('start_year', { ascending: false }),
    ]);

    const experienceData = expRes.data?.map(exp => {
        if (exp.company && exp.company.includes('Short Circuit') && exp.role === 'Co-Founder') {
            return {
                ...exp,
                description: "* Architected a full-stack e-commerce platform using JavaScript and Supabase to digitize supply chain operations.\n* Managed end-to-end wholesaler procurement and integrated real-time inventory management."
            };
        }
        if (exp.company && exp.company.includes('Project Altair')) {
            return {
                ...exp,
                description: "* Spearheaded mechanical design of the rover's chassis and suspension systems, selecting materials to optimize strength-to-weight ratio.\n* Validated structural integrity by conducting FEA static stress analysis using SolidWorks Simulation, contributing to the team securing 18th position globally at the University Rover Challenge (URC).\n* Collaborated on design submissions for the International Rover Design Challenge (IRDC) 2025 and European Rover Challenge (ERC) 2024."
            };
        }
        if (exp.company && exp.company.includes('Project Aqua')) {
            return {
                ...exp,
                description: "* Executed detailed CAD modeling of underwater vehicle prototypes using SolidWorks to ensure precise assembly fitment.\n* Created photorealistic renders and mechanism animations using Blender for technical presentations and design visualization.\n* Played a pivotal role in achieving 2nd Place at the Underwater Vehicle Design Challenge, IIT Guwahati."
            };
        }
        return exp;
    }) ?? [];

    return {
        config: configRes.data?.value ?? null,
        experience: experienceData,
        projects: projRes.data ?? [],
        skills: skillRes.data ?? [],
        achievements: achRes.data ?? [],
        education: eduRes.data ?? [],
    };
}
