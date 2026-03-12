"use client";

import "./dashboard.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";

/* ===== SCHEMAS ===== */
const schemas: Record<string, { name: string; label: string; type: string }[]> = {
    experience: [
        { name: "role", label: "Role", type: "text" },
        { name: "company", label: "Company", type: "text" },
        { name: "date", label: "Date Range", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "priority", label: "Priority", type: "number" },
    ],
    projects: [
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "category", label: "Category", type: "text" },
        { name: "status", label: "Status", type: "text" },
        { name: "techstack", label: "Tech Stack (comma separated)", type: "text" },
        { name: "link", label: "Project Link", type: "text" },
        { name: "youtubeurl", label: "YouTube Video URL (Optional)", type: "text" },
        { name: "imageurl", label: "Thumbnail (Square Logo)", type: "file" },
        { name: "bannerurl", label: "Detail Banner (Free Size)", type: "file" },
        { name: "priority", label: "Priority (Sort Order)", type: "number" },
    ],
    achievements: [
        { name: "title", label: "Title", type: "text" },
        { name: "category", label: "Category", type: "text" },
        { name: "youtubeurl", label: "YouTube Video URL (Optional)", type: "text" },
        { name: "icon", label: "Icon (SVG String)", type: "textarea" },
        { name: "imageurl", label: "Thumbnail (Square)", type: "file" },
        { name: "bannerurl", label: "Detail Banner (Free Size)", type: "file" },
        { name: "priority", label: "Priority (Sort Order)", type: "number" },
    ],
    education: [
        { name: "school", label: "School / University", type: "text" },
        { name: "major", label: "Major / Degree", type: "text" },
        { name: "start_year", label: "Starting Year", type: "text" },
        { name: "end_year", label: "Completion / Expected Year", type: "text" },
        { name: "cgpa", label: "CGPA (Optional)", type: "text" },
        { name: "youtubeurl", label: "YouTube Video URL (Optional)", type: "text" },
        { name: "imageurl", label: "Logo (Square)", type: "file" },
        { name: "bannerurl", label: "Campus/Detail Image (Free Size)", type: "file" },
        { name: "priority", label: "Priority (Sort Order)", type: "number" },
    ],
};

const availableThemes = [
    { id: "default", name: "Dark Minimalist", bg: "#050505", sec: "#111111", txt: "#ffffff" },
    { id: "titanium", name: "Titanium Industrial", bg: "#0e0e0e", sec: "#141414", txt: "#e0e0e0" },
    { id: "blueprint", name: "Blueprint Technical", bg: "#0a192f", sec: "#112240", txt: "#e6f1ff" },
    { id: "light", name: "Professional Light", bg: "#ffffff", sec: "#f8f9fa", txt: "#333333" },
    { id: "forest", name: "Forest", bg: "#0d1a0f", sec: "#0f1f12", txt: "#e0f2e9" },
    { id: "sunset", name: "Sunset", bg: "#1a0a08", sec: "#1f0e0b", txt: "#f5e6e4" },
    { id: "aurora", name: "Aurora", bg: "#0d0a1f", sec: "#130e2a", txt: "#e9e0f5" },
    { id: "ocean", name: "Ocean", bg: "#020e1a", sec: "#051525", txt: "#d0eaf5" },
];

const heroPhotoStyles = [
    { id: "frame-soft", name: "Original Soft" },
    { id: "frame-circle", name: "Industrial Circle" },
    { id: "frame-hexagon", name: "Mech Hexagon" },
    { id: "frame-square", name: "Squared Tech" },
    { id: "frame-blueprint", name: "Blueprint View" },
];

