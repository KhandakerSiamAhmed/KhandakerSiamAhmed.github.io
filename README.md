# Khandaker Siam Ahmed - Portfolio

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-blue?style=for-the-badge)](https://KhandakerSiamAhmed.github.io)
[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

A premium, high-performance portfolio website for **Khandaker Siam Ahmed**, a Mechanical Engineer specializing in Robotics, Mechatronics, and Intelligent Control Systems.

## 🚀 Overview

This website serves as a digital resume and project showcase, highlighting expertise in mechanical design, autonomous systems, and mechatronics. It features a modern, responsive interface built with the latest web technologies and integrates automated CI/CD workflows for resume generation.

## ✨ Key Features

- **Dynamic Content**: Data is fetched from Supabase, allowing for easy updates without redeploying code.
- **Modern UI/UX**: Built with Tailwind CSS 4.0 and Framer Motion for smooth animations and a premium feel.
- **Automated CV Generation**: A GitHub Action automatically compiles `assets/updated_cv.tex` (LaTeX) into a PDF on every push, ensuring the downloadable resume is always up-to-date.
- **Responsive Design**: Optimized for all devices, from mobile phones to high-resolution desktops.
- **Project Showcase**: Detailed sections for engineering projects, including CAD illustrations and technical achievements.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend/CMS**: [Supabase](https://supabase.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **DevOps**: GitHub Actions (LaTeX to PDF compilation)

## 📁 Project Structure

```text
├── app/               # Next.js App Router pages and layouts
├── components/        # Reusable React components
│   └── portfolio/     # Portfolio-specific components (Hero, Exp, Skills, etc.)
├── lib/               # Utility functions and API clients (Supabase)
├── public/            # Static assets (images, icons)
├── assets/            # LaTeX CV source files
├── .github/workflows/ # GitHub Actions for automated CV generation
└── types/             # TypeScript definitions
```

## ⚙️ Setup and Installation

### Prerequisites

- Node.js 18+
- NPM or PNPM
- Supabase account (for content management)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KhandakerSiamAhmed/KhandakerSiamAhmed.github.io.git
   cd KhandakerSiamAhmed.github.io
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚢 Deployment

The site is configured for deployment on **GitHub Pages** or **Vercel**.

For GitHub Pages:
1. Ensure `next.config.ts` has `output: 'export'` (if using a static export).
2. Push to the `main` branch.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Designed and developed by **Khandaker Siam Ahmed**.
