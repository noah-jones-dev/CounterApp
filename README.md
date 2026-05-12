# CounterApp

A tray-resident counter built with Angular + PrimeNG, packaged as an Electron desktop app.

## Installation

### Prerequisites (one-time)

- [Node.js LTS](https://nodejs.org) (v20+)
- Git
  - Windows: [Git for Windows](https://git-scm.com/download/win)
  - macOS: comes with Xcode Command Line Tools (`xcode-select --install`)

### Clone

```bash
git clone https://github.com/noah-jones-dev/CounterApp.git
cd CounterApp
npm install
```

### Run without installing (any platform)

```bash
npm start
```

### Windows — build the installer

```bash
npm run dist
```

Produces an NSIS installer in `release/` (e.g. `release/Counter Setup 1.0.0.exe`). Run it — it prompts for an install location and creates a desktop shortcut and Start Menu entry named **Counter**. The app parks itself in the system tray.

### macOS — build the desktop app

Must be built **on a Mac** (Windows can't cross-compile a macOS app).

```bash
npm run dist:mac
```

Produces `release/Counter-1.0.0-arm64.dmg` (Apple Silicon). Open the DMG and drag **Counter.app** to Applications. Drag from Applications to the Dock if you want a dock icon. The app lives in the menu bar (the macOS equivalent of the Windows system tray) — click the icon to open the counter.

First launch: the app is unsigned, so macOS will block it. Right-click `Counter.app` → **Open** → confirm "Open" once. After that it launches normally.

## Updating

After cloning, pulling new changes and rebuilding is a one-step task in VS Code:

1. Open the `CounterApp/` folder in VS Code.
2. `Ctrl+Shift+P` → **Run Task** → **Update & Build**.

This runs `git pull && npm install && npm run dist` (Windows) in a dedicated terminal panel. The new installer lands in `release/` — run it to update the existing installation.

Or, from any terminal:

```bash
git pull
npm install
npm run dist        # Windows installer
npm run dist:mac    # macOS DMG (on a Mac)
```
