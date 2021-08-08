const path = require('path');
const { BrowserWindow } = require('electron');

class TrayWindow {
  constructor() {

    // Creation of the mew window.
    this.window = new BrowserWindow({
      show: false, // Initially, we should hide it, in such way we will remove blink-effect. 
      height: 210,
      width: 225,
      frame: false,  // This option will remove frame buttons. By default window has standart chrome header buttons (close, hide, minimize). We should change this option because we want to display our window like tray window not like common chrome-like window.
      backgroundColor: '#E4ECEF',
      resizable: false
    });

    // Link to the HTML file that will render app window.
    this.window.loadFile('./tray/tray_page.html')

    // Object BrowserWindow has a lot of standart events/
    // We will hide tray window on blur. To emulate standart behavior of the tray-like apps.
    this.window.on('blur', () => {
      this.window.hide();
    });
  }
}

module.exports = TrayWindow;