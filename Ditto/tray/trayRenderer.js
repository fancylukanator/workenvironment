// this file controls button clicks etc on the toolbar window
const electron = require('electron');
const { app, BrowserWindow, shell, ipcMain, remote} = require('electron');
const ipc = electron.ipcRenderer;
const execShPromise = require("exec-sh").promise;

// reset workspace selector keys
localStorage.setItem('selectedWorkspace', '');
localStorage.setItem('openedWorkspace', '');

// create the list of workSpaces
updateToolbarList();

// display proper buttons
displayButtons();

//Open Button
document.getElementById('open').addEventListener('click', (event) => {
    //retrieve workspaceName
    workspaceName = localStorage.getItem('selectedWorkspace');

    //open workspace
    openWorkspace(workspaceName);

    //hide tray
    remote.getCurrentWindow().hide();

    //update buttons
    displayButtons();

})

//Create Button
document.getElementById('create').addEventListener('click', (event) => {
    // not sure how to do this
    // need to close dropdown and open main app as if 'create project' button was just clicked
})

//Close Button
document.getElementById('close').addEventListener('click', (event) => {
    //retrieve workspaceName
    workspaceName = localStorage.getItem('selectedWorkspace');

    //close workspace
    closeWorkspace(workspaceName);

    //hide tray
    remote.getCurrentWindow().hide();

    //update buttons
    displayButtons();
})


//Save Button
document.getElementById('save').addEventListener('click', (event) => {
    //retrieve workspaceName
    workspaceName = localStorage.getItem('selectedWorkspace');

    //save workspace
    toolbarsaveWorkspace(workspaceName);
})


//Switch Button
document.getElementById('switch').addEventListener('click', (event) => {
    //retrieve workspaceName
    newworkspaceName = localStorage.getItem('selectedWorkspace');
    currentworkspaceName = localStorage.getItem('openedWorkspace');

    //switch workspace
    //toolbarsaveWorkspace(currrentworkspaceName);

    switchWorkspace(currentworkspaceName, newworkspaceName);

    //hide tray
    remote.getCurrentWindow().hide();

});

//Update all data, icon has been clicked
ipc.on('ping', () => {
    updateToolbarList();
    displayButtons();
})
