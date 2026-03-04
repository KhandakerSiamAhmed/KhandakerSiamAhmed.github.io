"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
    href: string;
    label?: string;
}

export default function ViewMoreButton({ href, label = "View All" }: Props) {
    return (
        <motion.div
            className="view-more-wrapper"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
        >
            <Link href={href} className="view-more-btn">
                <span>{label}</span>
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </Link>
        </motion.div>
    );
}