/* ===== UPLOAD HELPER ===== */
async function uploadFile(file: File, folder: string): Promise<string | null> {
    const fileName = `${folder}/${Date.now()}_${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("portfolio").upload(fileName, file);
    if (error) {
        alert("Upload Failed: " + error.message);
        return null;
    }
    const { data: { publicUrl } } = supabase.storage.from("portfolio").getPublicUrl(fileName);
    return publicUrl;
}

/* ===== STAR BUTTON ===== */
function StarButton({ starred, onClick, disabled }: { starred: boolean; onClick: () => void; disabled?: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            title={starred ? "Unstar (remove from home preview)" : "Star (show on home page)"}
            style={{
                background: "none",
                border: starred ? "1px solid #f5a623" : "1px solid #444",
                borderRadius: "6px",
                padding: "5px 10px",
                cursor: disabled ? "not-allowed" : "pointer",
                color: starred ? "#f5a623" : "#666",
                fontSize: "1rem",
                opacity: disabled && !starred ? 0.4 : 1,
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "4px",
            }}
        >
            {starred ? "★" : "☆"}
        </button>
    );
}

/* ===== STARRED BANNER ===== */
function StarredBanner({ count, max, label }: { count: number; max: number; label: string }) {
    return (
        <div style={{
            padding: "0.6rem 1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            background: count > 0 ? "rgba(245, 166, 35, 0.1)" : "transparent",
            border: count > 0 ? "1px solid rgba(245, 166, 35, 0.3)" : "1px solid transparent",
            fontSize: "0.85rem",
            color: count > 0 ? "#f5a623" : "#888",
        }}>
            {count > 0
                ? `⭐ ${count}/${max} ${label} starred — these show on the home page preview`
                : `☆ No ${label} starred — home page will show the most recent ${max}`}
        </div>
    );
}

/* ===== MAIN COMPONENT ===== */
export default function DashboardPage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("general");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Login state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    // Config state
    const [config, setConfig] = useState<Record<string, unknown>>({});
    const [selectedTheme, setSelectedTheme] = useState("default");
    const [selectedPhotoStyle, setSelectedPhotoStyle] = useState("frame-soft");

    // Form fields
    const [heroName, setHeroName] = useState("");
    const [heroSubtitle, setHeroSubtitle] = useState("");
    const [aboutText, setAboutText] = useState("");
    const [resumeUrl, setResumeUrl] = useState("");
    const [profileImageUrl, setProfileImageUrl] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [facebookUrl, setFacebookUrl] = useState("");
    const [grabcadUrl, setGrabcadUrl] = useState("");
    const [emailContact, setEmailContact] = useState("");
    const [whatsappContact, setWhatsappContact] = useState("");
    
    // Social Priority
    const [linkedinPriority, setLinkedinPriority] = useState("");
    const [githubPriority, setGithubPriority] = useState("");
    const [facebookPriority, setFacebookPriority] = useState("");
    const [grabcadPriority, setGrabcadPriority] = useState("");
    const [emailPriority, setEmailPriority] = useState("");
    const [whatsappPriority, setWhatsappPriority] = useState("");
    const [researchgateUrl, setResearchgateUrl] = useState("");
    const [researchgatePriority, setResearchgatePriority] = useState("");
    const [orcidUrl, setOrcidUrl] = useState("");
    const [orcidPriority, setOrcidPriority] = useState("");
    const [instructablesUrl, setInstructablesUrl] = useState("");
    const [instructablesPriority, setInstructablesPriority] = useState("");
    const [hackadayUrl, setHackadayUrl] = useState("");
    const [hackadayPriority, setHackadayPriority] = useState("");

    // Collections
    const [experienceList, setExperienceList] = useState<Record<string, unknown>[]>([]);
    const [projectsList, setProjectsList] = useState<Record<string, unknown>[]>([]);
    const [educationList, setEducationList] = useState<Record<string, unknown>[]>([]);
    const [achievementsList, setAchievementsList] = useState<Record<string, unknown>[]>([]);
    const [skillsList, setSkillsList] = useState<Record<string, unknown>[]>([]);
    const [newSkillInput, setNewSkillInput] = useState("");
    const [newSkillPriorityInput, setNewSkillPriorityInput] = useState("");
    const [newSkillCategory, setNewSkillCategory] = useState("General");
    const [skillCategories, setSkillCategories] = useState<string[]>([]);
    const [newCategoryInput, setNewCategoryInput] = useState("");
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [editCategoryInput, setEditCategoryInput] = useState("");

    // Edit modal state
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editCollection, setEditCollection] = useState("");
    const [editId, setEditId] = useState<string | null>(null);
    const [editFields, setEditFields] = useState<Record<string, string>>({});
    const [editFiles, setEditFiles] = useState<Record<string, File | null>>({});

    const profileFileRef = useRef<HTMLInputElement>(null);

    // ===== AUTH =====
    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            console.error("Dashboard: Supabase environment variables are missing!");
            setLoginError("Fatal Error: Supabase connection settings are missing in the environment. Dashboard cannot function.");
            return;
        }
        const { data: { session } } = await supabase.auth.getSession();
        if (session) setLoggedIn(true);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) setLoginError(error.message);
            else setLoggedIn(true);
        } catch (err) {
            setLoginError("Unexpected error: " + (err as Error).message);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setLoggedIn(false);
        window.location.reload();
    };

    // ===== LOAD DATA =====
    const loadAllData = useCallback(async () => {
        await Promise.all([loadGeneral(), loadExperience(), loadProjects(), loadEducation(), loadAchievements(), loadSkills()]);
    }, []);

    useEffect(() => {
        if (loggedIn) loadAllData();
    }, [loggedIn, loadAllData]);

    const loadGeneral = async () => {
        const { data } = await supabase.from("config").select("*").eq("key", "global").single();
        if (data?.value) {
            const val = data.value as Record<string, unknown>;
            setConfig(val);
            setHeroName((val.heroName as string) || "");
            setHeroSubtitle((val.heroSubtitle as string) || "");
            setAboutText((val.aboutText as string) || "");
            setResumeUrl((val.resumeUrl as string) || "");
            setProfileImageUrl((val.profileImage as string) || "");
            setSelectedTheme((val.theme as string) || "default");
            setSelectedPhotoStyle((val.heroPhotoStyle as string) || "frame-soft");
            const cats = (val.skillCategories as string[]) || ["General"];
            setSkillCategories(cats);
            if (cats.length > 0) setNewSkillCategory(cats[0]);
            const socials = (val.socials || {}) as Record<string, string>;
            setLinkedinUrl(socials.linkedin || "");
            setGithubUrl(socials.github || "");
            setFacebookUrl(socials.facebook || "");
            setGrabcadUrl(socials.grabcad || "");
            setEmailContact(socials.email || "");
            setWhatsappContact(socials.whatsapp || "");

            const socialPriority = (val.socialPriority || {}) as Record<string, string>;
            setLinkedinPriority(socialPriority.linkedin || "");
            setGithubPriority(socialPriority.github || "");
            setFacebookPriority(socialPriority.facebook || "");
            setGrabcadPriority(socialPriority.grabcad || "");
            setEmailPriority(socialPriority.email || "");
            setWhatsappPriority(socialPriority.whatsapp || "");
            
            setResearchgateUrl(socials.researchgate || "");
            setResearchgatePriority(socialPriority.researchgate || "");
            setOrcidUrl(socials.orcid || "");
            setOrcidPriority(socialPriority.orcid || "");
            setInstructablesUrl(socials.instructables || "");
            setInstructablesPriority(socialPriority.instructables || "");
            setHackadayUrl(socials.hackaday || "");
            setHackadayPriority(socialPriority.hackaday || "");
        }
    };

    const loadCollection = async (table: string) => {
        const { data } = await supabase.from(table).select("*").order("created_at", { ascending: false });
        return data || [];
    };

    const loadExperience = async () => setExperienceList(await loadCollection("experience"));
    const loadProjects = async () => setProjectsList(await loadCollection("projects"));
    const loadEducation = async () => setEducationList(await loadCollection("education"));
    const loadAchievements = async () => setAchievementsList(await loadCollection("achievements"));
    const loadSkills = async () => {
        const { data } = await supabase.from("skills").select("*");
        setSkillsList(data || []);
    };

    // ===== STAR TOGGLE =====
    const toggleStar = async (table: string, id: string, currentStarred: boolean, list: Record<string, unknown>[], max: number) => {
        if (!currentStarred) {
            const starredCount = list.filter((i) => i.starred).length;
            if (starredCount >= max) {
                alert(`You can only star up to ${max} items in this section. Unstar one first.`);
                return;
            }
        }
        setLoading(true);
        await supabase.from(table).update({ starred: !currentStarred }).eq("id", id);
        await loadAllData();
        setLoading(false);
    };

    const loadSocialDefaults = () => {
        setLinkedinUrl("https://www.linkedin.com/in/khandakersiamahmed/");
        setGithubUrl("https://github.com/KhandakerSiamAhmed");
        setFacebookUrl("https://www.facebook.com/khandaker.siam.ahmed.mahin");
        setGrabcadUrl("https://grabcad.com/khandaker.siam.ahmed-2");
        setResearchgateUrl("https://www.researchgate.net/profile/Khandaker-Ahmed-9?ev=hdr_xprf");
        setOrcidUrl("https://orcid.org/my-orcid?orcid=0009-0002-6427-2956");
        setInstructablesUrl("https://www.instructables.com/member/khandakersiamahmed/");
        setHackadayUrl("https://hackaday.io/khandakersiamahmed");
        
        // Also set default priorities
        setLinkedinPriority("1");
        setGithubPriority("2");
        setFacebookPriority("3");
        setGrabcadPriority("4");
        setResearchgatePriority("5");
        setOrcidPriority("6");
        setInstructablesPriority("7");
        setHackadayPriority("8");
    };

    // ===== SAVE GENERAL =====
    const saveGeneral = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = profileImageUrl;
            const fileInput = profileFileRef.current;
            if (fileInput?.files?.[0]) {
                const url = await uploadFile(fileInput.files[0], "profile");
                if (url) {
                    imageUrl = url;
                    setProfileImageUrl(url);
                }
            }

            const updated = {
                ...config,
                heroName,
                heroSubtitle,
                aboutText,
                resumeUrl,
                profileImage: imageUrl,
                heroPhotoStyle: selectedPhotoStyle,
                socials: { 
                    linkedin: linkedinUrl, 
                    github: githubUrl, 
                    facebook: facebookUrl, 
                    grabcad: grabcadUrl, 
                    email: emailContact, 
                    whatsapp: whatsappContact,
                    researchgate: researchgateUrl,
                    orcid: orcidUrl,
                    instructables: instructablesUrl,
                    hackaday: hackadayUrl
                },
                socialPriority: { 
                    linkedin: linkedinPriority, 
                    github: githubPriority, 
                    facebook: facebookPriority, 
                    grabcad: grabcadPriority, 
                    email: emailPriority, 
                    whatsapp: whatsappPriority,
                    researchgate: researchgatePriority,
                    orcid: orcidPriority,
                    instructables: instructablesPriority,
                    hackaday: hackadayPriority
                },
            };

            const { error } = await supabase.from("config").upsert({ key: "global", value: updated });
            if (error) {
                console.error("Dashboard: Error saving general config:", error);
                alert("Critical Error Saving: " + error.message + "\nCheck browser console for more details.");
            } else {
                setConfig(updated);
                alert("General settings saved!");
            }
        } catch (err) {
            console.error("Dashboard: Unexpected error in saveGeneral:", err);
            alert("Unexpected error: " + (err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // ===== SAVE ALL =====
    const saveAll = async () => {
        setLoading(true);
        try {
            let imageUrl = profileImageUrl;
            const fileInput = profileFileRef.current;
            if (fileInput?.files?.[0]) {
                const url = await uploadFile(fileInput.files[0], "profile");
                if (url) {
                    imageUrl = url;
                    setProfileImageUrl(url);
                }
            }

            const updated = {
                ...config,
                heroName,
                heroSubtitle,
                aboutText,
                resumeUrl,
                profileImage: imageUrl,
                heroPhotoStyle: selectedPhotoStyle,
                theme: selectedTheme,
                socials: { 
                    linkedin: linkedinUrl, 
                    github: githubUrl, 
                    facebook: facebookUrl, 
                    grabcad: grabcadUrl, 
                    email: emailContact, 
                    whatsapp: whatsappContact,
                    researchgate: researchgateUrl,
                    orcid: orcidUrl,
                    instructables: instructablesUrl,
                    hackaday: hackadayUrl
                },
                socialPriority: { 
                    linkedin: linkedinPriority, 
                    github: githubPriority, 
                    facebook: facebookPriority, 
                    grabcad: grabcadPriority, 
                    email: emailPriority, 
                    whatsapp: whatsappPriority,
                    researchgate: researchgatePriority,
                    orcid: orcidPriority,
                    instructables: instructablesPriority,
                    hackaday: hackadayPriority
                },
            };

            const { error } = await supabase.from("config").upsert({ key: "global", value: updated });
            if (error) {
                console.error("Dashboard: Error in saveAll:", error);
                alert("Fatal Persistence Error: " + error.message + "\nPlease check if Row Level Security (RLS) is correctly configured for the 'config' table.");
            } else {
                setConfig(updated);
                // Sync theme to localStorage so portfolio picks it up immediately
                if (selectedTheme && selectedTheme !== "default") {
                    localStorage.setItem("site-theme", selectedTheme);
                } else {
                    localStorage.removeItem("site-theme");
                }
                alert("All changes (including Theme) saved successfully!");
            }
        } catch (err) {
            console.error("Dashboard: Unexpected fatal error in saveAll:", err);
            alert("Critical Failure: " + (err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // ===== THEME =====
    const saveTheme = async () => {
        setLoading(true);
        const updated = { ...config, theme: selectedTheme };
        const { error } = await supabase.from("config").upsert({ key: "global", value: updated });
        setLoading(false);
        if (error) alert("Error: " + error.message);
        else {
            setConfig(updated);
            // Also sync to localStorage so the portfolio page picks it up immediately.
            // PortfolioClient gives localStorage priority over config, so without this
            // a previously-set localStorage value would override the dashboard choice.
            if (selectedTheme && selectedTheme !== "default") {
                localStorage.setItem("site-theme", selectedTheme);
            } else {
                localStorage.removeItem("site-theme");
            }
            alert("Theme Applied!");
        }
    };

    // ===== SKILLS =====
    const addSkillCategory = async () => {
        const val = newCategoryInput.trim();
        if (!val || skillCategories.includes(val)) return;
        setLoading(true);
        const updatedCats = [...skillCategories, val];
        const updatedConfig = { ...config, skillCategories: updatedCats };
        await supabase.from("config").upsert({ key: "global", value: updatedConfig });
        setConfig(updatedConfig);
        setSkillCategories(updatedCats);
        setNewSkillCategory(val);
        setNewCategoryInput("");
        setLoading(false);
    };

    const deleteSkillCategory = async (cat: string) => {
        if (!confirm(`Delete category "${cat}"? This will not delete the associated skills.`)) return;
        setLoading(true);
        const updatedCats = skillCategories.filter(c => c !== cat);
        const updatedConfig = { ...config, skillCategories: updatedCats };
        await supabase.from("config").upsert({ key: "global", value: updatedConfig });
        setConfig(updatedConfig);
        setSkillCategories(updatedCats);
        if (newSkillCategory === cat && updatedCats.length > 0) setNewSkillCategory(updatedCats[0]);
        else if (updatedCats.length === 0) setNewSkillCategory("General");
        setLoading(false);
    };

    const renameSkillCategory = async (oldCat: string) => {
        const newVal = editCategoryInput.trim();
        if (!newVal || newVal === oldCat || skillCategories.includes(newVal)) {
            setEditingCategory(null);
            return;
        }
        setLoading(true);
        
        // Update the list of categories in config
        const updatedCats = skillCategories.map(c => c === oldCat ? newVal : c);
        const updatedConfig = { ...config, skillCategories: updatedCats };
        await supabase.from("config").upsert({ key: "global", value: updatedConfig });
        setConfig(updatedConfig);
        setSkillCategories(updatedCats);

        // Update all skills that use this category
        const skillsToUpdate = skillsList.filter(s => (s.name as string).startsWith(`${oldCat}: `));
        for (const skill of skillsToUpdate) {
            const skillName = (skill.name as string).split(": ")[1];
            await supabase.from("skills").update({ name: `${newVal}: ${skillName}` }).eq("id", skill.id);
        }

        await loadSkills();
        setEditingCategory(null);
        setLoading(false);
    };

    const updateSkillCategory = async (skillId: string, oldName: string, newCat: string) => {
        setLoading(true);
        const skillPureName = oldName.includes(": ") ? oldName.split(": ")[1] : oldName;
        const newFullName = `${newCat}: ${skillPureName}`;
        await supabase.from("skills").update({ name: newFullName }).eq("id", skillId);
        await loadSkills();
        setLoading(false);
    };

    const updateSkillPriority = async (skillId: string, priorityValue: string) => {
        setLoading(true);
        const priority = priorityValue === "" ? null : Number(priorityValue);
        await supabase.from("skills").update({ priority }).eq("id", skillId);
        await loadSkills();
        setLoading(false);
    };

    const addSkill = async () => {
        const val = newSkillInput.trim();
        if (!val) return;
        setLoading(true);
        const fullName = `${newSkillCategory}: ${val}`;
        const priority = newSkillPriorityInput.trim() === "" ? null : Number(newSkillPriorityInput);
        await supabase.from("skills").insert({ name: fullName, priority });
        setNewSkillInput("");
        setNewSkillPriorityInput("");
        await loadSkills();
        setLoading(false);
    };

    // ===== DELETE =====
    const deleteItem = async (collection: string, id: string) => {
        if (!confirm("Are you sure?")) return;
        setLoading(true);
        await supabase.from(collection).delete().eq("id", id);
        await loadAllData();
        setLoading(false);
    };

    // ===== EDIT MODAL =====
    const openEditModal = async (collection: string, id?: string) => {
        const table = collection === "project" ? "projects" : collection === "achievement" ? "achievements" : collection;
        setEditCollection(table);
        setEditId(id || null);
        setEditFiles({});

        const fields: Record<string, string> = {};
        if (id) {
            const { data } = await supabase.from(table).select("*").eq("id", id).single();
            if (data) {
                const schemaFields = schemas[table];
                schemaFields.forEach((f) => {
                    if (f.name === "techstack" && Array.isArray(data[f.name])) {
                        fields[f.name] = data[f.name].join(", ");
                    } else {
                        fields[f.name] = data[f.name] || "";
                    }
                });
            }
        }
        setEditFields(fields);
        setEditModalOpen(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const table = editCollection;
        const schemaFields = schemas[table];
        const payload: Record<string, unknown> = {};

        for (const f of schemaFields) {
            if (f.type === "file") {
                const file = editFiles[f.name];
                let url = editFields[f.name] || "";
                if (file) {
                    const uploaded = await uploadFile(file, table);
                    if (uploaded) url = uploaded;
                }
                payload[f.name] = url;
            } else if (f.name === "techstack") {
                payload[f.name] = (editFields[f.name] || "").split(",").map((s) => s.trim()).filter(Boolean);
            } else {
                payload[f.name] = editFields[f.name] || "";
            }
        }

        if (editId) {
            await supabase.from(table).update(payload).eq("id", editId);
        } else {
            await supabase.from(table).insert(payload);
        }

        setLoading(false);
        setEditModalOpen(false);
        await loadAllData();
    };

    // ===== RESET IMAGE =====
    const resetProfileImage = () => {
        setProfileImageUrl("/assets/Logo.png");
        if (profileFileRef.current) profileFileRef.current.value = "";
        alert("Profile image set to default. Remember to click 'Save Changes' to apply!");
    };

    // ===== LOGIN SCREEN =====
    if (!loggedIn) {
        return (
            <div className="admin-login-screen">
                <div className="admin-login-box">
                    <h2>Admin Login</h2>
                    <form onSubmit={handleLogin}>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit" className="admin-btn-primary">Login</button>
                    </form>
                    {loginError && <p className="admin-error">{loginError}</p>}
                </div>
            </div>
        );
    }

    // ===== DASHBOARD =====
    return (
        <div className="admin-dashboard">
            {loading && <div className="admin-loader"><div className="admin-spinner">Loading...</div></div>}

            {/* Mobile Header */}
            <header className="admin-mobile-header">
                <button className="admin-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                        <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
                <h2>Admin Dashboard</h2>
            </header>

            {/* Overlay */}
            {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? "active" : ""}`}>
                <h2>CMS Dashboard</h2>
                <nav className="admin-nav">
                    {["general", "social", "experience", "projects", "education", "skills", "achievements", "themes"].map((tab) => (
                        <button
                            key={tab}
                            className={activeTab === tab ? "active" : ""}
                            onClick={() => { setActiveTab(tab); setSidebarOpen(false); }}
                        >
                            {tab === "general" ? "General & Hero" : tab === "social" ? "Social Links" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                    <button className="admin-btn-save-all" onClick={saveAll}>Save All Changes</button>
                    <button className="admin-btn-logout" onClick={handleLogout}>Logout</button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                {/* General Tab */}
                {activeTab === "general" && (
                    <div>
                        <h1>General Configuration</h1>
                        <form onSubmit={saveGeneral}>
                            <div className="admin-form-group">
                                <label>Hero Title (Name)</label>
                                <input type="text" value={heroName} onChange={(e) => setHeroName(e.target.value)} />
                            </div>
                            <div className="admin-form-group">
                                <label>Hero Subtitle</label>
                                <input type="text" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} />
                            </div>
                            <div className="admin-form-group">
                                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    Profile Image
                                    <button type="button" onClick={resetProfileImage} style={{ background: "#333", color: "#fff", border: "1px solid #444", fontSize: "0.7rem", padding: "4px 8px", cursor: "pointer", borderRadius: "4px" }}>
                                        Reset to Default
                                    </button>
                                </label>
                                <input type="file" ref={profileFileRef} />
                                {profileImageUrl && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={profileImageUrl} alt="" style={{ maxWidth: "200px", marginTop: "10px", borderRadius: "8px" }} />
                                )}
                            </div>
                            <div className="admin-form-group">
                                <label>Hero Photo Style</label>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "10px", marginTop: "10px" }}>
                                    {heroPhotoStyles.map((s) => (
                                        <div
                                            key={s.id}
                                            onClick={() => setSelectedPhotoStyle(s.id)}
                                            style={{
                                                padding: "10px",
                                                border: selectedPhotoStyle === s.id ? "2px solid var(--primary-color, #ff9f1c)" : "1px solid #333",
                                                borderRadius: "8px",
                                                cursor: "pointer",
                                                textAlign: "center",
                                                background: selectedPhotoStyle === s.id ? "rgba(255,159,28,0.1)" : "transparent",
                                            }}
                                        >
                                            <div style={{ fontSize: "0.8rem" }}>{s.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="admin-form-group">
                                <label>About Me Text (HTML allowed)</label>
                                <textarea rows={6} value={aboutText} onChange={(e) => setAboutText(e.target.value)} />
                            </div>
                            <div className="admin-form-group">
                                <label>Resume URL</label>
                                <input type="text" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} />
                            </div>
                            <div style={{ display: "flex", gap: "1rem" }}>
                                <button type="submit" className="admin-btn-primary">Save Changes</button>
                                <button type="button" onClick={loadGeneral} className="admin-btn-secondary">Reset All</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Social Tab */}
                {activeTab === "social" && (
                    <div>
                        <h1>Social Links Management</h1>
                        <p style={{ color: "#888", marginBottom: "2rem" }}>Manage your online presence across different platforms.</p>
                        
                        <form onSubmit={saveGeneral}>
                            <div className="admin-form-group">
                                <label>LinkedIn URL</label>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <span style={{ padding: "10px", background: "#333", borderRadius: "4px", minWidth: "40px", textAlign: "center" }}>in</span>
                                    <input type="text" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/in/..." style={{ flex: 1 }} />
                                    <input type="number" value={linkedinPriority} onChange={(e) => setLinkedinPriority(e.target.value)} placeholder="Priority" style={{ width: "80px" }} title="Priority (Sort Order)" />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label>GitHub URL</label>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <span style={{ padding: "10px", background: "#333", borderRadius: "4px", minWidth: "40px", textAlign: "center" }}>git</span>
                                    <input type="text" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/..." style={{ flex: 1 }} />
                                    <input type="number" value={githubPriority} onChange={(e) => setGithubPriority(e.target.value)} placeholder="Priority" style={{ width: "80px" }} title="Priority (Sort Order)" />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label>Facebook URL</label>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <span style={{ padding: "10px", background: "#333", borderRadius: "4px", minWidth: "40px", textAlign: "center" }}>fb</span>
                                    <input type="text" value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} placeholder="https://facebook.com/..." style={{ flex: 1 }} />
                                    <input type="number" value={facebookPriority} onChange={(e) => setFacebookPriority(e.target.value)} placeholder="Priority" style={{ width: "80px" }} title="Priority (Sort Order)" />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label>GrabCAD URL</label>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <span style={{ padding: "10px", background: "#333", borderRadius: "4px", minWidth: "40px", textAlign: "center" }}>GC</span>
                                    <input type="text" value={grabcadUrl} onChange={(e) => setGrabcadUrl(e.target.value)} placeholder="https://grabcad.com/..." style={{ flex: 1 }} />
                                    <input type="number" value={grabcadPriority} onChange={(e) => setGrabcadPriority(e.target.value)} placeholder="Priority" style={{ width: "80px" }} title="Priority (Sort Order)" />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label>ResearchGate URL</label>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <span style={{ padding: "10px", background: "#333", borderRadius: "4px", minWidth: "40px", textAlign: "center" }}>RG</span>
                                    <input type="text" value={researchgateUrl} onChange={(e) => setResearchgateUrl(e.target.value)} placeholder="https://researchgate.net/profile/..." style={{ flex: 1 }} />
                                    <input type="number" value={researchgatePriority} onChange={(e) => setResearchgatePriority(e.target.value)} placeholder="Priority" style={{ width: "80px" }} title="Priority (Sort Order)" />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label>ORCID URL</label>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <span style={{ padding: "10px", background: "#333", borderRadius: "4px", minWidth: "40px", textAlign: "center" }}>ID</span>
                                    <input type="text" value={orcidUrl} onChange={(e) => setOrcidUrl(e.target.value)} placeholder="https://orcid.org/..." style={{ flex: 1 }} />
                                    <input type="number" value={orcidPriority} onChange={(e) => setOrcidPriority(e.target.value)} placeholder="Priority" style={{ width: "80px" }} title="Priority (Sort Order)" />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label>Instructables URL</label>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <span style={{ padding: "10px", background: "#333", borderRadius: "4px", minWidth: "40px", textAlign: "center" }}>IS</span>
                                    <input type="text" value={instructablesUrl} onChange={(e) => setInstructablesUrl(e.target.value)} placeholder="https://instructables.com/member/..." style={{ flex: 1 }} />
                                    <input type="number" value={instructablesPriority} onChange={(e) => setInstructablesPriority(e.target.value)} placeholder="Priority" style={{ width: "80px" }} title="Priority (Sort Order)" />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label>Hackaday URL</label>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <span style={{ padding: "10px", background: "#333", borderRadius: "4px", minWidth: "40px", textAlign: "center" }}>HD</span>
                                    <input type="text" value={hackadayUrl} onChange={(e) => setHackadayUrl(e.target.value)} placeholder="https://hackaday.io/..." style={{ flex: 1 }} />
                                    <input type="number" value={hackadayPriority} onChange={(e) => setHackadayPriority(e.target.value)} placeholder="Priority" style={{ width: "80px" }} title="Priority (Sort Order)" />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label>Email Address</label>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <span style={{ padding: "10px", background: "#333", borderRadius: "4px", minWidth: "40px", textAlign: "center" }}>@</span>
                                    <input type="text" value={emailContact} onChange={(e) => setEmailContact(e.target.value)} placeholder="yourname@example.com" style={{ flex: 1 }} />
                                    <input type="number" value={emailPriority} onChange={(e) => setEmailPriority(e.target.value)} placeholder="Priority" style={{ width: "80px" }} title="Priority (Sort Order)" />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label>WhatsApp Number</label>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <span style={{ padding: "10px", background: "#333", borderRadius: "4px", minWidth: "40px", textAlign: "center" }}>WA</span>
                                    <input
                                        type="text"
                                        value={whatsappContact}
                                        onChange={(e) => setWhatsappContact(e.target.value)}
                                        placeholder="e.g. +8801XXXXXXXXX"
                                        style={{ flex: 1 }}
                                    />
                                    <input type="number" value={whatsappPriority} onChange={(e) => setWhatsappPriority(e.target.value)} placeholder="Priority" style={{ width: "80px" }} title="Priority (Sort Order)" />
                                </div>
                                <div style={{ fontSize: "0.75rem", color: "#888", marginTop: "4px" }}>
                                    Include country code. Used for the "Get In Touch" button.
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                                <button type="submit" className="admin-btn-primary">Save Social Links</button>
                                <button type="button" onClick={loadSocialDefaults} className="admin-btn-primary" style={{ background: "var(--bg-secondary)" }}>Load Defaults</button>
                                <button type="button" onClick={loadGeneral} className="admin-btn-secondary">Reset</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Themes Tab */}
                {activeTab === "themes" && (
                    <div>
                        <h1>Select Theme</h1>
                        <p style={{ marginBottom: "2rem", color: "#888" }}>Choose a visual style for your portfolio.</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                            {availableThemes.map((t) => (
                                <div
                                    key={t.id}
                                    onClick={() => setSelectedTheme(t.id)}
                                    style={{
                                        padding: "1rem",
                                        border: selectedTheme === t.id ? "2px solid var(--primary-color, #ff9f1c)" : "1px solid #333",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        background: selectedTheme === t.id ? "rgba(255,159,28,0.1)" : "transparent",
                                    }}
                                >
                                    <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                                        <div style={{ width: "30px", height: "30px", background: t.bg, borderRadius: "4px", border: "1px solid #555" }} />
                                        <div style={{ width: "30px", height: "30px", background: t.sec, borderRadius: "4px", border: "1px solid #555" }} />
                                        <div style={{ width: "30px", height: "30px", background: t.txt, borderRadius: "4px", border: "1px solid #555" }} />
                                    </div>
                                    <div style={{ fontWeight: 600 }}>{t.name}</div>
                                </div>
                            ))}
                        </div>
                        <button onClick={saveTheme} className="admin-btn-primary" style={{ marginTop: "2rem", maxWidth: "200px" }}>Apply Theme</button>
                    </div>
                )}

                {/* Experience Tab */}
                {activeTab === "experience" && (
                    <div>
                        <h1>Experience</h1>
                        <StarredBanner count={experienceList.filter((i) => i.starred).length} max={3} label="experience entries" />
                        <button onClick={() => openEditModal("experience")} className="admin-btn-primary" style={{ marginBottom: "1rem" }}>Add New Experience</button>
                        <div className="admin-item-list">
                            {experienceList.map((item) => (
                                <div key={item.id as string} className="admin-list-item">
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                        <StarButton
                                            starred={!!item.starred}
                                            onClick={() => toggleStar("experience", item.id as string, !!item.starred, experienceList, 3)}
                                            disabled={!item.starred && experienceList.filter((i) => i.starred).length >= 3}
                                        />
                                        <div><strong>{item.role as string}</strong> at {item.company as string}</div>
                                    </div>
                                    <div className="admin-actions">
                                        <button className="admin-btn-edit" onClick={() => openEditModal("experience", item.id as string)}>Edit</button>
                                        <button className="admin-btn-delete" onClick={() => deleteItem("experience", item.id as string)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects Tab */}
                {activeTab === "projects" && (
                    <div>
                        <h1>Projects</h1>
                        <StarredBanner count={projectsList.filter((i) => i.starred).length} max={3} label="projects" />
                        <button onClick={() => openEditModal("project")} className="admin-btn-primary" style={{ marginBottom: "1rem" }}>Add New Project</button>
                        <div className="admin-item-list">
                            {projectsList.map((item) => (
                                <div key={item.id as string} className="admin-list-item">
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <StarButton
                                            starred={!!item.starred}
                                            onClick={() => toggleStar("projects", item.id as string, !!item.starred, projectsList, 3)}
                                            disabled={!item.starred && projectsList.filter((i) => i.starred).length >= 3}
                                        />
                                        {item.imageurl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={item.imageurl as string} alt="" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }} />
                                        ) : (
                                            <div style={{ width: "50px", height: "50px", background: "#333", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: "0.8rem" }}>No Img</div>
                                        )}
                                        <strong>{item.title as string}</strong>
                                    </div>
                                    <div className="admin-actions">
                                        <button className="admin-btn-edit" onClick={() => openEditModal("projects", item.id as string)}>Edit</button>
                                        <button className="admin-btn-delete" onClick={() => deleteItem("projects", item.id as string)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education Tab */}
                {activeTab === "education" && (
                    <div>
                        <h1>Education</h1>
                        <StarredBanner count={educationList.filter((i) => i.starred).length} max={3} label="education entries" />
                        <button onClick={() => openEditModal("education")} className="admin-btn-primary" style={{ marginBottom: "1rem" }}>Add New Education</button>
                        <div className="admin-item-list">
                            {educationList.map((item) => (
                                <div key={item.id as string} className="admin-list-item">
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <StarButton
                                            starred={!!item.starred}
                                            onClick={() => toggleStar("education", item.id as string, !!item.starred, educationList, 3)}
                                            disabled={!item.starred && educationList.filter((i) => i.starred).length >= 3}
                                        />
                                        {item.imageurl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={item.imageurl as string} alt="" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }} />
                                        ) : (
                                            <div style={{ width: "50px", height: "50px", background: "#333", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: "0.8rem" }}>No Img</div>
                                        )}
                                        <div>
                                            <strong>{item.school as string}</strong>
                                            <div style={{ fontSize: "0.85rem", color: "#666" }}>
                                                {item.major as string} • {item.start_year as string}-{(item.end_year as string) || "Present"}
                                                {item.cgpa ? ` • CGPA: ${item.cgpa}` : ""}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="admin-actions">
                                        <button className="admin-btn-edit" onClick={() => openEditModal("education", item.id as string)}>Edit</button>
                                        <button className="admin-btn-delete" onClick={() => deleteItem("education", item.id as string)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills Tab */}
                {activeTab === "skills" && (
                    <div>
                        <h1>Skills Management</h1>

                        <div className="admin-form-group" style={{ marginBottom: "2rem", padding: "1.5rem", background: "var(--bg-secondary, #1a1a1a)", borderRadius: "8px", border: "1px solid #333" }}>
                            <h3 style={{ marginTop: 0 }}>Manage Categories</h3>
                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "1rem" }}>
                                {skillCategories.map(cat => (
                                    <span key={cat} style={{ background: "#444", color: "white", padding: "4px 10px", borderRadius: "15px", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "8px" }}>
                                        {editingCategory === cat ? (
                                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                                <input 
                                                    autoFocus
                                                    value={editCategoryInput} 
                                                    onChange={(e) => setEditCategoryInput(e.target.value)} 
                                                    onKeyDown={(e) => e.key === "Enter" && renameSkillCategory(cat)}
                                                    onBlur={() => setEditingCategory(null)}
                                                    style={{ background: "#222", color: "white", border: "1px solid #666", padding: "2px 5px", borderRadius: "4px", fontSize: "0.8rem", width: "100px" }}
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <span onClick={() => { setEditingCategory(cat); setEditCategoryInput(cat); }} style={{ cursor: "pointer" }} title="Click to rename">{cat}</span>
                                                <button onClick={() => deleteSkillCategory(cat)} style={{ background: "none", border: "none", color: "#ff6b6b", cursor: "pointer", fontSize: "1.1rem", padding: "0" }}>&times;</button>
                                            </>
                                        )}
                                    </span>
                                ))}
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <input type="text" placeholder="New Category Name" value={newCategoryInput} onChange={(e) => setNewCategoryInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkillCategory())} style={{ flex: 1 }} />
                                <button onClick={addSkillCategory} className="admin-btn-secondary" style={{ width: "auto" }}>Add Category</button>
                            </div>
                        </div>

                        <h2>Skills</h2>
                        <StarredBanner count={skillsList.filter((i) => i.starred).length} max={9} label="skills" />

                        <div className="admin-form-group" style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
                            <div style={{ flex: 1 }}>
                                <label>Category</label>
                                <select value={newSkillCategory} onChange={(e) => setNewSkillCategory(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #444", background: "transparent", color: "inherit" }}>
                                    {skillCategories.length === 0 && <option value="General">General</option>}
                                    {skillCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div style={{ flex: 2 }}>
                                <label>Skill Name</label>
                                <input type="text" value={newSkillInput} onChange={(e) => setNewSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} style={{ width: "100%" }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label>Priority</label>
                                <input type="number" value={newSkillPriorityInput} onChange={(e) => setNewSkillPriorityInput(e.target.value)} placeholder="0" style={{ width: "100%" }} />
                            </div>
                            <button onClick={addSkill} className="admin-btn-primary" style={{ width: "auto" }}>Add Skill</button>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
                            {skillsList.map((item) => {
                                const nameStr = item.name as string;
                                const colonIdx = nameStr.indexOf(":");
                                const cat = colonIdx > -1 ? nameStr.slice(0, colonIdx).trim() : "General";
                                const name = colonIdx > -1 ? nameStr.slice(colonIdx + 1).trim() : nameStr;

                                return (
                                    <div
                                        key={item.id as string}
                                        style={{
                                            background: item.starred ? "rgba(245,166,35,0.15)" : "var(--bg-secondary, #1a1a1a)",
                                            border: item.starred ? "1px solid #f5a623" : "1px solid #333",
                                            padding: "8px 15px",
                                            borderRadius: "8px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            gap: "15px",
                                            color: "inherit",
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
                                            <span
                                                onClick={() => toggleStar("skills", item.id as string, !!item.starred, skillsList, 9)}
                                                title={item.starred ? "Unstar" : "Star (show on home)"}
                                                style={{ cursor: "pointer", color: item.starred ? "#f5a623" : "#888", fontSize: "1.2rem" }}
                                            >
                                                {item.starred ? "★" : "☆"}
                                            </span>
                                            
                                            <select 
                                                value={cat} 
                                                onChange={(e) => updateSkillCategory(item.id as string, nameStr, e.target.value)}
                                                style={{ padding: "2px 5px", fontSize: "0.75rem", background: "#333", color: "white", border: "none", borderRadius: "4px" }}
                                            >
                                                {skillCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>

                                            <span style={{ fontWeight: 500 }}>{name}</span>
                                        </div>
                                        
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <input 
                                                type="number" 
                                                value={item.priority === null || item.priority === undefined ? "" : String(item.priority)} 
                                                onChange={(e) => updateSkillPriority(item.id as string, e.target.value)}
                                                style={{ width: "60px", padding: "4px", fontSize: "0.8rem", background: "#222", color: "white", border: "1px solid #444", borderRadius: "4px", textAlign: "center" }}
                                                placeholder="Pri..."
                                                title="Priority (Sort Order)"
                                            />
                                            <button 
                                                onClick={() => deleteItem("skills", item.id as string)} 
                                                style={{ color: "#ff6b6b", background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", padding: "0 5px" }}
                                                title="Delete skill"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Achievements Tab */}
                {activeTab === "achievements" && (
                    <div>
                        <h1>Achievements</h1>
                        <StarredBanner count={achievementsList.filter((i) => i.starred).length} max={3} label="achievements" />
                        <button onClick={() => openEditModal("achievement")} className="admin-btn-primary" style={{ marginBottom: "1rem" }}>Add New Achievement</button>
                        <div className="admin-item-list">
                            {achievementsList.map((item) => (
                                <div key={item.id as string} className="admin-list-item">
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <StarButton
                                            starred={!!item.starred}
                                            onClick={() => toggleStar("achievements", item.id as string, !!item.starred, achievementsList, 3)}
                                            disabled={!item.starred && achievementsList.filter((i) => i.starred).length >= 3}
                                        />
                                        {item.imageurl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={item.imageurl as string} alt="" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }} />
                                        ) : (
                                            <div style={{ width: "50px", height: "50px", background: "#333", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: "0.8rem" }}>No Img</div>
                                        )}
                                        <strong>{item.title as string}</strong>
                                    </div>
                                    <div className="admin-actions">
                                        <button className="admin-btn-edit" onClick={() => openEditModal("achievements", item.id as string)}>Edit</button>
                                        <button className="admin-btn-delete" onClick={() => deleteItem("achievements", item.id as string)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="admin-modal-overlay" onClick={(e) => { if ((e.target as HTMLElement).classList.contains("admin-modal-overlay")) setEditModalOpen(false); }}>
                    <div className="admin-modal-box">
                        <h2>{editId ? `Edit ${editCollection}` : `Add ${editCollection}`}</h2>
                        <form onSubmit={handleEditSubmit}>
                            {(schemas[editCollection] || []).map((field) => (
                                <div key={field.name} className="admin-form-group">
                                    <label>{field.label}</label>
                                    {field.type === "textarea" ? (
                                        <textarea
                                            rows={4}
                                            value={editFields[field.name] || ""}
                                            onChange={(e) => setEditFields((prev) => ({ ...prev, [field.name]: e.target.value }))}
                                        />
                                    ) : field.type === "file" ? (
                                        <>
                                            <input
                                                type="file"
                                                onChange={(e) => setEditFiles((prev) => ({ ...prev, [field.name]: e.target.files?.[0] || null }))}
                                            />
                                            {editFields[field.name] && (
                                                <div style={{ fontSize: "0.8rem", marginTop: "5px", color: "#888" }}>Current: {editFields[field.name]}</div>
                                            )}
                                        </>
                                    ) : (
                                        <input
                                            type={field.type}
                                            value={editFields[field.name] || ""}
                                            onChange={(e) => setEditFields((prev) => ({ ...prev, [field.name]: e.target.value }))}
                                        />
                                    )}
                                </div>
                            ))}
                            <button type="submit" className="admin-btn-primary">Save</button>
                            <button type="button" onClick={() => setEditModalOpen(false)} style={{ marginTop: "10px", background: "#6c757d", border: "none", color: "white", padding: "10px", width: "100%", borderRadius: "4px", cursor: "pointer" }}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
