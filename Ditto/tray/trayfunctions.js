// FUNCTION THAT CREATES A LIST ELEMENT FOR EACH WORKSPACE IN LOCALSTORAGE
function updateToolbarList(){
    try{
        var projectList = document.getElementById("toolbarList");

        // Clear the current project list
        projectList.innerHTML = "";
    
        // Construct new project list
        projectData = Object.keys(localStorage);
        for(var i in projectData) {
            var entry = document.createElement('li');
            entry.id = "project-" + i;
            entry.index = projectData[i]
            entry.tabIndex = 1;
            entry.onclick = function() {
                selectWorkspace(this.index); // Send the index for the project to selectProject
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
    sessionStorage.setItem('selectedWorkspace', index);
}

