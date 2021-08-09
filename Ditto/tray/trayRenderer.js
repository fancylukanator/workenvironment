// this file controls button clicks etc on the toolbar window
// create the list of workSpaces
updateToolbarList()

//Open Button
document.getElementById('open').addEventListener('click', (event) => {
    //retrieve workspaceName
    workspaceName = sessionStorage.getItem('selectedWorkspace');

    //open workspace
    openWorkspace(workspaceName);
})

//Close Button
document.getElementById('close').addEventListener('click', (event) => {
    //retrieve workspaceName
    workspaceName = sessionStorage.getItem('selectedWorkspace');

    //open workspace
    closeWorkspace(workspaceName);
})

document.getElementById("close").disabled = true;