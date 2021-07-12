const psList = require('ps-list');
var latest_app = "";
var pidBefore = [];
var pidAfter = [];


// function that displays all information about the project
function displayProject(index) {

    // Clear out the apps and urls from create_project
    appList = document.getElementById("checkboxes-apps");
    appList.innerHTML = "";
    var tabList = document.getElementById("checkboxes-urls");
    tabList.innerHTML = "";

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
            cell1.innerHTML = '<form><div class="multiselect"><div class="selectBox" id = "select-new-apps"><select><option>Select Applications...</option></select><div class="overSelect"></div></div><div id="checkboxes-apps-display"></div></div></form>';
            var dropdown = document.getElementById("select-new-apps");
            dropdown.onclick = function(){
                dropdownApps();
                console.log("Dropdown")
            }
            displayApps(array);
            break;
    }
  }



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
            var app = document.getElementById(latest_app);
            console.log(latest_app)
            if(!app.checked){
                console.log("DELETED FROM LIST")
                deleteItem(type,project.apps.indexOf(latest_app))
                return;
            }
            else{
                project.apps.push(latest_app)
                project.apps_active.push(1)
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

    console.log(project)
    
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
            try {
                document.getElementById(project.apps[index]).checked = false;
              } catch (error) {
                console.log(error)
              }
            console.log(project.apps[index])
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