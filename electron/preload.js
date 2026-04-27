const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('app', {
  hide: () => ipcRenderer.send('app:hide')
});
