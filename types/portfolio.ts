// Types derived from the Supabase database schema

export interface SocialLinks {
    linkedin?: string;
    github?: string;
    facebook?: string;
    grabcad?: string;
    email?: string;
    whatsapp?: string;
    researchgate?: string;
    orcid?: string;
    instructables?: string;
    hackaday?: string;
}

export interface ProfileCrop {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface PortfolioConfig {
    heroName?: string;
    heroSubtitle?: string;
    profileImage?: string;
    profileCrop?: ProfileCrop;
    heroPhotoStyle?: string;
    aboutText?: string;
    resumeUrl?: string;
    socials?: SocialLinks;
    socialPriority?: Record<string, string | number>;
    theme?: string;
}

export interface Experience {
    id: string;
    role: string;
    company: string;
    date: string;
    description: string;
    starred?: boolean;
    created_at?: string;
}

export interface Project {
    id: string;
    title: string;
    description?: string;
    category?: string;
    status?: string;
    techstack?: string[] | string;
    imageurl?: string;
    bannerurl?: string;
    youtubeurl?: string;
    link?: string;
    starred?: boolean;
    created_at?: string;
    priority?: number;
}

export interface Skill {
    id: string;
    name: string;
    starred?: boolean;
    priority?: number;
}

export interface Achievement {
    id: string;
    title: string;
    category: string;
    description?: string;
    date?: string;
    icon?: string;
    imageurl?: string;
    bannerurl?: string;
    link?: string;
    starred?: boolean;
    priority?: number;
}

export interface Education {
    id: string;
    school: string;
    major: string;
    start_year: string;
    end_year?: string;
    cgpa?: string;
    description?: string;
    imageurl?: string;
    bannerurl?: string;
    starred?: boolean;
    priority?: number;
}

export interface ResearchPaper {
    id: string;
    title: string;
    abstract?: string;
    doi?: string;
    imageurl?: string;
    authors?: string;
    journal?: string;
    year?: string;
    starred?: boolean;
    priority?: number;
    created_at?: string;
}

export interface PortfolioData {
    config: PortfolioConfig | null;
    experience: Experience[];
    projects: Project[];
    skills: Skill[];
    achievements: Achievement[];
    education: Education[];
    researchPapers: ResearchPaper[];
}
