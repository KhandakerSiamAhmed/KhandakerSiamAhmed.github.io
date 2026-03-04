"use client";

import { motion } from "framer-motion";
import type { PortfolioConfig } from "@/types/portfolio";

interface Props {
    config: PortfolioConfig | null;
}

export default function Footer({ config }: Props) {
    const year = new Date().getFullYear();
    const email = config?.socials?.email;
    // Use configured WhatsApp number, fallback to default
    const whatsapp = config?.socials?.whatsapp || "8801303048942";

    return (
        <motion.footer
            className="footer"
            id="contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        >
            <div className="container">
                <motion.h2
                    className="section-title"
                    style={{ fontSize: "2rem", marginBottom: "1rem", textAlign: "center" }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Get In Touch
                </motion.h2>

                <motion.p
                    style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: "2.5rem", fontSize: "1rem" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    Have a project in mind or want to collaborate? Reach out directly.
                </motion.p>

                <motion.div
                    className="footer-contact-btns"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    {email && (
                        <motion.a
                            href={`mailto:${email}`}
                            className="footer-contact-btn"
                            whileHover={{ y: -4, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            aria-label={`Send email to ${email}`}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <span>Email Me</span>
                        </motion.a>
                    )}
                    {whatsapp && (
                        <motion.a
                            href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-contact-btn"
                            whileHover={{ y: -4, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            aria-label="Chat on WhatsApp"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            <span>WhatsApp</span>
                        </motion.a>
                    )}
                    {!email && !whatsapp && (
                        <p style={{ color: "var(--text-secondary)", textAlign: "center" }}>
                            Configure contact details in the admin dashboard.
                        </p>
                    )}
                </motion.div>

                <motion.p
                    style={{ marginTop: "3rem", fontSize: "0.8rem", color: "var(--text-secondary)", opacity: 0.6, textAlign: "center" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    &copy; {year} Khandaker Siam Ahmed. All rights reserved.
                    <br /><br />
                    <a
                        href="/dashboard"
                        style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.7rem" }}
                    >
                        Admin Login
                    </a>
                </motion.p>
            </div>
        </motion.footer>
    );
}
