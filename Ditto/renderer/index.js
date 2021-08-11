const electron = require('electron');
const { app, BrowserWindow, shell, ipcMain} = require('electron');
const ipc = electron.ipcRenderer;
const execShPromise = require("exec-sh").promise;


// reset workspace selector keys
ipc.on('quit', () => {
    console.log('hey from main')
    //localStorage.setItem('selectedWorkspace', '');
    //localStorage.setItem('openedWorkspace', '');
})