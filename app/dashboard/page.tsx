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
        { name: "order", label: "Order", type: "number" },
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
    ],
    achievements: [
        { name: "title", label: "Title", type: "text" },
        { name: "category", label: "Category", type: "text" },
        { name: "youtubeurl", label: "YouTube Video URL (Optional)", type: "text" },
        { name: "icon", label: "Icon (SVG String)", type: "textarea" },
        { name: "imageurl", label: "Thumbnail (Square)", type: "file" },
        { name: "bannerurl", label: "Detail Banner (Free Size)", type: "file" },
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
    ],
};

const availableThemes = [
    { id: "default", name: "Dark Minimalist", bg: "#050505", sec: "#111111", txt: "#ffffff" },
    { id: "titanium", name: "Titanium Industrial", bg: "#0e0e0e", sec: "#141414", txt: "#e0e0e0" },
    { id: "blueprint", name: "Blueprint Technical", bg: "#0a192f", sec: "#112240", txt: "#e6f1ff" },
    { id: "light", name: "Professional Light", bg: "#ffffff", sec: "#f8f9fa", txt: "#333333" },
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

    // Collections
    const [experienceList, setExperienceList] = useState<Record<string, unknown>[]>([]);
    const [projectsList, setProjectsList] = useState<Record<string, unknown>[]>([]);
    const [educationList, setEducationList] = useState<Record<string, unknown>[]>([]);
    const [achievementsList, setAchievementsList] = useState<Record<string, unknown>[]>([]);
    const [skillsList, setSkillsList] = useState<Record<string, unknown>[]>([]);
    const [newSkillInput, setNewSkillInput] = useState("");

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
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            setLoggedIn(true);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                setLoginError(error.message);
            } else {
                setLoggedIn(true);
            }
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
            const socials = (val.socials || {}) as Record<string, string>;
            setLinkedinUrl(socials.linkedin || "");
            setGithubUrl(socials.github || "");
            setFacebookUrl(socials.facebook || "");
            setGrabcadUrl(socials.grabcad || "");
            setEmailContact(socials.email || "");
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

    // ===== SAVE GENERAL =====
    const saveGeneral = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

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
            socials: { linkedin: linkedinUrl, github: githubUrl, facebook: facebookUrl, grabcad: grabcadUrl, email: emailContact },
        };

        const { error } = await supabase.from("config").upsert({ key: "global", value: updated });
        setLoading(false);
        if (error) alert("Error: " + error.message);
        else {
            setConfig(updated);
            alert("Saved!");
        }
    };

    // ===== SAVE ALL =====
    const saveAll = async () => {
        setLoading(true);
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
            socials: { linkedin: linkedinUrl, github: githubUrl, facebook: facebookUrl, grabcad: grabcadUrl, email: emailContact },
        };

        const { error } = await supabase.from("config").upsert({ key: "global", value: updated });
        setLoading(false);
        if (error) alert("Error: " + error.message);
        else {
            setConfig(updated);
            alert("All changes saved successfully!");
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
            alert("Theme Applied!");
        }
    };

    // ===== SKILLS =====
    const addSkill = async () => {
        const val = newSkillInput.trim();
        if (!val) return;
        setLoading(true);
        await supabase.from("skills").insert({ name: val });
        setNewSkillInput("");
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
        setProfileImageUrl("/assets/Khandaker Siam Ahmed.svg");
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
                    {["general", "experience", "projects", "education", "skills", "achievements", "themes"].map((tab) => (
                        <button
                            key={tab}
                            className={activeTab === tab ? "active" : ""}
                            onClick={() => { setActiveTab(tab); setSidebarOpen(false); }}
                        >
                            {tab === "general" ? "General & Hero" : tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                            <h3>Social Links</h3>
                            <div className="admin-form-group"><label>LinkedIn URL</label><input type="text" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} /></div>
                            <div className="admin-form-group"><label>GitHub URL</label><input type="text" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} /></div>
                            <div className="admin-form-group"><label>Facebook URL</label><input type="text" value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} /></div>
                            <div className="admin-form-group"><label>GrabCAD URL</label><input type="text" value={grabcadUrl} onChange={(e) => setGrabcadUrl(e.target.value)} /></div>
                            <div className="admin-form-group"><label>Email Address</label><input type="text" value={emailContact} onChange={(e) => setEmailContact(e.target.value)} /></div>
                            <div style={{ display: "flex", gap: "1rem" }}>
                                <button type="submit" className="admin-btn-primary">Save Changes</button>
                                <button type="button" onClick={loadGeneral} className="admin-btn-secondary">Reset All</button>
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
                        <button onClick={() => openEditModal("experience")} className="admin-btn-primary" style={{ marginBottom: "1rem" }}>Add New Experience</button>
                        <div className="admin-item-list">
                            {experienceList.map((item) => (
                                <div key={item.id as string} className="admin-list-item">
                                    <div><strong>{item.role as string}</strong> at {item.company as string}</div>
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
                        <button onClick={() => openEditModal("project")} className="admin-btn-primary" style={{ marginBottom: "1rem" }}>Add New Project</button>
                        <div className="admin-item-list">
                            {projectsList.map((item) => (
                                <div key={item.id as string} className="admin-list-item">
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
                        <button onClick={() => openEditModal("education")} className="admin-btn-primary" style={{ marginBottom: "1rem" }}>Add New Education</button>
                        <div className="admin-item-list">
                            {educationList.map((item) => (
                                <div key={item.id as string} className="admin-list-item">
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
                        <h1>Skills</h1>
                        <div className="admin-form-group">
                            <label>Add Skill</label>
                            <input type="text" value={newSkillInput} onChange={(e) => setNewSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} />
                            <button onClick={addSkill} className="admin-btn-primary" style={{ width: "auto", marginTop: "10px" }}>Add</button>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "20px" }}>
                            {skillsList.map((item) => (
                                <div key={item.id as string} style={{ background: "#e9ecef", padding: "5px 10px", borderRadius: "15px", display: "flex", alignItems: "center", gap: "5px", color: "#333" }}>
                                    {item.name as string}
                                    <span onClick={() => deleteItem("skills", item.id as string)} style={{ cursor: "pointer", color: "red", fontWeight: "bold" }}>&times;</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Achievements Tab */}
                {activeTab === "achievements" && (
                    <div>
                        <h1>Achievements</h1>
                        <button onClick={() => openEditModal("achievement")} className="admin-btn-primary" style={{ marginBottom: "1rem" }}>Add New Achievement</button>
                        <div className="admin-item-list">
                            {achievementsList.map((item) => (
                                <div key={item.id as string} className="admin-list-item">
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
