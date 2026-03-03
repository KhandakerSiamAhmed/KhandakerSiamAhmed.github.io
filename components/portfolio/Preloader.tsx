"use client";

export default function Preloader() {
    return (
        <div className="site-loader" style={{ display: "block", paddingTop: "0" }}>
            {/* Navbar Skeleton */}
            <div style={{ padding: "2rem 0", borderBottom: "1px solid var(--border-color)" }}>
                <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {/* Logo */}
                    <div className="skeleton" style={{ width: "150px", height: "32px" }}></div>
                    {/* Links - Hidden on smaller screens but okay for general skeleton */}
                    <div className="hidden md:flex" style={{ gap: "3rem" }}>
                        <div className="skeleton" style={{ width: "60px", height: "20px" }}></div>
                        <div className="skeleton" style={{ width: "60px", height: "20px" }}></div>
                        <div className="skeleton" style={{ width: "60px", height: "20px" }}></div>
                        <div className="skeleton" style={{ width: "60px", height: "20px" }}></div>
                        <div className="skeleton" style={{ width: "60px", height: "20px" }}></div>
                    </div>
                </div>
            </div>

            {/* Hero Skeleton */}
            <div className="container" style={{ display: "flex", flexWrap: "wrap", marginTop: "8rem", gap: "4rem", alignItems: "center" }}>
                <div style={{ flex: "1.2", minWidth: "300px" }}>
                    <div className="skeleton" style={{ width: "80%", height: "3.5rem", marginBottom: "1rem" }}></div>
                    <div className="skeleton" style={{ width: "60%", height: "3.5rem", marginBottom: "2.5rem" }}></div>
                    <div className="skeleton" style={{ width: "90%", height: "1.2rem", marginBottom: "0.8rem" }}></div>
                    <div className="skeleton" style={{ width: "70%", height: "1.2rem", marginBottom: "2rem" }}></div>

                    <div style={{ display: "flex", gap: "1.5rem" }}>
                        <div className="skeleton" style={{ width: "150px", height: "3rem", borderRadius: "100px" }}></div>
                        <div className="skeleton" style={{ width: "150px", height: "3rem", borderRadius: "100px" }}></div>
                    </div>
                </div>

                <div style={{ flex: "0.8", display: "flex", justifyContent: "flex-end", minWidth: "250px" }}>
                    <div className="skeleton" style={{ width: "100%", maxWidth: "400px", aspectRatio: "1/1", borderRadius: "50%" }}></div>
                </div>
            </div>
        </div>
    );
}
