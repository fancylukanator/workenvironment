// take tabs, documents, apps, name and save it in local storage
function saveWorkspace(tabs, documents, apps, workspaceName) {
    // create project object
    let project = {
        name: workspaceName, // Name of the project
  
        // Items contained within the project
        urls: tabs,
        files: documents,
        apps: apps,
  
        // Activation status of each of the items
        urls_active: new Array(urlArray.length).fill(1),
        files_active: new Array(fileArray.length).fill(1),
        apps_active: new Array(appArray.length).fill(1)
      }

    // Display
    console.warn('added', {project} );
    
    // Save to localStorage
    localStorage.setItem(workspaceName, JSON.stringify(project));
}



// Create a list element for each project in localStorage
function updateProjectList(){
    console.log("hello from update project list")
    try{
        var projectList = document.getElementById("projectList");

        // Clear the current project list
        projectList.innerHTML = "";
    
        // Construct new project list
        projectData = Object.keys(localStorage);
        for(var i in projectData) {
            var entry = document.createElement('li');
            entry.id = "project-" + i;
            entry.index = projectData[i]
            entry.onclick = function() {
                displayProject(this.index); // Send the index for the project to displayProject
            }
            entry.appendChild(document.createTextNode(projectData[i]));
            projectList.appendChild(entry);
        }
    }
    catch(e){
        console.log(e);
    }
}



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
        projectData = JSON.parse(localStorage.getItem(index));

        // Set the name of the project and its index in storage
        document.getElementById("projectName").textContent = index;
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
