# JS Frameworks Sandbox

A monorepo showcasing modern frontend capabilities through specialized applications. This project serves as a technical playground for exploring state management, reactivity models, and unified deployment strategies using **Angular 19** and **Svelte 5**.

## 🎯 Concept

The repository is structured as a framework "buffet." A centralized entry point (Vanilla HTML/CSS portal) allows users to choose their engine. Each sub-project is treated as an independent, fully-featured application deployed to its own sub-route.

---

## 🅰️ Angular 19: Article Hub

A robust, enterprise-grade application demonstrating the power of the new Angular reactivity model.

### Key Features:

- **Signals-Based State:** Utilizing the latest Angular Signals for fine-grained reactivity and optimized change detection.
- **Clean Architecture:** Structured using the "Core/Features/Shared" pattern for maximum maintainability.
- **Vite & esbuild Engine:** Lightning-fast development and production builds, moving away from legacy Webpack constraints.
- **Modular UI:** A library of reusable standalone components including custom loaders, avatars, and article cards.

**Tech Stack:** Angular 19, TypeScript, TailwindCSS, Angular Router.

---

## 🟠 Svelte 5: Pure DOM Tetris

A high-performance gaming engine built to stress-test the new **Svelte 5 Runes** and DOM-based rendering.

### Key Features:

- **Runes Reactivity:** Powered by `$state`, `$derived`, and `$effect` for explicit and efficient data flow.
- **Zero Virtual DOM:** Direct DOM manipulation ensures minimal overhead even with high-frequency updates (60fps gameplay).
- **Svelte Motion:** Integrated spring physics for a "juicy" UI feel, especially in score animations and transitions.
- **Mobile Responsive:** A hybrid layout that adapts from a sidebar-driven desktop view to a touch-optimized mobile experience.
- **Persistent Stats:** A dedicated service using local storage to track "Hall of Fame" records across sessions.

**Tech Stack:** Svelte 5, SvelteKit, TypeScript, TailwindCSS, Svelte Motion.

---

## 🛠 Project Structure

```text
.
├── angular-app/       # Angular 19 Source code
├── svelte-app/        # Svelte 5 Source code
├── index.html         # Main portal entry point
├── build.js           # Unified Node.js build orchestrator
└── package.json       # Root configuration & scripts
```
