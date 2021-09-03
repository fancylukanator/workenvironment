var latest_app = "";

// Select applications from dropdown menu
var expandedApp = false;
function dropdownApps(){
    var checkboxes = document.getElementById("checkboxes-apps-display");
    if (!expandedApp) {
      checkboxes.style.display = "block";
      expandedApp = true;
    } else {
      checkboxes.style.display = "none";
      expandedApp = false;
    }
}


function displayApps(current_apps){
    // Access the files in the application folder
    // Notes:
    // -> Could add in /System/Applications for Mac default apps
    // -> Could also further explore directories within /Applications folder
    var folder = "/Applications/"
    var fs = require('fs');
    var files = fs.readdirSync(folder);

    // Reset the checkbox html code
    appList = document.getElementById("checkboxes-apps-display");
    appList.innerHTML = "";

    // Add each of the .app files to the dropdown menu
    for(var i = 0; i < files.length; i++){
        if(files[i].endsWith(".app")){
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.index = i;
            checkbox.id = files[checkbox.index].slice(0,-4);
            checkbox.value = "Apps";

            if(current_apps.includes(files[checkbox.index].slice(0,-4))){
                checkbox.checked = true;
            }

            checkbox.onclick = function() {
                latest_app = this.id;
                expandedApp = false; // Only can select one app at a time for whatever reason... Temp fix
                addToWorkspace(this.value);
            }
         
            var label = document.createElement('label')
            label.htmlFor = folder + files[checkbox.index];
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(files[checkbox.index].slice(0,-4)));
    
            appList.appendChild(label);
        }
    }
}

// Load correct buttons
mainButtons();

// Delete button. Delete project and minimize project details
document.getElementById('deleteProject').addEventListener('click', (event)=> {

    // prevent multiple button clicks
    event.preventDefault();

    // Get the index of the project to be deleted
    index = document.getElementById("projectName").index;

    // Delete the project
    deleteWorkspace(index);
    console.log("deleted");

    document.getElementById("display_project").style.display = "none";
    document.getElementById("default-home").style.display = "inline-block";
    
    updateProjectList()
});


// Save button. Re-save the project
document.getElementById('saveProject').addEventListener('click', (event)=> {

    // prevent multiple button clicks
    event.preventDefault();

    // Get the index of the project to be saved over
    index = document.getElementById("projectName").index;

    // Sets the current workspace to the current one
    localStorage.setItem('openedWorkspace', index)

    // Updates the icon tray title
    ipc.send('update-title-tray-window-event', index);

    // Resave the workspace
    resaveWorkspace(index);
    console.log("resaved");

});



// Close Button. Close the project
document.getElementById('closeProject').addEventListener('click', (event)=> {

    // prevent multiple button clicks
    event.preventDefault();

    // Get the index of the project to be saved over
    index = document.getElementById("projectName").index;

    // Close the workspace
    closeWorkspace(index);

    console.log("closed");

    // update buttons
    mainButtons();

});



// Open Button. Listen to if the user wishes to open a specific project
document.getElementById('launchProject').addEventListener('click', (event) =>{

    // Minimize window upon opening a project
    ipc.send('hide');

    // Call async function to open project
    openWorkspace(document.getElementById("projectName").index);

    // Updates the display on the main app
    mainButtons();

});



// Switch Button. Listen to if the user wishes to switch to a specific project
document.getElementById('switchProject').addEventListener('click', (event) =>{

    // Minimize window upon opening a project
    ipc.send('hide');

    //retrieve workspaceName
    newworkspaceName = localStorage.getItem('selectedWorkspace');
    currentworkspaceName = localStorage.getItem('openedWorkspace');

    // call function to switch
    switchWorkspace(currentworkspaceName, newworkspaceName);

    // Updates the display on the main app
    mainButtons();
});


// Check to see if the user changed a project name
document.getElementById('projectName').addEventListener('blur', (event) =>{

    // Ensures that the project name is unique & it is not only whitespace
    if(localStorage.getItem(document.getElementById("projectName").textContent) == null && /\S/.test(document.getElementById("projectName").textContent)){
        // Get the index of the project to be deleted
        index = document.getElementById("projectName").index

        // Get the project
        var project = JSON.parse(localStorage.getItem(index));

        // Change the project name
        project.name = document.getElementById("projectName").textContent;

        // Change the selected workspace
        localStorage.setItem("selectedWorkspace", project.name)

        // If the project is open, sets the new name to be the open project
        if(localStorage.getItem("openedWorkspace") == index){
            localStorage.setItem("openedWorkspace", project.name)

            // Updates the icon tray title
            ipc.send('update-title-tray-window-event', project.name);
        }

        //reset the data in the key
        localStorage.removeItem(index)
        localStorage.setItem(project.name, JSON.stringify(project))
        console.log("Updated the name.")

        // Update the index of the element
        document.getElementById("projectName").index = project.name

        // Update the name of the project
        updateProjectList()
    } else{
        // Resets the project name to the original if it was not unique
        document.getElementById("projectName").textContent = document.getElementById("projectName").index;
    }

});