// Initial call to create a project list
updateProjectList();

// Create a list element for each project in localStorage
function updateProjectList(){
    try{
        var projectList = document.getElementById("projectList");

        // Clear the current project list
        projectList.innerHTML = "";
    
        // Construct new project list
        projectData = JSON.parse(localStorage.MyProjectList);
        for(var i in projectData) {
            var entry = document.createElement('li');
            entry.id = "project-" + i;
            entry.index = i
            entry.onclick = function() {
                displayProject(this.index); // Send the index for the project to displayProject
            }
            entry.appendChild(document.createTextNode(projectData[i].name));
            projectList.appendChild(entry);
        }
    }
    catch(e){
        console.log(e);
    }

}

// Checks for when the new project button is clicked
document.getElementById('create_new_proj').addEventListener('click',(event) => {
    
    // Checks to see if the person is not already making a project
    if(document.getElementById("create_project").style.display != "block"){

        // Reset the tentative project
        document.forms[0].reset();
        document.getElementById('urlList').innerHTML = "";
        document.getElementById('fileList').innerHTML = "";
        document.getElementById('appList').innerHTML = "";
        urlArray = [];
        fileArray = [];
        appArray = [];

        // Display the create project portal
        document.getElementById("create_project").style.display = "block";
        document.getElementById("display_project").style.display = "none";
    }
    // If the user is trying to close create a project
    else{
        document.getElementById("create_project").style.display = "none";
    }
})
