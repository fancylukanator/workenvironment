const electron = require('electron');
const ipc = electron.ipcRenderer;

// Checks for when the new project button is clicked
document.getElementById('create_new_proj').addEventListener('click',function(){
    document.getElementById("content").innerHTML='<object type="text/html" data="create_project.html" ></object>';
    ipc.send('create_new_proj')
})

// Checks for when the launch button is clicked
document.getElementById('launch').addEventListener('click',function(){
    ipc.send('launch')
});

// Tells main that a project has just been created...
document.getElementById('new_proj').addEventListener('submit', function() {
    document.getElementById("content").style.display = "none";
  });