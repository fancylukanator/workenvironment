const path = require('path');
const {webContents, BrowserWindow, Tray, ipcMain } = require('electron');
const Positioner = require('electron-positioner');

class TrayIcon {
  constructor(trayWindow) {

    // Path to the app icon that will be displayed in the Tray (icon size: 18px)
    let iconPath = path.join(__dirname, './../pictures/menubarlogo@2x.png')

    // Create new tray icon
    this.trayIcon = new Tray(iconPath);

    // By clicking on the icon we have to show Tray Window and position it in the middle under the tray icon.
    this.trayIcon.on('click', (e, bounds) => {

      // If tray is already open...
      if ( trayWindow.isVisible() ) {
        trayWindow.hide();
        trayWindow.setVisibleOnAllWorkspaces(true); // Added to make the menubar icon compatible with multiple desktops

      // If tray is not open...
      } else {
        let positioner = new Positioner(trayWindow);
        positioner.move('trayCenter', bounds)

        // Send notice to page to run functions to display most up to date data
        trayWindow.webContents.send('ping', 'opened')

        // Display tray window
        trayWindow.show();
        trayWindow.focus();

        // Causes the menubar window to only be visible on the desktop it is opened on (mimic native menubar windows)
        trayWindow.setVisibleOnAllWorkspaces(false);
      }
    });



    // Dynamic menubar height
    ipcMain.on('menubar-height', function(event,args) {

      // Used to store the height
      let height;

      // If a project is open and more than 1 workspace has been created
      if(args[1] && args[0] != 1){
        height = 88 + 26*args[0] + 45;
      }
      
      // If a project is open and only 1 workspace has been created
      else if(args[1] && args[0] == 1) {
        height = 80 + 26*args[0] + 45;
      }
      
      // No project open and no projects created
      else if(args[0] == 0){
        height = 79;
      }

      // No project open and projects are created
      else {
        height = 88 + 26*args[0];
      }

      // Set the window size
      trayWindow.setSize(275,height);
    });
  }


  // Updates the title of the tray
  updateTitle(title) {
    this.trayIcon.setTitle(title)
  }
}

module.exports = TrayIcon;