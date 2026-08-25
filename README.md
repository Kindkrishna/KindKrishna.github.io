![K K Krishna Portfolio Banner] https://github.com/Kindkrishna/KindKrishna.github.io/blob/72f8e369c27a7c0f2ab4142f0c5c2539b8bd9617/image1.png))

# Kishor Kumar Krishna — Personal Portfolio Website

A clean, modern, mobile-responsive portfolio website for job applications in Data Science & BI.

---

## 📁 File Structure

```
portfolio/
├── index.html          ← Main HTML (all sections, SEO meta)
├── style.css           ← All styles (responsive, variables)
├── script.js           ← Interactivity (nav, animations, form)
├── profile.jpg         ← Your profile photo
├── Kishor_Kumar_Krishna_Resume_OnePage_Photo.pdf ← Your resume PDF
├── certificate.pdf     ← Your certificate PDF
├── favicon.svg         ← Browser favicon
└── README.md
```

---

## 🚀 Quick Start in VS Code

### Step 1 — Open the folder
```bash
code portfolio/
```

### Step 2 — Install Live Server (one-time)
1. Press `Ctrl+Shift+X` (Extensions panel)
2. Search **"Live Server"** by Ritwick Dey
3. Click Install

### Step 3 — Copy your photo & resume into the folder
- Place `kkphoto2.JPG` in the same folder as `index.html`
- The current resume file is `Kishor_Kumar_Krishna_Resume_OnePage_Photo.pdf`.

### Step 4 — Launch
- Right-click `index.html` → **Open with Live Server**
- Or click **Go Live** in the bottom-right status bar

---

## ➕ Adding a New Project Card

Open `script.js` and scroll to the bottom. Find the `extraProjects` array and add:

```js
const extraProjects = [
  {
    tag: 'Tableau',
    title: 'Sales Analytics Dashboard',
    desc: 'Built an executive dashboard showing YoY trends across 5 regions.',
    tech: ['Tableau', 'SQL', 'Excel'],
    link: 'https://github.com/Kindkrishna/your-repo'
  }
];
```

The card will appear automatically in the Projects section.

---

## 🌐 Deploy to GitHub Pages (Free Hosting)

1. Create a public GitHub repo named `kindkrishna.github.io`
2. Push all files from this folder to the repo root
3. In GitHub, go to **Settings → Pages**
4. Set the Source to `main` branch and `/ (root)` folder
5. Save and wait a minute for `https://kindkrishna.github.io` to become active

> If you are using a custom repo name, enable Pages on the repository root and visit `https://<your-username>.github.io/<repo-name>/`.

---

## ✏️ Customisation Cheatsheet

| What to change | Where |
|---|---|
| Your name / title | `index.html` → `.hero-name`, `.hero-title` |
| Profile photo | Replace `kkphoto2.JPG` |
| Resume PDF | Replace `Kishor_Kumar_Krishna_Resume_OnePage_Photo.pdf` |
| Skills & percentages | `index.html` → `data-w="88"` attribute |
| Accent color | `style.css` → `--c-accent: #1E40AF` |
| Add projects | `script.js` → `extraProjects` array |
| Contact email | `script.js` → `mailto:kishorkrishna123@gmail.com` |

---

## 📋 Sections Included

- **Hero** — Photo, name, title, CTA buttons, tech badges
- **About** — Bio, 4 stat cards, awards strip
- **Skills** — Animated skill bars + pill tags
- **Projects** — 4 project cards (2 real + 2 placeholder)
- **Resume** — Download button + education timeline
- **Contact** — Clickable links + email form (opens mail client)

---

## ✅ Features

- [x] Fully responsive (mobile / tablet / desktop)
- [x] SEO meta tags (title, description, keywords, OG)
- [x] Smooth scroll + active nav highlight
- [x] Animated skill bars on scroll
- [x] Fade-in animations (respects prefers-reduced-motion)
- [x] Mobile hamburger menu
- [x] Contact form → opens email client
- [x] Downloadable PDF resume link
- [x] GitHub-ready (3 clean files)
- [x] Dynamic project card injection via JS array

---

*Built for Kishor Kumar Krishna — Data Science & BI Professional*
