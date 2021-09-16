// this file controls button clicks etc on the toolbar window
const electron = require('electron');
const { app, BrowserWindow, remote, ipcRenderer} = require('electron');
const ipc = electron.ipcRenderer;
const execShPromise = require("exec-sh").promise;

// Used to track if a workspace is open or not
let isProjectOpen;

// Reset workspace selector keys
localStorage.setItem('selectedWorkspace', '');
localStorage.setItem('openedWorkspace', '');

// Create the list of workspaces
updateToolbarList();

// Display proper buttons
displayButtons();


// Opening & switching projects
function openTray(){

    // Retrieve selected & opened workspaces
    workspaceName = localStorage.getItem('selectedWorkspace');
    currentWorkspace = localStorage.getItem('openedWorkspace');

    // If the user is switching workspaces...
    if(currentWorkspace != null && currentWorkspace != "" && currentWorkspace != workspaceName){
        newworkspaceName = localStorage.getItem('selectedWorkspace');
        switchWorkspace(currentWorkspace, workspaceName);

    // If the user is opening a workspace...
    } else if(workspaceName != null && workspaceName != "" && workspaceName != currentWorkspace){
        openWorkspace(workspaceName);
    }

    // Update the tray UI
    displayButtons();
    updateToolbarList();

    // Hide the tray
    remote.getCurrentWindow().hide();

    // Update main app
    mainButtons();
    updateProjectList();
}



// Create new workspace
document.getElementById('create').addEventListener('click', (event) => {

    // Send message to main to create workspace
    ipc.send('menubar-create', '');

    // Hide tray
    remote.getCurrentWindow().hide();
})



// Close workspace
document.getElementById('close').addEventListener('click', (event) => {

    // Retrieve workspace name
    workspaceName = localStorage.getItem('selectedWorkspace');

    // Close workspace
    closeWorkspace(workspaceName);

    // Hide tray
    remote.getCurrentWindow().hide();

    // Update the buttons
    displayButtons();

    // Update the main app
    mainButtons();
    updateProjectList();
})



// Save the workspace
document.getElementById('save').addEventListener('click', (event) => {

    // Send message to main to create workspace
    ipc.send('menubar-save', '');

    // Hide the tray
    remote.getCurrentWindow().hide();
})



// Open the main app
document.getElementById('openApp').addEventListener('click', (event) => {

    // Hide the tray
    remote.getCurrentWindow().hide();

    // Open the main app
    ipc.send('open-main-app', '');
    
})



// Update all tray data when the icon has been clicked
ipc.on('ping', () => {

    // Sets the selected workspace to be the open workspace (either something or nothing)
    localStorage.setItem('selectedWorkspace', localStorage.getItem('openedWorkspace'));

    // Update the UI
    updateToolbarList();
    displayButtons();
    updateProjectList();

    // Checks if a workspace is open or not...
    if(localStorage.getItem('openedWorkspace') != "" && localStorage.getItem('openedWorkspace') != null){
        isProjectOpen = true;
    } else{
        isProjectOpen = false;
    }

    // Figure out how many workspaces have been created
    let numWorkspaces = 0;

    for(var i in projectData) {

        // Ignore keys that are not workspaces
        if (projectData[i] == 'project-order' || projectData[i] == 'selectedWorkspace' || projectData[i] == 'openedWorkspace' || projectData[i] == 'mainTour' || projectData[i] == 'workspaceTour') {
            continue;
        }
        numWorkspaces = numWorkspaces + 1;
     }

    // Set the menubar window height based on the number of workspaces
    ipc.send('menubar-height', [numWorkspaces, isProjectOpen])

    // Now send message to main to hide itself
    ipc.send('hide', '');
})