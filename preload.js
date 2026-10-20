const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("overlay", {
  getState: () => ipcRenderer.invoke("get-state"),
  setOpacity: v => ipcRenderer.send("set-opacity", v),
  setPinned: v => ipcRenderer.send("set-pinned", v),
  minimize: () => ipcRenderer.send("minimize"),
  close: () => ipcRenderer.send("close"),
  dictate: () => ipcRenderer.send("dictate"),
  onState: fn => ipcRenderer.on("state", (_e, s) => fn(s))
});
