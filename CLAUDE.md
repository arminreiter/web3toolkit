# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Web3ToolKit is a static web3 utility application built with Next.js (App Router). It provides blockchain tools for EVM-compatible chains: key management, balance queries, fund operations, and utilities. Deployed as static HTML to Azure Static Web Apps.

**Always use the latest versions** of dependencies, frameworks, and language features.

## Commands

Package manager: **pnpm**

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build (static export to `out/`) |
| `pnpm test` | Run all tests (vitest) |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm lint` | ESLint |
| `pnpm vitest run src/lib/store.test.ts` | Run a single test file |

Build uses Turbopack (default). Crypto polyfills are configured via `turbopack.resolveAlias` in `next.config.js`.

## Architecture

**Static export:** `output: 'export'` in `next.config.js` — no server runtime. All pages are pre-rendered to HTML. Network-dependent tools (balance queries, drain funds) call blockchain RPCs from the browser.

**State management:** Zustand store (`src/lib/store.ts`) — holds input, results, selected network, and action queue. Replaces Angular's DataService from the original app.

**Web3 libraries:** `ethers` v6 for wallet/key operations (HD wallets, mnemonics, signing). `web3` v4 for RPC calls (balances, transactions, contract interactions). Both require browser polyfills configured in `next.config.js` (crypto-browserify, stream-browserify, buffer, etc.). Buffer/process globals are set in `src/lib/polyfills.ts`, imported via `BigIntPolyfill.tsx`.

**Action system:** `src/lib/actions/` — abstract `Action` class with `run(input: ActionInput)` method. Actions are composable in the Automator page where output chains to next input.

**Key data flow:**
- Tool pages: local `useState` → call `Web3Service` static methods → display result
- Automator: Zustand store → sequential action execution → results chain via `lastResult`

### Route structure

- `/` — Home
- `/tools/*` — 12 individual tool pages (each under `src/app/tools/<toolname>/page.tsx`)
- `/tools` — Tool overview grid
- `/automator` — Action pipeline builder
- `/about` — Documentation with "Try out" demo buttons

### Key directories

- `src/lib/services/web3.service.ts` — Core blockchain logic (all static methods)
- `src/lib/models/network.ts` — Network definitions with localStorage persistence for custom networks
- `src/lib/actions/` — Action classes for the automator pipeline
- `src/components/layout/` — Sidenav, MainHeader (network selector), Sidebar, ActionCard
- `src/components/ui/` — shadcn/ui components (Button, Card, Dialog, Accordion, DropdownMenu, Input, Textarea, Label, Separator)
- `_archive/` — Legacy Angular app (excluded from builds/tests, reference only)

## Conventions

- All tool pages use `'use client'` directive
- Path alias: `@/` maps to `src/`
- Styling: Tailwind CSS v4 with shadcn/ui components, dark theme via next-themes (`attribute="class"`, `defaultTheme="dark"`)
- Icons: Lucide React (`lucide-react`)
- Theme colors defined as CSS variables in `src/app/globals.css` (primary #0D6BF5, accent #0dcaf0, background #000007)
- Tests use Vitest with `node` environment (not jsdom) to avoid ethers.js crypto issues
- `_archive/` is excluded in both `tsconfig.json` and `vitest.config.ts`
- Network selection via URL query param: `?net=eth`, `?net=avax`, etc.

## Turbopack polyfills

The `next.config.js` turbopack config provides browser polyfills for Node.js built-ins needed by ethers/web3 via `resolveAlias`. `BigInt.prototype.toJSON` is patched client-side via `BigIntPolyfill.tsx` component.
