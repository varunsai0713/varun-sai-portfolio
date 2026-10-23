# Varun Sai — Personal Software Engineering Portfolio

A fast, clean, minimal single-page portfolio for Varun Sai, early-career Software Engineer specializing in Java, Spring Boot, React, and full-stack web applications.

## 🚀 Highlights & Tech Stack

- **Framework**: React 19 + Vite + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: `lucide-react`
- **Accessibility & SEO**: WCAG AA color contrast, keyboard navigable, skip-to-content, semantic HTML, OpenGraph meta tags, `robots.txt`, and `sitemap.xml`.
- **Single Source of Truth**: All portfolio text, skills, experience, and projects are centralized in `src/data/portfolio.ts`.
- **Profile Photo Support**: Place your photo at `public/profile.jpg` or set `profilePhoto` in `src/data/portfolio.ts`.

---

## 🛠️ Local Development

### Prerequisites
- Node.js 20+ (or compatible runtime)
- npm or bun

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/varun-sai-portfolio.git
   cd varun-sai-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the full application** in PowerShell:
   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\dev-fullstack.ps1
   ```
   The script prompts securely for the Gmail App Password, starts Spring Boot, waits for its health check, then starts the portfolio. Use a Google App Password for `varunsaiv0713@gmail.com`, not your regular Gmail password. Keep the terminal open; press **Ctrl+C** to stop both servers. Open [http://localhost:3000](http://localhost:3000). The form reports success only after Spring Boot accepts the email for sending.

   If both servers are already running and the form reports an email authentication error, restart Spring Boot with a fresh App Password:
   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\dev-fullstack.ps1 -RestartBackend
   ```
   This restarts only the verified Spring Boot process on port 8080; the running portfolio on port 3000 remains available.

5. **Run Unit Tests**:
   ```bash
   npx tsx --test src/utils/portfolio.test.ts
   ```

6. **Build for Production**:
   ```bash
   npm run build
   ```

---

## ☁️ Deployment Instructions

### Deploy to Vercel

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of Varun Sai portfolio"
   git remote add origin https://github.com/your-username/varun-sai-portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Select **Vite** as the framework preset (Build Command: `npm run build`, Output Directory: `dist`).
5. In Vercel, open **Project Settings > Environment Variables** and add `MAIL_APP_PASSWORD`. Paste the 16-character Google App Password without spaces, select **Production** (and **Preview** if you want contact forms to work on preview deployments), and save it. Do not add the password to this repository or share it in chat.
6. Deploy or redeploy the project so Vercel applies the environment variable.

The `api/contact.ts` Vercel Function sends contact messages to `varunsaiv0713@gmail.com` using Gmail SMTP. It runs on Vercel, so recruiters can submit the form without your computer, PowerShell, or Spring Boot being running. Configure `MAIL_USER` or `CONTACT_TO` in Vercel only if you need to change the sending or receiving Gmail address. The App Password is a one-time deployment secret; it is not entered by visitors.

For local development, continue using the PowerShell full-stack launcher above. It starts the local Spring Boot mail backend; the Vercel function is used by the deployed site.

---

## 📝 Updating Portfolio Content

To update any content on the site (experience, projects, skills, education, or contact details):
- Edit `src/data/portfolio.ts`.
- Components read directly from this file, so no UI code changes are needed!
- Replace `public/resume.pdf` with your latest updated resume PDF.
