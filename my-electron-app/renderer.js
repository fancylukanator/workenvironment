const electron = require('electron');
const ipc = electron.ipcRenderer;

// Checks for when the launch button is clicked
var button = document.getElementById('launch')
button.addEventListener('click',function(){
    ipc.send('launch')
})