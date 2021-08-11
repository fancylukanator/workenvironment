const electron = require('electron');
const { app, BrowserWindow, shell, ipcMain} = require('electron');
const ipc = electron.ipcRenderer;
const execShPromise = require("exec-sh").promise;

