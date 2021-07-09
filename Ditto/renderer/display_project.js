// function that displays all information about the project
function displayProject(index) {

    // If the user is already previewing the project they clicked on... hide the project
    if(document.getElementById("projectName").index == index && document.getElementById("display_project").style.display == "block"){
        document.getElementById("display_project").style.display = "none";
    }
    // If the user wants to view a new project...
    else{
        // Get project data of interest
        projectData = JSON.parse(localStorage.MyProjectList)[index];

        // Set the name of the project and its index in storage
        document.getElementById("projectName").textContent = projectData.name;
        document.getElementById("projectName").index = index

        // List out all of the URLs
        detailsTable(document.getElementById("projectURLs"),projectData.urls,projectData.urls_active,"URLs")

        // List out all of the files
        detailsTable(document.getElementById("projectFiles"),projectData.files,projectData.files_active,"Files")

        // List all of the applications
        detailsTable(document.getElementById("projectApps"),projectData.apps,projectData.apps_active,"Apps")

        document.getElementById("display_project").style.display = "block";
        document.getElementById("create_project").style.display = "none";
    }
}



// Function to display details of the project
function detailsTable(table, array, active, type){

    // Reset the table
    table.innerHTML = "";

    // Add in the header to the table
    row = table.insertRow()
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    cell1.innerHTML = type;
    cell2.innerHTML = ""; //"Selected";
    cell3.innerHTML = ""; //"Delete";

    // Add contents to the table
    for(var i = 0; i < array.length; i++){
      row = table.insertRow()
      var cell1 = row.insertCell();
      var cell2 = row.insertCell();
      var cell3 = row.insertCell();

      // First cell contains the path
      cell1.innerHTML = array[i];

      // Second cell contains ability to toggle activation
      cell2.innerHTML = '<input type="checkbox" id = "c2-' + type + '-' + i + '"/>';
      var cb = document.getElementById("c2-" + type + "-" + i);
      cb.id = "checkbox-" + type + "-" + i;
      cb.index = i
      cb.onclick = function() {
          activate(type,this.index);
      }
      if(active[i]){
          cb.checked = true; // Sets the check box to be on if previously active
      }

      // Third cell allows the item to be deleted from the project
      cell3.innerHTML = '<button type="button" id = "c3-' + type + '-' + i + '">x</button>';
      var del = document.getElementById("c3-" + type + "-" + i);
      del.id = "delete-" + type + "-" + i;
      del.index = i
      del.onclick = function() {
          deleteItem(type,this.index);
      }
    }

    // Final row to add additional stuff
    row = table.insertRow()
    var cell1 = row.insertCell();
    
    // Set type specific input options
    switch(type){
        case "URLs":
            cell1.innerHTML = '<input type="text" id="select-new-url"><button type="button" id = "add-new-url">Add</button><button type="button" id = "new-captured-urls">Capture</button>';
            var add = document.getElementById("add-new-url");
            add.onclick = function() {
                addItem("URL");
            }
            var capture = document.getElementById("new-captured-urls");
            capture.onclick = function() {
                addItem(type);
            }
            break;
        case "Files":
            cell1.innerHTML = '<input type="file" multiple id="select-new-files">';
            var add = document.getElementById("select-new-files");
            add.onchange = function() {
                addItem(type);
            }
            break;
        case "Apps":
            cell1.innerHTML = '<input type="file" multiple id="select-new-apps" accept=".app,.exe">';
            var add = document.getElementById("select-new-apps");
            add.onchange = function() {
                addItem(type);
            }
            break;
    }
  }



async function addItem(type){

    // Get the index of the project
    p_index = document.getElementById("projectName").index

    // Get all of the projects
    var projects = JSON.parse(localStorage.MyProjectList);

    // Snag the project to be editted
    var project = projects[p_index]
    
    // Add the new item to the array
    switch(type){
        case "URL":
            let url = document.getElementById('select-new-url').value;
            if(url != "" && !project.urls.includes(url)){
                project.urls.push(url)
                project.urls_active.push(1)
            }
            break;
        case "URLs":
            var tabData = await captureURLs();
            for(var i = 0; i < tabData.length; i++){
                console.log(tabData[i].url)
                if(tabData[i].url != "" && !project.urls.includes(tabData[i].url)){
                    project.urls.push(tabData[i].url)
                    project.urls_active.push(1)
                }
            }    
            break;
        case "Files":
            let files = document.getElementById('select-new-files').files;
            for(var i = 0; i < files.length; i++){
                if(files[i].path != "" && !project.files.includes(files[i].path)){
                    project.files.push(files[i].path)
                    project.files_active.push(1)
                }
            }
            break;
        case "Apps":
            let apps = document.getElementById('select-new-apps').files;
            for(var i = 0; i < apps.length; i++){
                if(apps[i].path != "" && !project.apps.includes(apps[i].path)){
                    project.apps.push(apps[i].path)
                    project.apps_active.push(1)
                }
            }
            break;
    }

    // Update the project in the storage
    projects.splice(p_index, 1, project);

    // Update the data in the key
    localStorage.setItem('MyProjectList', JSON.stringify(projects))

    // Reload the project display
    document.getElementById("display_project").style.display = "none";
    displayProject(p_index)
}


