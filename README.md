# Leaderboard

A modern, interactive, and retro-themed web application to create, track, and manage tournament leaderboards with live ranking position animations.

**Live App:** [https://leaderboard-by-tuttu.vercel.app/](https://leaderboard-by-tuttu.vercel.app/)

## The Backstory
In tuition or among friends, we used to organize tournaments and manually track team points and tie-breakers on paper. It was very human-intensive, error-prone, and time-consuming. 

I built an initial version of this project years ago to solve that exact problem, and it worked wonderfully—we successfully hosted and completed countless tournaments with it. However, I never deployed it. Recently, as I began deploying my projects, I saw many opportunities to modernize and refine the app. I refactored the codebase, introduced live rank swap animations, custom tournament settings, JSON import/export, and mobile responsiveness to make it live and production-ready!

## Features
* **Live Rank Animations:** Uses FLIP (First, Last, Invert, Play) layout transitions to smoothly animate team row swaps whenever rankings change.
* **Custom Tournament Configuration:** Set custom tournament names and configure win points rule (e.g., +2 pts by default, or any custom value).
* **JSON Import & Export:** Export your entire tournament state (teams, stats, settings) into formatted `.json` files and import them anytime to restore progress.
* **Responsive Retro UI:** Vibrant retro aesthetics optimized for both desktop and mobile viewports with adaptive column labels and dedicated mobile tab switching.
* **Live Tournament Protection:** Includes browser refresh safety warnings to prevent accidental data loss during live matches.
* **Comprehensive Validation:** Strictly validates team name length (max 20 chars), win points/tie-breakers (max 7 digits), and prevents duplicate/opposing team selection errors.

## Technologies Used
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **UI & Styling:** Vanilla CSS (Custom tokens, animations, retro theme)
* **Utilities & Motion:** React, jQuery, React Toastify, JS Confetti

## Controls & Usage
* **Add:** Register a new team (up to 20 characters).
* **Delete:** Remove an existing team entry from the tournament.
* **Update:** Select the winning & losing teams and enter tie-breaker points to automatically compute match scores and update ranks.
* **Settings:** Change the Tournament Name, adjust Win Points rules, or Export/Import JSON data.
* **End Tournament:** Crown the champion with victory confetti once all matches finish.

## How to Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/AP-Abhishek/LeaderBoard-nextjs.git
   ```
2. Navigate to the project folder:
   ```bash
   cd LeaderBoard-nextjs
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` in your browser to view the app.

## Project Structure
```
leaderboard
├─ .eslintrc.json
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ medal.png
│  └─ winner.png
├─ README.md
├─ src
│  ├─ app
│  │  ├─ layout.tsx
│  │  ├─ not-found.tsx
│  │  ├─ page.tsx
│  │  └─ [...catchAll]
│  │     └─ page.tsx
│  ├─ components
│  │  ├─ AddTeam.tsx
│  │  ├─ Congrats.tsx
│  │  ├─ CustomDropdown.tsx
│  │  ├─ DeleteTeam.tsx
│  │  ├─ Heading.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ PointsTable.tsx
│  │  ├─ Settings.tsx
│  │  ├─ Sidebar.tsx
│  │  └─ UpdatePoints.tsx
│  ├─ data
│  │  └─ Teams.tsx
│  └─ styles
│     └─ global.css
├─ tailwind.config.ts
└─ tsconfig.json
```

---

© 2026 AP-Abhishek. All rights reserved.