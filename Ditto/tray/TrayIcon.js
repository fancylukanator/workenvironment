const path = require('path');
const { BrowserWindow, Tray } = require('electron');
// Electron-positioner - npm package for positioning of the Tray window. Our tray window should appear under the Tray icon.

const Positioner = require('electron-positioner');

class TrayIcon {
  constructor(trayWindow) {
    // Path to the app icon that will be displayed in the Tray (icon size: 22px)
    let iconPath = path.join(__dirname, './../pictures/icon@2x.png')

    this.trayIcon = new Tray(iconPath);
    this.trayIcon.setToolTip('Ditto'); // This tooltip will shows up, when user will hover our tray-icon.

    // By clicking on the icon we have to show Tray Window and position it in the middle under the tray icon. ( Initialy this window is hidden )

    this.trayIcon.on('click', (e, bounds) => {
      if ( trayWindow.isVisible() ) {
        trayWindow.hide();
      } else {
        let positioner = new Positioner(trayWindow);
        positioner.move('trayCenter', bounds)

        trayWindow.show();
      }
    });
  }
}

module.exports = TrayIcon;