// FUNCTION THAT CREATES A LIST ELEMENT FOR EACH WORKSPACE IN LOCALSTORAGE
function updateToolbarList(){
    try{
        // Gets the workspace list
        var projectList = document.getElementById("toolbarList");

        // Clear the current workspace list
        projectList.innerHTML = "";
    
        // Construct new project list
        projectData = Object.keys(localStorage);

        // For each workspace...
        for(var i in projectData) {

            // Ignore keys that are not workspaces
            if (projectData[i] == 'project-order' || projectData[i] == 'selectedWorkspace' || projectData[i] == 'openedWorkspace' || projectData[i] == localStorage.getItem('openedWorkspace')|| projectData[i] == 'mainTour' || projectData[i] == 'workspaceTour') {
                continue;
            }

            // Build the button for each workspace
            var entry = document.createElement('li');
            entry.id = "project-" + projectData[i];
            entry.title = "Launch " + projectData[i] + "...";
            entry.index = projectData[i];
            entry.tabIndex = 1;
            entry.setAttribute('data-id', projectData[i]); // Used to link workspace list with main app list
            entry.classList.add("disable-sort")
            entry.onclick = function() {
                selectWorkspace(this.index); // Send the index for the project to selectProject
                displayButtons();
                openTray();
            }
            entry.appendChild(document.createTextNode(projectData[i]));
            projectList.appendChild(entry);
        }

        // Transforms the workspace list into a Sortable array (to maintain order)
        Sortable.create(projectList, {
            ghostClass: "ghost",
            group: "project-order",
            filter: '.disable-sort',
            store: {
                /**
                 * Get the order of elements. Called once during initialization.
                 * @param   {Sortable}  sortable
                 * @returns {Array}
                 */
                get: function (sortable) {
                    var order = localStorage.getItem(sortable.options.group.name);
                    return order ? order.split('|') : [];
                },
        
                /**
                 * Save the order of elements. Called onEnd (when the item is dropped).
                 * @param {Sortable}  sortable
                 */
                set: function (sortable) {
                    var order = sortable.toArray();
                    localStorage.setItem(sortable.options.group.name, order.join('|'));
                }
            }
        })
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
    // Choose which button layout to dispay...

    // Workspace is currently open
    if (localStorage.getItem('selectedWorkspace') != '' 
    && localStorage.getItem('openedWorkspace') == localStorage.getItem('selectedWorkspace')) {
    document.getElementById("closeControls").style.display = "block";
    document.getElementById("currentWorkspace").innerHTML = localStorage.getItem('openedWorkspace');
    document.getElementById("workspacesHeader").innerHTML = "Switch Workspaces";

    // No workspace is open
    } else {
    document.getElementById("closeControls").style.display = "none";
    document.getElementById("workspacesHeader").innerHTML = "Workspaces";
    }
}
