
<h1 align="center">
  Web3ToolKit
</h1>

<p align="center">
  <a style="text-decoration:none" href="https://w3tk.app" target="_blank">
    <img src="https://img.shields.io/badge/Website-w3tk.app-blue" alt="Website" />
  </a>
  <a style="text-decoration:none" href="https://github.com/arminreiter/web3toolkit/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/arminreiter/web3toolkit" alt="license" />
  </a>
  <a style="text-decoration:none" href="https://github.com/arminreiter/web3toolkit/actions/workflows/build.yml" target="_blank">
    <img src="https://github.com/arminreiter/web3toolkit/actions/workflows/build.yml/badge.svg" alt="build" />
  </a>
</p>

## Introduction

Web3ToolKit is an open-source web3 utility application for EVM-compatible blockchains. It runs entirely in the browser as a static site — no backend, no server. All blockchain calls are made directly from the client via RPC.

<https://w3tk.app>

## Tools

### Key Management
- Seed Phrase Generator
- Key Pair Generator
- Get Addresses from Seed Phrase
- Get Addresses from Private Key
- Get Address and Keys from Seed Phrase
- Import Wallet from JSON (V3 keystore)
- Export Wallet to JSON (V3 keystore)

### Wallet
- Get Balances (native + ERC-20)
- Get Balances per Block
- Drain Funds

### Blockchain
- Get Block
- Get Transaction
- ERC-20 Token Info
- ENS Resolver (forward + reverse lookup)

### Utils
- Is Valid Seed Phrase
- Is Valid Address
- Wei Converter

## Supported Networks

### Mainnets
| Network | Short Name |
|---------|------------|
| Arbitrum | arb-main |
| Avalanche | avax-main |
| Base | base-main |
| BNB Chain | bnb-main |
| Ethereum | eth-main |
| Gnosis | gns-main |
| Optimism | op-main |
| Polygon | poly-main |

### Testnets
| Network | Short Name |
|---------|------------|
| Arbitrum Sepolia | arb-test |
| Avalanche Fuji | avax-test |
| Base Sepolia | base-test |
| BNB Testnet | bnb-test |
| Ethereum Sepolia | eth-test |
| Gnosis Chiado | gns-test |
| Optimism Sepolia | op-test |
| Polygon Amoy | poly-test |

Custom networks can be added via the UI and are persisted in localStorage.

Network can be set via URL param: `?net=eth`, `?net=avax`, etc.

## Tech Stack

- **Framework:** Next.js (App Router) with static export
- **UI:** Tailwind CSS v4, shadcn/ui, Lucide icons, next-themes (dark mode)
- **Web3:** ethers v6 (wallet/key ops), browser polyfills via Turbopack
- **State:** Zustand
- **Tests:** Vitest
- **Package manager:** pnpm

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Development

```bash
pnpm install
pnpm dev
```

### Build

```bash
pnpm build
```

This produces a fully static site in the `out/` directory. Copy it to any static host (Nginx, S3, Azure Static Web Apps, etc.).

### Serve Locally

```bash
pnpm start
```

Serves the `out/` directory using `npx serve`.

### Tests

```bash
pnpm test          # run all tests
pnpm test:watch    # watch mode
```

### Lint

```bash
pnpm lint
```

## Desktop App (Tauri)

Web3ToolKit can be built as a native desktop app using [Tauri](https://v2.tauri.app). Tauri wraps the static site in a lightweight native webview — no bundled browser engine.

### Prerequisites

- [Rust](https://rustup.rs/) toolchain
- Platform-specific dependencies:
  - **Linux:** `sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev`
  - **macOS:** Xcode Command Line Tools (`xcode-select --install`)
  - **Windows:** [Microsoft Visual Studio C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/), [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)

### Setup

```bash
pnpm add -D @tauri-apps/cli
pnpm tauri init
```

During init, configure:
- **Frontend dev command:** `pnpm dev`
- **Frontend build command:** `pnpm build`
- **Frontend dist directory:** `../out`

### Development

```bash
pnpm tauri dev
```

Opens the app in a native window with hot reload.

### Build

```bash
pnpm tauri build
```

Produces platform-specific installers in `src-tauri/target/release/bundle/`:
- **Linux:** `.deb`, `.AppImage`
- **macOS:** `.dmg`, `.app`
- **Windows:** `.msi`, `.exe`

> **Note:** Tauri compiles natively, so each target platform must be built on that OS (or via CI with a build matrix).

## License

See [LICENSE](LICENSE).
