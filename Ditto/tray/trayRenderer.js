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

    if(workspaceName != null && workspaceName != ""){
        //open workspace
        openWorkspace(workspaceName);

        //hide tray
        remote.getCurrentWindow().hide();

        //update buttons
        displayButtons();
    }
    //update main
    mainButtons();
    updateProjectList();
})

//Create Button
document.getElementById('create').addEventListener('click', (event) => {

    //send message to main to create workspace
    ipc.send('menubar-create', '');

    //hide tray
    remote.getCurrentWindow().hide();
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

    //update main
    mainButtons();
    updateProjectList();
})


//Save Button
document.getElementById('save').addEventListener('click', (event) => {
    //retrieve workspaceName
    workspaceName = localStorage.getItem('selectedWorkspace');

    //save workspace
    toolbarsaveWorkspace(workspaceName);

    //update main
    mainButtons();
    updateProjectList();
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

    //update main
    mainButtons();
    updateProjectList();

});

//Update all data, icon has been clicked
ipc.on('ping', () => {

    // Sets the selected workspace to be the open workspace (either something or nothing)
    localStorage.setItem('selectedWorkspace', localStorage.getItem('openedWorkspace'));
    
    updateToolbarList();
    displayButtons();
    updateProjectList();

    openProject = document.getElementById("project-" + localStorage.getItem('openedWorkspace'));
    if(openProject != null){
        openProject.focus();
    }
    // now send message to main
    ipc.send('minimize-main', '');
})



// LISTENERS TO ENSURE THAT THE SELECTED PROJECT REMAINS FOCUSED ON

document.getElementById('menubar_background').addEventListener('click', (event) => {

    openProject = document.getElementById("project-" + localStorage.getItem('selectedWorkspace'));
    if(openProject != null){
        openProject.focus();
    }
});

document.getElementById('openControls').addEventListener('click', (event) => {

    openProject = document.getElementById("project-" + localStorage.getItem('selectedWorkspace'));
    if(openProject != null){
        openProject.focus();
    }
});

document.getElementById('closeControls').addEventListener('click', (event) => {

    openProject = document.getElementById("project-" + localStorage.getItem('selectedWorkspace'));
    if(openProject != null){
        openProject.focus();
    }
});

document.getElementById('switchControls').addEventListener('click', (event) => {

    openProject = document.getElementById("project-" + localStorage.getItem('selectedWorkspace'));
    if(openProject != null){
        openProject.focus();
    }
});