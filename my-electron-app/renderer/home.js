const electron = require('electron');
const ipc = electron.ipcRenderer;

// Checks for when the new project button is clicked
document.getElementById('create_new_proj').addEventListener('click',function(){
    ipc.send('create_new_proj')
})

// Checks for when the launch button is clicked
document.getElementById('launch').addEventListener('click',function(){
    ipc.send('launch')
})