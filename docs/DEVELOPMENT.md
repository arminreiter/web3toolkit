# Development Guide

## Prerequisites

- **Node.js** 20+
- **pnpm** (install via `corepack enable` or `npm install -g pnpm`)

For the desktop app (Tauri), you also need:

- **Rust** toolchain — install via [rustup.rs](https://rustup.rs/)
- Platform-specific dependencies:
  - **Linux:** `sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev`
  - **macOS:** Xcode Command Line Tools (`xcode-select --install`)
  - **Windows:** [Visual Studio C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/), [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js dev server |
| `pnpm build` | Production build (static export to `out/`) |
| `pnpm start` | Serve the `out/` directory locally |
| `pnpm test` | Run all tests (Vitest) |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm lint` | ESLint |
| `pnpm tauri dev` | Start Tauri desktop app with hot reload |
| `pnpm tauri build` | Build platform-specific desktop installers |

### Running a single test file

```bash
pnpm vitest run src/lib/store.test.ts
```

## Tauri Desktop App

Web3ToolKit can be built as a native desktop app using [Tauri v2](https://v2.tauri.app). Tauri wraps the static site in a lightweight native webview — no bundled browser engine.

### Development

```bash
pnpm tauri dev
```

This starts the Next.js dev server and opens the app in a native window with hot reload.

### Building

```bash
pnpm tauri build
```

Produces platform-specific installers in `src-tauri/target/release/bundle/`:

| Platform | Output |
|----------|--------|
| Linux | `.deb`, `.AppImage` |
| macOS | `.dmg`, `.app` |
| Windows | `.msi`, `.exe` |

Tauri compiles natively, so each target platform must be built on that OS (or via CI with a build matrix).

### Tauri Configuration

- `src-tauri/tauri.conf.json` — app metadata, window config, build settings
- `src-tauri/Cargo.toml` — Rust dependencies
- `src-tauri/src/` — Rust source code

The frontend dist directory is set to `../out` (the Next.js static export output).

## Versioning

The version is defined in three places and must stay in sync:

| File | Field |
|------|-------|
| `package.json` | `"version"` |
| `src-tauri/tauri.conf.json` | `"version"` |
| `src-tauri/Cargo.toml` | `version` |

### Bumping the version

Use the built-in npm version command — it automatically syncs all three files:

```bash
pnpm version patch   # 2.0.0 → 2.0.1
pnpm version minor   # 2.0.0 → 2.1.0
pnpm version major   # 2.0.0 → 3.0.0
```

This runs `scripts/sync-version.mjs` under the hood, which reads the version from `package.json` and writes it to `tauri.conf.json` and `Cargo.toml`.

To sync manually (e.g., after editing `package.json` by hand):

```bash
node scripts/sync-version.mjs
```

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Home
│   ├── tools/
│   │   ├── page.tsx              # Tools overview grid
│   │   ├── genkeypair/           # Key Pair Generator
│   │   ├── genseedphrase/        # Seed Phrase Generator
│   │   ├── getaddrfromkey/       # Get Addresses from Private Key
│   │   ├── getaddrfromseed/      # Get Addresses from Seed Phrase
│   │   ├── getaddrkeysfromseed/  # Get Address and Keys from Seed Phrase
│   │   ├── getbalances/          # Get Balances
│   │   ├── getbalancesperblock/  # Get Balances per Block
│   │   ├── getblock/             # Get Block
│   │   ├── gettransaction/       # Get Transaction
│   │   ├── drainfunds/           # Drain Funds
│   │   ├── importwallet/         # Import Wallet from JSON
│   │   ├── exportwallet/         # Export Wallet to JSON
│   │   ├── tokeninfo/            # ERC-20 Token Info
│   │   ├── ensresolver/          # ENS Resolver
│   │   ├── isvalidaddress/       # Is Valid Address
│   │   ├── isvalidseed/          # Is Valid Seed Phrase
│   │   └── weiconverter/         # Wei Converter
│   ├── automator/                # Action pipeline builder
│   └── about/                    # Documentation page
├── components/
│   ├── layout/                   # Sidenav, MainHeader, Sidebar, ActionCard
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── services/web3.service.ts  # Core blockchain logic (all static methods)
│   ├── models/network.ts         # Network definitions + localStorage persistence
│   ├── actions/                   # Action classes for the automator pipeline
│   ├── store.ts                  # Zustand store
│   └── polyfills.ts              # Buffer/process globals
scripts/
├── sync-version.mjs              # Version sync script
src-tauri/                        # Tauri desktop app (Rust)
docs/
├── DEVELOPMENT.md                # This file
└── images/                       # Screenshots for README
```

## Architecture Notes

### Static Export

The app uses `output: 'export'` in `next.config.js` — there is no server runtime. All pages are pre-rendered to HTML. Network-dependent tools (balance queries, drain funds) call blockchain RPCs from the browser.

### State Management

Zustand store (`src/lib/store.ts`) holds input, results, selected network, and the action queue.

- **Tool pages:** local `useState` → call `Web3Service` static methods → display result
- **Automator:** Zustand store → sequential action execution → results chain via `lastResult`

### Web3 Libraries

- **ethers v6** for wallet/key operations (HD wallets, mnemonics, signing)
- Browser polyfills are configured via `turbopack.resolveAlias` in `next.config.js` (crypto-browserify, stream-browserify, buffer, etc.)
- `BigInt.prototype.toJSON` is patched client-side via `BigIntPolyfill.tsx`

### Action System

`src/lib/actions/` contains an abstract `Action` class with a `run(input: ActionInput)` method. Actions are composable in the Automator page where output chains to next input.

## Conventions

- All tool pages use `'use client'` directive
- Path alias: `@/` maps to `src/`
- Styling: Tailwind CSS v4 with shadcn/ui, dark theme via next-themes
- Icons: Lucide React
- Theme colors: primary `#0D6BF5`, accent `#0dcaf0`, background `#000007`
- Tests use Vitest with `node` environment (not jsdom) to avoid ethers.js crypto issues
- Network selection via URL query param: `?net=eth`, `?net=avax`, etc.
- `_archive/` contains the legacy Angular app (excluded from builds/tests)

## CI/CD

On push to `main`, GitHub Actions runs:

1. Install dependencies (`pnpm install --frozen-lockfile`)
2. Lint (`pnpm lint`)
3. Test (`pnpm test`)
4. Build (`pnpm build`)
5. Deploy static output to Azure Static Web Apps
