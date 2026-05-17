const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain, screen } = require('electron');
const path = require('node:path');

const isDev = !app.isPackaged;
const ICON_PATH = path.join(__dirname, '..', 'public', 'favicon.ico');
const INDEX_PATH = path.join(__dirname, '..', 'dist', 'primeng-counter', 'browser', 'index.html');

let win = null;
let tray = null;
let isQuitting = false;

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => showWindow());
}

function createWindow() {
  win = new BrowserWindow({
    width: 460,
    height: 360,
    show: false,
    frame: false,
    resizable: false,
    fullscreenable: false,
    maximizable: false,
    skipTaskbar: false,
    icon: ICON_PATH,
    title: 'Counter',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.removeMenu();
  win.loadFile(INDEX_PATH);

  win.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault();
      win.hide();
    }
  });
}

function showWindow() {
  if (!win) return;
  positionNearTray();
  win.show();
  win.focus();
}

function toggleWindow() {
  if (!win) return;
  if (win.isVisible()) {
    win.hide();
  } else {
    showWindow();
  }
}

function positionNearTray() {
  if (!win || !tray) return;
  const trayBounds = tray.getBounds();
  const winBounds = win.getBounds();
  const display = screen.getDisplayNearestPoint({ x: trayBounds.x, y: trayBounds.y });
  const workArea = display.workArea;

  let x = Math.round(trayBounds.x + trayBounds.width / 2 - winBounds.width / 2);
  let y = Math.round(trayBounds.y - winBounds.height - 8);

  if (y < workArea.y) y = trayBounds.y + trayBounds.height + 8;
  x = Math.max(workArea.x + 8, Math.min(x, workArea.x + workArea.width - winBounds.width - 8));

  win.setBounds({ x, y, width: winBounds.width, height: winBounds.height });
}

function getAutoLaunchEnabled() {
  return app.getLoginItemSettings({ path: process.execPath, args: ['--hidden'] }).openAtLogin;
}

function setAutoLaunch(enabled) {
  app.setLoginItemSettings({
    openAtLogin: enabled,
    path: process.execPath,
    args: ['--hidden']
  });
}

function buildTrayMenu() {
  return Menu.buildFromTemplate([
    { label: 'Show Counter', click: () => showWindow() },
    { type: 'separator' },
    {
      label: 'Open at login',
      type: 'checkbox',
      checked: getAutoLaunchEnabled(),
      click: (item) => {
        setAutoLaunch(item.checked);
        tray.setContextMenu(buildTrayMenu());
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        isQuitting = true;
        app.quit();
      }
    }
  ]);
}

function createTray() {
  const icon = nativeImage.createFromPath(ICON_PATH);
  tray = new Tray(icon);
  tray.setToolTip('Counter');
  tray.setContextMenu(buildTrayMenu());
  tray.on('click', () => toggleWindow());
  tray.on('double-click', () => showWindow());
}

app.whenReady().then(() => {
  if (process.platform === 'win32') {
    app.setAppUserModelId('com.noahs.primeng-counter');
  }
  createWindow();
  createTray();
});

app.on('window-all-closed', (e) => {
  e.preventDefault();
});

app.on('before-quit', () => {
  isQuitting = true;
});

ipcMain.on('app:hide', () => {
  if (win) win.hide();
});


