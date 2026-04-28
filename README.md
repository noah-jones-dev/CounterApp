# CounterApp

A tray-resident counter built with Angular + PrimeNG, packaged as an Electron desktop app.

## Installation

### Prerequisites (one-time)

- [Node.js LTS](https://nodejs.org) (v20+)
- [Git for Windows](https://git-scm.com/download/win)

### Build the installer

```bash
git clone https://github.com/noah-jones-dev/CounterApp.git
cd CounterApp
npm install
npm run dist
```

`npm run dist` produces an NSIS installer in `release/` (e.g. `release/Counter Setup 1.0.0.exe`).

### Install

Run the generated `.exe`. It will prompt for an install location and create a desktop shortcut and Start Menu entry named **Counter**. Launch from either — the app parks itself in the system tray.

### Run without installing

To launch directly without producing an installer:

```bash
npm start
```
