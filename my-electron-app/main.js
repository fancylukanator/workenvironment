// main.js

// Modules to control application life and create native browser window
const electron = require('electron');
const path = require('path');
const { app, BrowserWindow, shell, ipcMain} = require('electron');
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
  mainWindow.loadFile('home.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  
    createWindow()

    app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})





// LISTENERS

// Waiting to hear if the launch button is clicked
ipc.on('launch', function(event) {
  openProject("test");
});

// Waiting to see if users wants to create new project
ipc.on('create_new_proj', (event) =>{
  BrowserWindow.getFocusedWindow().loadFile('create_project.html')
});



// FUNCTIONS

// Function to launch project with a specific name
function openProject(project_name){

    // Initialize arrays to hold the components of the project
    var urls = [];
    var files = [];
    var applications = [];

    // Will use the project_name to find which project to access (Access database? File?)
    if (project_name == "test"){
        urls = ["https://www.electronjs.org/docs/api/shell#shellopenpathpath", "https://mail.google.com/mail/u/0/#inbox", "https://www.google.ca"];
        files = ["/Users/owenkent/Desktop/QICSI/Code-of-Conduct-QICSI-2021-copy.pdf","/Users/owenkent/Desktop/QICSI/QICSI-waiver.docx"];
        applications = ["/Applications/zoom.us.app", "/Applications/Microsoft Outlook.app"];
    }

    // Minimize window upon opening a project
    BrowserWindow.getFocusedWindow().minimize()

    // Open all of the urls that are required
    for(let i = 0; i < urls.length; i++){
        shell.openExternal(urls[i]);
    }

    // Open all of the files that are required
    for(let i = 0; i < files.length; i++){
        shell.openPath(files[i]);
    }

    // Open all of the applications that are required
    for(let i = 0; i < applications.length; i++){
        shell.openPath(applications[i]);
    }
}
