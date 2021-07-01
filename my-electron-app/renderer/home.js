// Checks for when the new project button is clicked
document.getElementById('create_new_proj').addEventListener('click',function(){
    document.getElementById("create_project").style.display = "block";
})

// Checks for when the launch button is clicked
document.getElementById('launch').addEventListener('click',function(){
    ipc.send('launch')
});

// create a list element for each project in localStorage
var projectList = document.getElementById("projectList");
projectData = JSON.parse(localStorage.MyProjectList);
for(var i in projectData) {
    var entry = document.createElement('li');
    entry.onclick = displayProject;
    entry.appendChild(document.createTextNode(projectData[i].name));
    projectList.appendChild(entry);
}

// function that displays all information about the project
function displayProject () {
    document.getElementById("projectName").textContent += projectData[i].name;
    for(var j in projectData[i].urls){
        var linkList = document.getElementById("projectLinks");
        var linkEntry = document.createElement('li');
        linkEntry.appendChild(document.createTextNode(projectData[i].urls[j]));
        linkList.appendChild(linkEntry);
    }
    for(var k in projectData[i].files) {
        var fileList = document.getElementById("projectFiles");
        var fileEntry = document.createElement('li');
        fileEntry.appendChild(document.createTextNode(projectData[i].files[k]));
        fileList.appendChild(fileEntry);
    }
    for(var l in projectData[i].apps) {
        var appList = document.getElementById("projectApps");
        var appEntry = document.createElement('li');
        appEntry.appendChild(document.createTextNode(projectData[i].apps[l]));
        appList.appendChild(appEntry);
    }
    document.getElementById("display_project").style.display = "block";
}