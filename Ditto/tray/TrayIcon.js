const path = require('path');
const { BrowserWindow, Tray, ipcMain } = require('electron');
const { webContents } = require('electron')

// Electron-positioner - npm package for positioning of the Tray window. Our tray window should appear under the Tray icon.

const Positioner = require('electron-positioner');

class TrayIcon {
  constructor(trayWindow) {
    // Path to the app icon that will be displayed in the Tray (icon size: 18px)
    let iconPath = path.join(__dirname, './../pictures/menubarlogo@2x.png')

    this.trayIcon = new Tray(iconPath);
    //this.trayIcon.setToolTip('ditto'); // This tooltip will shows up, when user will hover our tray-icon.

    // By clicking on the icon we have to show Tray Window and position it in the middle under the tray icon. ( Initialy this window is hidden )

    this.trayIcon.on('click', (e, bounds) => {
      if ( trayWindow.isVisible() ) {
        trayWindow.hide();
        // Added to make the menubar icon compatible with multiple desktops
        trayWindow.setVisibleOnAllWorkspaces(true);
        
      } else {
        let positioner = new Positioner(trayWindow);
        positioner.move('trayCenter', bounds)

        // send notice to page to run functions to display most up to date data
        trayWindow.webContents.send('ping', 'opened')

        trayWindow.show();
        trayWindow.focus();

        // Causes the menubar window to only be visible on the desktop it is opened on (mimic native menubar windows)
        trayWindow.setVisibleOnAllWorkspaces(false);

      }
    });



    // Dynamic menubar height
    ipcMain.on('menubar-height', function(event,args) {
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

      trayWindow.setSize(275,height);
    });
  }


  
  updateTitle(title) {
    this.trayIcon.setTitle(title)
  }
}

module.exports = TrayIcon;