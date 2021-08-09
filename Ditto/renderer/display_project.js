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
            checkbox.id = folder + files[checkbox.index];
            checkbox.value = "Apps";

            if(current_apps.includes(folder + files[checkbox.index])){
                checkbox.checked = true;
            }

            checkbox.onclick = function() {
                latest_app = this.id;
                console.log(latest_app)
                console.log(this.checked)
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


// Function used to capture the URLs on Chrome
async function captureURLs(){
    const getChromeTabs = require('get-chrome-tabs');
    // get the data and wait for it to be loaded
    const tabData = await getChromeTabs();

    return tabData;
}

// Delete project and minimize project details
document.getElementById('deleteProject').addEventListener('click', (event)=> {

    // prevent multiple button clicks
    event.preventDefault();

    // Get the index of the project to be deleted
    index = document.getElementById("projectName").index;

    // Delete the project
    deleteWorkspace(index);
    console.log("deleted");

    document.getElementById("display_project").style.display = "none";
    updateProjectList()
});



// Listen to if the user wishes to open a specific project
document.getElementById('launchProject').addEventListener('click', (event) =>{
    // Minimize window upon opening a project
    ipc.send('minimize');

    // Call async function to open project
    openWorkspace(document.getElementById("projectName").index);
});


// Check to see if the user changed a project name
document.getElementById('projectName').addEventListener('input', (event) =>{

    // Get the index of the project to be deleted
    index = document.getElementById("projectName").index

    // Get the project
    var project = JSON.parse(localStorage.getItem(index));

    // Change the project name
    project.name = document.getElementById("projectName").textContent;

    //reset the data in the key
    localStorage.removeItem(index)
    localStorage.setItem(project.name, JSON.stringify(project))
    console.log("Updated the name.")

    // Update the index of the element
    document.getElementById("projectName").index = project.name

    // Update the name of the project
    updateProjectList()
});