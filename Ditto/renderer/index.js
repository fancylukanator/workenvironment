const electron = require('electron');
const { app, BrowserWindow, shell, ipcMain} = require('electron');
const ipc = electron.ipcRenderer;
const execShPromise = require("exec-sh").promise;

// reset workspace selector keys
localStorage.setItem('selectedWorkspace', '');
localStorage.setItem('openedWorkspace', '');