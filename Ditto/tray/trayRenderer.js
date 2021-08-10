// this file controls button clicks etc on the toolbar window
const electron = require('electron');
const { app, BrowserWindow, shell, ipcMain} = require('electron');
const ipcRenderer = electron.ipcRenderer;
const execShPromise = require("exec-sh").promise;

// create the list of workSpaces
updateToolbarList();

// display proper buttons
displayButtons();

//Open Button
document.getElementById('open').addEventListener('click', (event) => {
    //retrieve workspaceName
    workspaceName = sessionStorage.getItem('selectedWorkspace');
    sessionStorage.setItem('openedWorkspace', workspaceName);
    displayButtons();

    //open workspace
    //openWorkspace(workspaceName);

    //update tray title 
    ipcRenderer.send('update-title-tray-window-event', workspaceName);
})

//Create Button
document.getElementById('create').addEventListener('click', (event) => {
    // not sure how to do this
    // need to close dropdown and open main app as if 'create project' button was just clicked
})

//Close Button
document.getElementById('close').addEventListener('click', (event) => {
    //retrieve workspaceName
    workspaceName = sessionStorage.getItem('selectedWorkspace');

    sessionStorage.removeItem('openedWorkspace');
    sessionStorage.removeItem('selectedWorkspace');
    displayButtons();

    //close workspace
    closeWorkspace(workspaceName);

    //update tray title
    ipcRenderer.send('update-title-tray-window-event', '');
})


//Save Button
document.getElementById('save').addEventListener('click', (event) => {
    //retrieve workspaceName
    workspaceName = sessionStorage.getItem('selectedWorkspace');

    //save workspace
    toolbarsaveWorkspace(workspaceName);
})


//Switch Button
document.getElementById('switch').addEventListener('click', (event) => {
    //retrieve workspaceName
    newworkspaceName = sessionStorage.getItem('selectedWorkspace');
    currentworkspaceName = sessionStorage.getItem('openedWorkspace');

    //switch workspace
    //toolbarsaveWorkspace(currrentworkspaceName);
    closeWorkspace(currentworkspaceName);
    openWorkspace(newworkspaceName);
})