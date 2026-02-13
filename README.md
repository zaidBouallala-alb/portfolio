# Personal Portfolio – Full Stack Web Developer
**By Zaid Bouallala**

Built with React, TypeScript, Tailwind CSS & Vite

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Vite](https://img.shields.io/badge/Vite-6.0-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-cyan)

A high-performance, responsive, and interactive personal portfolio website built with the modern React ecosystem. This project showcases professional experience, technical skills, and creative projects with a focus on clean code, accessibility, and premium UI/UX.

## 🔗 Live Demo

**[View Live Portfolio](https://fullstack-zaid.vercel.app/)**

<p align="center">
  <img src="./images/screenshot.png" alt="Portfolio Homepage" width="600"/>
  <br>
  <em>Portfolio Homepage Design</em>
</p>

<p align="center">
  <img src="./images/screenshot2.png" alt="Portfolio Projects Section" width="600"/>
  <br>
  <em>Projects Section</em>
</p>

##  Features

- **Modern Tech Stack**: Built with React 19, TypeScript, and Vite for blazing fast performance.
- **Responsive Design**: Mobile-first architecture ensures a perfect experience across all devices.
- **Dark Mode Support**: System-aware theme switching with persistent user preference.
- **Interactive UI**: Smooth animations using Framer Motion and custom CSS transitions.
- **Accessibility (a11y)**: Semantic HTML and ARIA labels for screen reader support.
- **High Performance**: Optimized assets, lazy loading, and code splitting.

##  Tech Stack

- **Framework**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

##  Project Structure

```bash
src/
├── components/      # Reusable UI components (Hero, About, Projects, etc.)
├── data/           # Static content (projects, skills, config) separation
├── hooks/          # Custom React hooks
├── types/          # TypeScript definitions
├── App.tsx         # Main application entry
└── index.css       # Global styles and Tailwind configuration
```

##  Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/myPortfolio.git
    cd myPortfolio
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Start the Development Server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view the app.

##  Building for Production

To create an optimized production build:

```bash
npm run build
```

The output will be generated in the `dist` directory, ready for deployment.

##  Deployment

### Vercel (Recommended) & Netlify

This project is optimized for static hosting. Connect your GitHub repository to Vercel or Netlify, and it will automatically detect the settings:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### GitHub Pages

To deploy to GitHub Pages:

1. Update `vite.config.ts` if this is a project repository (e.g., `username.github.io/repo-name`):

    ```ts
    export default defineConfig({
      base: '/repo-name/', // Add your repo name here
      // ...
    })
    ```

    *If this is your main user site (`username.github.io`), you can skip this step.*

2. Run the build:

    ```bash
    npm run build
    ```

3. Upload the contents of the `dist` folder to your repository (usually the `gh-pages` branch).

##  License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Designed and developed with ❤️.*
