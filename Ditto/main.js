// main.js

// Modules to control application life and create native browser window
const electron = require('electron');
const path = require('path');
const { app, BrowserWindow, shell, ipcMain, Menu, Tray, nativeImage} = require('electron');
const ipc = ipcMain;
const { webContents } = require('electron')


// Create the browser window.
function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./renderer/index.html')
  console.log("Open home...")

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
const TrayWindow  = require('./tray/TrayWindow');
const TrayIcon = require('./tray/TrayIcon');

let tray = null;
let trayIcon = null;

app.whenReady().then(() => {

  tray = new TrayWindow();
  trayIcon = new TrayIcon(tray.window);


    createWindow()

    app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length == 1) createWindow()
  })

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})




// LISTENERS

// Waiting to hear if the window should be minimized...
ipc.on('minimize', function(event) {
  BrowserWindow.getFocusedWindow().minimize();
});

// Dynamic tray title
ipcMain.on('update-title-tray-window-event', function(event, title) {
  trayIcon.updateTitle(title);
});