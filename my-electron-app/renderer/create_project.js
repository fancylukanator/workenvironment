const electron = require('electron');
const ipc = electron.ipcRenderer;

// Adds new link to the table...
document.getElementById('url').addEventListener('change', (event) => {
    var table = document.getElementById("urlList");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "URL";
    cell2.innerHTML = document.getElementById('url').value;
    document.getElementById("url").value = ""; // clear the value
  });

// Adds new files to the table...
document.getElementById('addfile').addEventListener('change', (event) => {
    var table = document.getElementById("fileList");
    var input = document.getElementById('addfile');
    for (var i = 0; i < input.files.length; ++i) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "FILE";
        cell2.innerHTML = input.files.item(i).name;
    }
  });

// Adds new apps to the table...
document.getElementById('addapp').addEventListener('change', (event) => {
    var table = document.getElementById("appList");
    var input = document.getElementById('addapp');
    for (var i = 0; i < input.files.length; ++i) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "APP";
        cell2.innerHTML = input.files.item(i).name;
    }
  });

document.getElementById('new_proj').addEventListener('submit', function() {
    ipc.send('created_proj')
  });