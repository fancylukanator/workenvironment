// this file controls button clicks etc on the toolbar window
const electron = require('electron');
const { app, BrowserWindow, shell, ipcMain, remote} = require('electron');
const ipc = electron.ipcRenderer;
const execShPromise = require("exec-sh").promise;
let isProjectOpen;

// reset workspace selector keys
localStorage.setItem('selectedWorkspace', '');
localStorage.setItem('openedWorkspace', '');

// create the list of workSpaces
updateToolbarList();

// display proper buttons
displayButtons();



// Opening & switching projects
function openTray(){

    //Retrieve selected & opened workspaces
    workspaceName = localStorage.getItem('selectedWorkspace');
    currentWorkspace = localStorage.getItem('openedWorkspace');

    // Switching projects
    if(currentWorkspace != null && currentWorkspace != "" && currentWorkspace != workspaceName){
        
        newworkspaceName = localStorage.getItem('selectedWorkspace');

        //toolbarsaveWorkspace(currrentworkspaceName);
    
        switchWorkspace(currentWorkspace, workspaceName);

    } else if(workspaceName != null && workspaceName != "" && workspaceName != currentWorkspace){
        //open workspace
        openWorkspace(workspaceName);
    }

    displayButtons();
    updateToolbarList();

    //hide tray
    remote.getCurrentWindow().hide();

    //update main
    mainButtons();
    updateProjectList();
}



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



//Open main app
document.getElementById('openApp').addEventListener('click', (event) => {

    remote.getCurrentWindow().hide();

    // Open main app
    ipc.send('open-main-app', '');
    
})



//Update all data, icon has been clicked
ipc.on('ping', () => {

    // Sets the selected workspace to be the open workspace (either something or nothing)
    localStorage.setItem('selectedWorkspace', localStorage.getItem('openedWorkspace'));

    updateToolbarList();
    displayButtons();
    updateProjectList();

    // update size of menubar window
    if(localStorage.getItem('openedWorkspace') != "" && localStorage.getItem('openedWorkspace') != null){
        isProjectOpen = true;
    } else{
        isProjectOpen = false;
    }

    ipc.send('menubar-height', [Object.keys(localStorage).length -2, isProjectOpen])

    // now send message to main
    ipc.send('minimize-main', '');
})