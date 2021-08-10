// this file controls button clicks etc on the toolbar window
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
})

//Close Button
document.getElementById('close').addEventListener('click', (event) => {
    //retrieve workspaceName
    workspaceName = sessionStorage.getItem('selectedWorkspace');

    sessionStorage.removeItem('openedWorkspace');
    displayButtons();

    //open workspace
    //closeWorkspace(workspaceName);
})


//Save Button
document.getElementById('save').addEventListener('click', (event) => {
    //retrieve workspaceName
    workspaceName = sessionStorage.getItem('selectedWorkspace');

    //save workspace
    //saveWorkspace(workspaceName);
})


//Switch Button
document.getElementById('save').addEventListener('click', (event) => {
    //retrieve workspaceName
    newworkspaceName = sessionStorage.getItem('selectedWorkspace');
    currentworkspaceName = sessionStorage.getItem('openedWorkspace');

    //switch workspace
    //saveWorkspace(currrentworkspaceName);
    //closeWorkspace(currentworkspaceName);
    //openWorkspace(newworkspacenName);
})