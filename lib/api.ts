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

    return {
        config: configRes.data?.value ?? null,
        experience: expRes.data ?? [],
        projects: projRes.data ?? [],
        skills: skillRes.data ?? [],
        achievements: achRes.data ?? [],
        education: eduRes.data ?? [],
    };
}
