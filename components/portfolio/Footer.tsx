"use client";

import { motion } from "framer-motion";
import type { PortfolioConfig } from "@/types/portfolio";
import SocialLinks from "./SocialLinks";

interface Props {
    config: PortfolioConfig | null;
}

export default function Footer({ config }: Props) {
    const year = new Date().getFullYear();

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
                    style={{ fontSize: "2rem", marginBottom: "3rem", textAlign: "center" }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Let&apos;s Connect
                </motion.h2>

                <motion.div
                    className="footer-socials"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <SocialLinks socials={config?.socials} />
                </motion.div>

                <motion.p
                    style={{ marginTop: "3rem", fontSize: "0.8rem", color: "var(--text-secondary)", opacity: 0.6 }}
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
