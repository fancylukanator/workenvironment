// main.js

// Modules to control application life and create native browser window
const electron = require('electron');
const path = require('path');
const { app, BrowserWindow, shell, ipcMain, Menu, Tray, nativeImage} = require('electron');
const ipc = ipcMain;


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

/*app.on('ready', () => {
  tray = new Tray(path.join(__dirname,'Icon.png'));

  if (process.platform === 'win32') {
    tray.on('click', tray.popUpContextMenu);
  }

  const menu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click() { app.quit(); }
    }
  ]);

  tray.setToolTip('Ditto');
  tray.setContextMenu(menu);
});*/



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let tray

app.whenReady().then(() => {

  const icon = nativeImage.createFromPath('icon@2x.png')
  tray = new Tray(icon)

  
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2 but looooonger', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  
  tray.setContextMenu(contextMenu)

  tray.setToolTip('Ditto')

    createWindow()

    app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
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