// Function used to capture the URLs on Chrome
async function captureURLs(){
    const getChromeTabs = require('get-chrome-tabs');
    // get the data and wait for it to be loaded
    const tabData = await getChromeTabs();

    return tabData;
}



// Function to toggle if something will be launched
function activate(type,index){

    // Get the index of the project
    p_index = document.getElementById("projectName").index

    // Get all of the projects
    var projects = JSON.parse(localStorage.MyProjectList);

    // Snag the project to be editted
    var project = projects[p_index]
    
    // Toggles the activation of the requested item
    switch(type){
        case "URLs":
            project.urls_active[index] = (project.urls_active[index] == 0 ? 1 : 0);
            break;
        case "Files":
            project.files_active[index] = (project.files_active[index] == 0 ? 1 : 0);
            break;
        case "Apps":
            project.apps_active[index] = (project.apps_active[index] == 0 ? 1 : 0);
            break;
    }

    // Update the project in the storage
    projects.splice(p_index, 1, project);

    // Update the data in the key
    localStorage.setItem('MyProjectList', JSON.stringify(projects))
}



// Delete a specific url, file, or app from a project
function deleteItem(type, index){

    // Get the index of the project
    p_index = document.getElementById("projectName").index

    // Get all of the projects
    var projects = JSON.parse(localStorage.MyProjectList);

    // Snag the project to be editted
    var project = projects[p_index]
    
    // Removes the item and its active status
    switch(type){
        case "URLs":
            project.urls.splice(index,1)
            project.urls_active.splice(index,1)
            break;
        case "Files":
            project.files.splice(index,1)
            project.files_active.splice(index,1)
            break;
        case "Apps":
            project.apps.splice(index,1)
            project.apps_active.splice(index,1)
            break;
    }

    // Update the project in the storage
    projects.splice(p_index, 1, project);

    // Update the data in the key
    localStorage.setItem('MyProjectList', JSON.stringify(projects))

    // Reload the project display
    document.getElementById("display_project").style.display = "none";
    displayProject(p_index)
}



// Delete project and minimize project details
document.getElementById('deleteProject').addEventListener('click', (event)=> {

    // prevent multiple button clicks
    event.preventDefault();

    // Get the index of the project to be deleted
    index = document.getElementById("projectName").index

    // Get all of the projects
    var projects = JSON.parse(localStorage.MyProjectList);

    // Remove the project from the storage
    projects.splice(index,1);

    //reset the data in the key
    localStorage.setItem('MyProjectList', JSON.stringify(projects))
    console.log("deleted")

    document.getElementById("display_project").style.display = "none";
    updateProjectList()

    });



// Open a specific project
document.getElementById('launchProject').addEventListener('click', (event) =>{

    // Generate a list of PID's before project is launched
    const psList = require('ps-list');
    async function before() {
        psBeforeLaunch = await psList();
        // create array of all PID's
        pidBefore = [];
        for(var i in psBeforeLaunch) {
            pidBefore.push(psBeforeLaunch[i].pid);
        }
        console.log('received before processes');
        return pidBefore;
    }
    before();
    
    // Get the index of the project to be opened
    index = document.getElementById("projectName").index

    // Get project data of interest
    projectData = JSON.parse(localStorage.MyProjectList)[index];

    // Hide the project
    document.getElementById("display_project").style.display = "none";

    // Minimize window upon opening a project
    ipc.send('minimize');

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

    // Close the project display
    document.getElementById("display_project").style.display = "block";

    //  Generate a list of PID's after project is launched
    async function after() {
        psAfterLaunch = await psList();
        // create array of all PID's after project launch
        pidAfter = [];
        for(var i in psAfterLaunch) {
            pidAfter.push(psAfterLaunch[i].pid);
        }
        console.log('received after processes');
        return pidAfter;
    }
    after();
});

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