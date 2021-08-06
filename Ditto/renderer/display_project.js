const psList = require('ps-list');
var latest_app = "";
var pidBefore = [];
var pidAfter = [];








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
                addItem(this.value);
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
    launchProject();
});


// Launches a project and tracks the processes
async function launchProject(){
    
    await beforeProcesses();
    setTimeout(await openItems(),3000);
    setTimeout(await afterProcesses(),3000);

    // Close the project display
    document.getElementById("display_project").style.display = "block";

}

async function beforeProcesses(){
    pidBefore = [];
    currentProcesses = await psList();
    for(var i in currentProcesses) {
        pidBefore.push(currentProcesses[i].pid);
    }
    console.log("Before processes logged.")
}

async function afterProcesses(){
    pidAfter = [];
    currentProcesses = await psList();
    for(var i in currentProcesses) {
        pidAfter.push(currentProcesses[i].pid);
    }
    console.log("After processes logged.")
}

async function openItems(){
    // Get the index of the project to be opened
    index = document.getElementById("projectName").index

    // Get project data of interest
    projectData = JSON.parse(localStorage.MyProjectList)[index];

    // Hide the project
    document.getElementById("display_project").style.display = "none";

    // Open all of the active urls
    for(var j in projectData.urls){
        if(projectData.urls_active[j]){
            shell.openExternal(projectData.urls[j]);
        }
    }

    // Open all of the active files
    for(var k in projectData.files) {
        if(projectData.files_active[k]){
            shell.openPath(projectData.files[k]);
        }
    }
    // Open all of the active applications
    for(var l in projectData.apps) {
        if(projectData.apps_active[l]){
            shell.openPath(projectData.apps[l]);
        }
    }
    console.log("Opened project.")
}

// Close project - get the difference between before and after pids
var terminate = require('terminate');
document.getElementById('closeProject').addEventListener('click', (event) =>{
    // Filter for new pids
    var psNew = pidAfter.filter(function(obj) { return pidBefore.indexOf(obj) == -1; });
    // Terminate new pids
    for(var i in psNew) {
        try {
            terminate(psNew[i]);
            console.log('terminated', psNew[i]);
        }catch(e) {
            console.log(e);
        }
    }
})


// Check to see if the user changed a project name
document.getElementById('projectName').addEventListener('input', (event) =>{

    // Get the index of the project to be deleted
    index = document.getElementById("projectName").index

    // Get all of the projects
    var projects = JSON.parse(localStorage.MyProjectList);

    // Snag the project to be editted
    var project = projects[index]

    // Change the project name
    project.name = document.getElementById("projectName").textContent

    // Update the project in the storage
    projects.splice(index, 1, project);

    //reset the data in the key
    localStorage.setItem('MyProjectList', JSON.stringify(projects))
    console.log("Updated the name.")

    // Update the name of the project
    updateProjectList()
});