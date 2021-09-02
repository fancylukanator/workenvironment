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
      frame: false,  // This option will remove frame buttons. By default window has standart chrome header buttons (close, hide, minimize). We should change this option because we want to display our window like tray window not like common chrome-like window.
      resizable: false,
      vibrancy: "menu",
      visualEffectState: "active",
      transparent: true,
      //transparent: true,
      //backgroundColor: '#e9e9e9'
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      }
    });

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