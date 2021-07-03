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
        document.getElementById("projectURLs").innerHTML = "";
        for(var j in projectData.urls){
            var linkList = document.getElementById("projectURLs");
            var linkEntry = document.createElement('li');
            linkEntry.appendChild(document.createTextNode(projectData.urls[j]));
            linkList.appendChild(linkEntry);
        }

        // List out all of the files
        document.getElementById("projectFiles").innerHTML = "";
        for(var k in projectData.files) {
            var fileList = document.getElementById("projectFiles");
            var fileEntry = document.createElement('li');
            fileEntry.appendChild(document.createTextNode(projectData.files[k]));
            fileList.appendChild(fileEntry);
        }

        // List all of the applications
        document.getElementById("projectApps").innerHTML = "";
        for(var l in projectData.apps) {
            var appList = document.getElementById("projectApps");
            var appEntry = document.createElement('li');
            appEntry.appendChild(document.createTextNode(projectData.apps[l]));
            appList.appendChild(appEntry);
        }
        document.getElementById("display_project").style.display = "block";
        document.getElementById("create_project").style.display = "none";
    }
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
    
    // Get the index of the project to be deleted
    index = document.getElementById("projectName").index

    // Get project data of interest
    projectData = JSON.parse(localStorage.MyProjectList)[index];

    // Hide the project
    document.getElementById("display_project").style.display = "none";

    // Minimize window upon opening a project
    ipc.send('minimize');

    // Open all of the urls
    for(var j in projectData.urls){
        shell.openExternal(projectData.urls[j]);
    }

    // Open all of the files
    for(var k in projectData.files) {
        shell.openPath(projectData.files[k]);
    }

    // Open all of the applications
    for(var l in projectData.apps) {
        shell.openPath(projectData.apps[l]);
    }

    // Close the project display
    document.getElementById("display_project").style.display = "block";
});