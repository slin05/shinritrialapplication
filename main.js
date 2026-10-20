// Shinri Trial Notes — always-on-top overlay window
const { app, BrowserWindow, globalShortcut, ipcMain, screen } = require("electron");
const path = require("path");
const fs = require("fs");

const SETTINGS_FILE = path.join(app.getPath("userData"), "window.json");
const DEFAULTS = { width: 480, height: 820, opacity: 0.95, pinned: true };

function loadSettings() {
  try { return Object.assign({}, DEFAULTS, JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"))); }
  catch { return Object.assign({}, DEFAULTS); }
}
let settings = loadSettings();
let saveTimer = null;
function saveSettings() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings)); } catch {}
  }, 300);
}

let win = null;

function onScreen(b) {
  // Make sure a saved position is still visible (monitor unplugged, resolution changed, etc.)
  if (b.x === undefined || b.y === undefined) return false;
  return screen.getAllDisplays().some(d => {
    const a = d.workArea;
    return b.x < a.x + a.width - 50 && b.x + b.width > a.x + 50 && b.y >= a.y - 10 && b.y < a.y + a.height - 50;
  });
}

function createWindow() {
  const opts = {
    width: settings.width,
    height: settings.height,
    minWidth: 340,
    minHeight: 300,
    frame: false,
    backgroundColor: "#0e0b10",
    title: "Shinri Trial Notes",
    alwaysOnTop: settings.pinned,
    skipTaskbar: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false
    }
  };
  if (onScreen(settings)) { opts.x = settings.x; opts.y = settings.y; }

  win = new BrowserWindow(opts);
  // "screen-saver" level keeps it above borderless-windowed games
  if (settings.pinned) win.setAlwaysOnTop(true, "screen-saver");
  win.setOpacity(settings.opacity);
  win.loadFile(path.join(__dirname, "app", "index.html"));

  const remember = () => {
    if (!win || win.isMinimized()) return;
    Object.assign(settings, win.getBounds());
    saveSettings();
  };
  win.on("resize", remember);
  win.on("move", remember);
  win.on("closed", () => { win = null; });

  // Links (if any) open in the real browser, never inside the overlay
  win.webContents.setWindowOpenHandler(({ url }) => {
    require("electron").shell.openExternal(url);
    return { action: "deny" };
  });
}

function toggleVisible() {
  if (!win) return;
  if (win.isVisible() && !win.isMinimized()) win.hide();
  else { win.show(); win.focus(); }
}
function nudgeOpacity(delta) {
  settings.opacity = Math.min(1, Math.max(0.3, Math.round((settings.opacity + delta) * 100) / 100));
  if (win) { win.setOpacity(settings.opacity); win.webContents.send("state", stateFor()); }
  saveSettings();
}
function stateFor() { return { opacity: settings.opacity, pinned: settings.pinned }; }

ipcMain.handle("get-state", () => stateFor());
ipcMain.on("set-opacity", (_e, v) => {
  settings.opacity = Math.min(1, Math.max(0.3, Number(v) || 1));
  if (win) win.setOpacity(settings.opacity);
  saveSettings();
});
ipcMain.on("set-pinned", (_e, v) => {
  settings.pinned = !!v;
  if (win) win.setAlwaysOnTop(settings.pinned, "screen-saver");
  saveSettings();
});
// ---------- Mic buttons: press Win+H to start Windows voice typing ----------
// A hidden PowerShell process is kept warm so each click responds instantly.
const { spawn } = require("child_process");
const KEYS_TYPE =
  "Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; " +
  "public static class ShinriKeys { " +
  "[DllImport(\"user32.dll\")] static extern void keybd_event(byte vk, byte scan, uint flags, UIntPtr extra); " +
  "public static void WinH() { " +
  "keybd_event(0x5B, 0, 0, UIntPtr.Zero); keybd_event(0x48, 0, 0, UIntPtr.Zero); " +
  "keybd_event(0x48, 0, 2, UIntPtr.Zero); keybd_event(0x5B, 0, 2, UIntPtr.Zero); } }'";
let ps = null;
function startKeyHelper() {
  if (process.platform !== "win32") return null;
  try {
    const p = spawn("powershell.exe", ["-NoProfile", "-NoLogo", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-Command", "-"],
      { windowsHide: true, stdio: ["pipe", "ignore", "ignore"] });
    p.on("exit", () => { if (ps === p) ps = null; });
    p.on("error", () => { if (ps === p) ps = null; });
    p.stdin.write(KEYS_TYPE + "\r\n");
    return p;
  } catch { return null; }
}
function pressWinH() {
  if (!ps || ps.killed || !ps.stdin.writable) ps = startKeyHelper();
  if (!ps) return;
  try { ps.stdin.write("[ShinriKeys]::WinH()\r\n"); } catch { ps = null; }
}
ipcMain.on("dictate", () => {
  if (win) win.focus();
  pressWinH();
});
app.on("will-quit", () => { try { ps && ps.kill(); } catch {} });

ipcMain.on("minimize", () => win && win.minimize());
ipcMain.on("close", () => win && win.close());

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on("second-instance", () => { if (win) { win.show(); win.focus(); } });

  app.whenReady().then(() => {
    createWindow();
    ps = startKeyHelper(); // warm up the mic helper
    // Hotkeys work even while GMod has focus
    globalShortcut.register("CommandOrControl+Shift+N", toggleVisible);
    globalShortcut.register("CommandOrControl+Shift+Up", () => nudgeOpacity(0.1));
    globalShortcut.register("CommandOrControl+Shift+Down", () => nudgeOpacity(-0.1));
  });

  app.on("will-quit", () => globalShortcut.unregisterAll());
  app.on("window-all-closed", () => app.quit());
}
