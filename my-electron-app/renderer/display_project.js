// function that displays all information about the project
function displayProject(index) {

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
}


<<<<<<< Updated upstream
    // delete project and minimize project details
    document.getElementById('deleteProject').addEventListener('click',function(){
        console.log(localStorage.MyProjectList[index]);
        localStorage.removeItem(localStorage.MyProjectList[0]);
        document.getElementById("display_project").style.display = "none";
=======
// Delete project and minimize project details
document.getElementById('deleteProject').addEventListener('click',function(){

    // Get the index of the project to be deleted
    index = document.getElementById("projectName").index

    // Get all of the projects
    var projects = JSON.parse(localStorage.MyProjectList);

    // Remove the key
    localStorage.removeItem("MyProjectList")

    // Remove the project from the storage
    projects = projects.splice(index, 1);

    console.log(projects)
    console.log(projects[-1])
    
    //localStorage.setItem('MyProjectList3', JSON.stringify(projects))
    localStorage.setItem('MyProjectList', JSON.stringify(projects))

    document.getElementById("display_project").style.display = "none";
    updateProjectList()
>>>>>>> Stashed changes
    });

module.exports = { displayProject }