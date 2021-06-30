const ipc = require('electron').ipcRenderer,

// Checks for when the launch button is clicked
var button = document.getElementById('launch')
button.addEventListener('click',function(){
    console.log("OK...")
    ipc.send('test')
})
