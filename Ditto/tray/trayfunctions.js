// FUNCTION THAT CREATES A LIST ELEMENT FOR EACH WORKSPACE IN LOCALSTORAGE
function updateToolbarList(){
    try{
        var projectList = document.getElementById("toolbarList");

        // Clear the current project list
        projectList.innerHTML = "";
    
        // Construct new project list
        projectData = Object.keys(localStorage);
        for(var i in projectData) {
            // ignore keys that are not workspaces
            if (projectData[i] == 'selectedWorkspace' || projectData[i] == 'openedWorkspace' || projectData[i] == localStorage.getItem('openedWorkspace')) {
                continue;
            }
            var entry = document.createElement('li');
            entry.id = "project-" + projectData[i];
            entry.title = "Launch " + projectData[i] + "...";
            entry.index = projectData[i];
            entry.tabIndex = 1;
            entry.onclick = function() {
                selectWorkspace(this.index); // Send the index for the project to selectProject
                displayButtons();
                openTray();
            }
            entry.appendChild(document.createTextNode(projectData[i]));
            projectList.appendChild(entry);
        }
    }
    catch(e){
        console.log(e);
    }
}

// FUNCTION THAT INDICATES WHICH PROJECT IS SELECTED SO THAT IT CAN BE OPENED OR CLOSED
function selectWorkspace(index) {
    // send workspace name to sessionStorage so that open/close
    // button know what workspace to operate on
    localStorage.setItem('selectedWorkspace', index);
}

// FUNCTION THAT CHOOSES WHICH BUTTONS TO SHOW
function displayButtons() {
    // Choose which button layout to dispay
    if (localStorage.getItem('selectedWorkspace') != '' 
    && localStorage.getItem('openedWorkspace') == localStorage.getItem('selectedWorkspace')) {
    document.getElementById("openControls").style.display = "none";
    document.getElementById("switchControls").style.display = "none";
    document.getElementById("closeControls").style.display = "block";
    document.getElementById("currentWorkspace").innerHTML = localStorage.getItem('openedWorkspace');
    document.getElementById("workspacesHeader").innerHTML = "Switch Workspaces";
    } else {
    document.getElementById("switchControls").style.display = "none";
    document.getElementById("closeControls").style.display = "none";
    document.getElementById("openControls").style.display = "block";
    document.getElementById("workspacesHeader").innerHTML = "Workspaces";
    }
}
