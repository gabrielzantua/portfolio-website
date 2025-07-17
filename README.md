# Gabriel Zantua – Portfolio Website

A terminal-themed personal portfolio built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.  
The site showcases my projects, skills, and background, wrapped in sleek animations and a green-on-black hacker aesthetic.

![Screenshot](./public/preview.png)

---

## ✨ Features

- Keyboard-style hero section with typing cursor
- Mouse-tracked green spotlight & click ripple effect
- Animated project cards with gradient borders and spring physics
- Dark / light theme toggle that respects system preference
- Responsive layout – looks great on all screen sizes
- Easily deployable (Vercel, Netlify, GitHub Pages)

## 🔧 Tech Stack

| Category | Tech |
|----------|------|
| Framework | [Next.js 14](https://nextjs.org/) |
| Language | TypeScript |
| Styling  | Tailwind CSS, CSS Modules |
| Animations | Framer Motion |
| Icons | Lucide-React |

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev      # http://localhost:3000
```

### Building for Production

```bash
npm run build    # Compiles for production
npm start        # Runs the optimized build
```

## 📂 Project Structure (trimmed)

```
portfolio-website/
├─ public/            # Static assets (favicons, images)
├─ src/
│  ├─ app/            # Next.js 14 App Router pages
│  ├─ components/     # Reusable React components
│  └─ styles/         # Global styles & Tailwind config
├─ package.json       # Scripts & dependencies
└─ tailwind.config.ts # Tailwind theme customization
```

## 🛠  Deployment

This repo is framework-agnostic – deploy wherever you like:

* **Vercel** – Zero-config, ideal for Next.js
* **Netlify** – `next build && next export` static export or serverless
* **GitHub Pages** – Use `next export` to generate static HTML, then push the `out/` folder

## 🤝 Contributing

Issues and PRs are welcome!  Please open an issue first to discuss major changes.

## 📄 License

Released under the **MIT License** – see [`LICENSE`](LICENSE) for details.
