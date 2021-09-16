const path = require('path');
const { BrowserWindow, ipcMain} = require('electron');

class TrayWindow {
  constructor() {

    // Creation of the mew window.
    this.window = new BrowserWindow({
      show: false, // Initially, we should hide it, in such way we will remove blink-effect. 
      roundedCorners: true,
      height: 88, // 26 per workspace
      width: 275,
      frame: false,
      resizable: false,
      vibrancy: "menu",
      visualEffectState: "active",
      transparent: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      }
    });

    // Make it so you can open the tray on any macOS space
    this.window.setVisibleOnAllWorkspaces(true);

    // Link to the HTML file that will render app window.
    this.window.loadFile('./tray/tray_page.html')

    // Open the DevTools.
    // this.window.webContents.openDevTools()

    // Object BrowserWindow has a lot of standart events/
    // We will hide tray window on blur. To emulate standart behavior of the tray-like apps.
    this.window.on('blur', () => {
      this.window.hide();

      // Added to make the menubar icon compatible with multiple desktops
      this.window.setVisibleOnAllWorkspaces(true);
    });
  }
}

module.exports = TrayWindow;