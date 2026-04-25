# JS Frameworks Sandbox

A monorepo showcasing modern frontend capabilities through specialized applications. This project serves as a technical playground for exploring state management, reactivity models, and unified deployment strategies using **Angular 19** and **Svelte 5**.

## 🎯 Concept

The repository is structured as a framework "buffet." A centralized entry point (Vanilla HTML/CSS portal) allows users to choose their engine. Each sub-project is treated as an independent, fully-featured application deployed to its own sub-route.

> [!NOTE]
> In this project uses not just ui frameworks, but their metaframeworks (except angular that is fullstack by default).
> Each app uses pre-render with hydration and client-side routing.

---

## 🅰️ Angular 19: Article Hub

**Essence:** A content management platform focused on structured data flow and clean architectural boundaries.

**User Workflow:**
Users browse a dynamic feed of articles, navigate to full-text reading views, and manage content via a dedicated administrative dashboard.

### Key Features

- **Signals-Based State:** Utilizing the latest Angular Signals for fine-grained reactivity and optimized change detection.
- **Clean Architecture:** Structured using the "Core/Features/Shared" pattern for maximum maintainability.
- **Pre-render with Routing:** Leveraging Angular Router for declarative routing and pre-rendering at build time.

**Tech Stack:** Angular 19, TypeScript, TailwindCSS, Angular Router.

---

## 🟠 Svelte 5: Pure DOM Tetris

**Essence:** A classic tetris arcade engine demonstrating the performance of direct DOM manipulation and Svelte's latest reactivity model.

**User Workflow:**
Players interact with a responsive grid that scales across devices. Scores are calculated in real-time and saved to a persistent "Hall of Fame" via local storage.

### Key Features

- **Runes Reactivity:** Powered by `$state`, `$derived`, and `$effect` for explicit and efficient data flow.
- **Zero Virtual DOM:** Direct DOM manipulation ensures minimal overhead even with high-frequency updates (60fps gameplay).
- **Svelte Motion:** Integrated spring physics for a "juicy" UI feel, especially in score animations and transitions.
- **Pre-render with Routing:** Utilizing SvelteKit for serverless, client-side routing and pre-rendering at build time.

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
