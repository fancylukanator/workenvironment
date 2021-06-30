const electron = require('electron');
const ipc = electron.ipcRenderer;

// Checks for when the launch button is clicked
document.getElementById('launch').addEventListener('click',function(){
    ipc.send('launch')
})

// Updates list of links
document.getElementById('link').addEventListener('change', (event) => {
    var input = document.getElementById("link").value; 
    var child = "<li>" + input + "</li>";
    document.getElementById("linkList").innerHTML += '<ul>'+child+'<ul>';
    document.getElementById("link").value = ""; // clear the value
  });

// Updates list of files
document.getElementById('addfile').addEventListener('change', (event) => {
    var input = document.getElementById('addfile');
    var output = document.getElementById('fileList');
    var children = "";
    for (var i = 0; i < input.files.length; ++i) {
        children += '<li>' + input.files.item(i).name + '</li>';
    }
    output.innerHTML += '<ul>'+children+'</ul>';
  });

// Updates list of applications
document.getElementById('addapp').addEventListener('change', (event) => {
    var input = document.getElementById('addapp');
    var output = document.getElementById('appList');
    var children = "";
    for (var i = 0; i < input.files.length; ++i) {
        children += '<li>' + input.files.item(i).name + '</li>';
    }
    output.innerHTML += '<ul>'+children+'</ul>';
  });