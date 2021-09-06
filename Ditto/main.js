// main.js

// Modules to control application life and create native browser window
const electron = require('electron');
const path = require('path');
const { app, BrowserWindow, shell, ipcMain, Menu, Tray, nativeImage} = require('electron');
const ipc = ipcMain;
const { webContents } = require('electron')
const { autoUpdater } = require('electron-updater');

// Analytics
const { trackEvent } = require('./analytics');
global.trackEvent = trackEvent;


let mainWindowID;

// Auto open app at login
app.setLoginItemSettings({openAtLogin: true});

// Create the browser window.
function createWindow () {
  var mainWindow = new BrowserWindow({
    width: 775,
    height: 500,
    show: false,
    resizable: false,
    titleBarStyle: 'hiddenInset',
    frame: false,
    vibrancy: "menu",
    visualEffectState: "active",
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })

  // Store the ID of the main window
  mainWindowID = mainWindow.id;

  // and load the index.html of the app.
  mainWindow.loadFile('./renderer/index.html')

  // Only display the main window once the HTML is loaded in
  mainWindow.webContents.on('did-finish-load', function() {
    BrowserWindow.fromId(mainWindowID).webContents.send('display-workspace', '');
    mainWindow.show();
  });

  // Check for Update
  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
  

  // Open the DevTools.
  //  mainWindow.webContents.openDevTools()

}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
const TrayWindow  = require('./tray/TrayWindow');
const TrayIcon = require('./tray/TrayIcon');

let tray = null;
let trayIcon = null;

app.whenReady().then(() => {

  //check for updates
  autoUpdater.checkForUpdatesAndNotify();
  //BrowserWindow.fromId(mainWindowID).send('update_available');

  //testing google analytics setup
  trackEvent('User Interaction', 'Ditto App Opened');

  tray = new TrayWindow();
  trayIcon = new TrayIcon(tray.window);


    createWindow()
    app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length == 1) createWindow();

    BrowserWindow.fromId(mainWindowID).show()
    

  })

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit() 
})




// LISTENERS

// Waiting to hear if the window should be closed out...
ipc.on('minimize', function(event) {
  try{
    BrowserWindow.fromId(mainWindowID).hide(); // Can also do .close() to fully close down
  } catch(e){
  }
});

// Waiting to hear if the window should be closed out...
ipc.on('hide', function(event) {
  try{
    BrowserWindow.fromId(mainWindowID).hide();
  } catch(e){
  }
});

// Dynamic tray title
ipcMain.on('update-title-tray-window-event', function(event, title) {
  trayIcon.updateTitle(title);
});

// Open main app if closed on tray create
ipcMain.on('menubar-create', function(event) {

  // If the main window was closed
  if (BrowserWindow.getAllWindows().length == 1){
    createWindow(); // Create new window
    // Waits to then create new project once HTML is loaded
    BrowserWindow.fromId(mainWindowID).webContents.on('did-finish-load', function () {
      BrowserWindow.fromId(mainWindowID).webContents.send('create-workspace', 'create');
    })
    // If main window is still kicking around
  } else {
    // Restores the window if it was minimized
    if(BrowserWindow.fromId(mainWindowID).isMinimized()){
      BrowserWindow.fromId(mainWindowID).restore();
    }
    BrowserWindow.fromId(mainWindowID).focus()
    BrowserWindow.fromId(mainWindowID).webContents.send('create-workspace', 'create');
  }
});

// Close main window when the dropdown menu is opened
ipcMain.on('minimize-main', () => {
  if (BrowserWindow.getAllWindows().length == 1) return;
  BrowserWindow.fromId(mainWindowID).close();
});

// Open main app if closed on tray create
ipcMain.on('open-main-app', function(event) {

  // If the main window was closed
  if (BrowserWindow.getAllWindows().length == 1){
    createWindow(); // Create new window
    // Waits to then create new project once HTML is loaded

    // If main window is still kicking around
  } else {
    // Restores the window if it was minimized
    if(BrowserWindow.fromId(mainWindowID).isMinimized()){
      BrowserWindow.fromId(mainWindowID).restore();
    }
    BrowserWindow.fromId(mainWindowID).focus()
    BrowserWindow.fromId(mainWindowID).webContents.send('display-workspace', '');
  }
});

// Handle Updates
autoUpdater.on('update-available', () => {
  BrowserWindow.fromId(mainWindowID).send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  BrowserWindow.fromId(mainWindowID).send('update_downloaded');
});
/*autoUpdater.on('checking-for-update', () => {
  BrowserWindow.fromId(mainWindowID).send('checking_for_update');
});
autoUpdater.on('update-not-available', () => {
  BrowserWindow.fromId(mainWindowID).send('update_not_available');
});*/
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});