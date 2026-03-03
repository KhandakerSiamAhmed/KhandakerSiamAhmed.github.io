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
            <div className="container" style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "4rem",
                gap: "4rem",
                alignItems: "center",
                textAlign: "center"
            }}>
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <div className="skeleton" style={{ width: "100%", maxWidth: "300px", aspectRatio: "1/1", borderRadius: "50%" }}></div>
                </div>

                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className="skeleton" style={{ width: "80%", maxWidth: "500px", height: "3.5rem", marginBottom: "1rem" }}></div>
                    <div className="skeleton" style={{ width: "60%", maxWidth: "400px", height: "3.5rem", marginBottom: "2.5rem" }}></div>
                    <div className="skeleton" style={{ width: "90%", maxWidth: "600px", height: "1.2rem", marginBottom: "0.8rem" }}></div>
                    <div className="skeleton" style={{ width: "70%", maxWidth: "400px", height: "1.2rem", marginBottom: "2rem" }}></div>

                    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
                        <div className="skeleton" style={{ width: "150px", height: "3rem", borderRadius: "100px" }}></div>
                        <div className="skeleton" style={{ width: "150px", height: "3rem", borderRadius: "100px" }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
