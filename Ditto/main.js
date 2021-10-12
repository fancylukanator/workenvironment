// main.js

// Modules to control application life and create native browser window
const path = require('path');
const {app, BrowserWindow, shell, ipcMain, Menu, Tray, nativeImage, dialog, webContents} = require('electron');

// Analytics
const { trackEvent } = require('./analytics');
global.trackEvent = trackEvent;

// Tray Window
const TrayWindow  = require('./tray/TrayWindow');
const TrayIcon = require('./tray/TrayIcon');
let tray = null;
let trayIcon = null;

// Keep track of the app's main window ID
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
    show: false,
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
    BrowserWindow.fromId(mainWindowID).webContents.send('display-workspace','');
    mainWindow.show();
  });
  
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}


// Will run when the app is ready to go...
app.whenReady().then(() => {

  // Send app opening event to Google Analytics
  trackEvent('User Interaction', 'Ditto App Opened');

  // Initialize the tray
  tray = new TrayWindow();
  trayIcon = new TrayIcon(tray.window);

  // Create a new window on startup
  createWindow()

  // If the user clicks on the app in the menu
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length == 1){
      createWindow();
    }

    // Display the main window
    BrowserWindow.fromId(mainWindowID).show()
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit() 
})



// LISTENERS

// Waiting to hear if the window should be hidden...
ipcMain.on('hide', function(event) {
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
    // Restores the window if it was hidden
    else if(!BrowserWindow.fromId(mainWindowID).isVisible()){
      BrowserWindow.fromId(mainWindowID).show();
    }
    // Creates a new workspace
    BrowserWindow.fromId(mainWindowID).focus()
    BrowserWindow.fromId(mainWindowID).webContents.send('create-workspace', 'create');
  }
});


// Open main app if closed on tray recapture
ipcMain.on('menubar-save', function(event) {

  // If the main window was closed
  if (BrowserWindow.getAllWindows().length == 1){
    createWindow(); // Create new window
    // Waits to then resave workspace once HTML is loaded
    BrowserWindow.fromId(mainWindowID).webContents.on('did-finish-load', function () {
      BrowserWindow.fromId(mainWindowID).webContents.send('save-workspace', 'save');
    })
    // If main window is still kicking around
  } else {
    // Restores the window if it was minimized
    if(BrowserWindow.fromId(mainWindowID).isMinimized()){
      BrowserWindow.fromId(mainWindowID).restore();
    }
    // Restores the window if it was hidden
    else if(!BrowserWindow.fromId(mainWindowID).isVisible()){
      BrowserWindow.fromId(mainWindowID).show();
    }
    // Send work to recapture workspace
    BrowserWindow.fromId(mainWindowID).focus()
    BrowserWindow.fromId(mainWindowID).webContents.send('save-workspace', 'save');
  }
});


// Open main app from tray
ipcMain.on('open-main-app', function(event) {

  // If the main window was closed
  if (BrowserWindow.getAllWindows().length == 1){
    createWindow(); // Create new window

  // If main window was minimized
  } else if (BrowserWindow.fromId(mainWindowID).isMinimized()){
      BrowserWindow.fromId(mainWindowID).restore();
  
  // If main window was hidden
  } else if(!BrowserWindow.fromId(mainWindowID).isVisible()){
    BrowserWindow.fromId(mainWindowID).show();
  }
  
  // Display the proper workspace if one is open
  BrowserWindow.fromId(mainWindowID).focus()
  BrowserWindow.fromId(mainWindowID).webContents.send('display-workspace', '');

});


