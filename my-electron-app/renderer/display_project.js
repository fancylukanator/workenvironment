// function that displays all information about the project
function displayProject(index) {

    projectData = JSON.parse(localStorage.MyProjectList)[index];

    document.getElementById("projectName").innerHTML = projectData.name;

    document.getElementById("projectURLs").innerHTML = "";
    for(var j in projectData.urls){
        var linkList = document.getElementById("projectURLs");
        var linkEntry = document.createElement('li');
        linkEntry.appendChild(document.createTextNode(projectData.urls[j]));
        linkList.appendChild(linkEntry);
    }

    document.getElementById("projectFiles").innerHTML = "";
    for(var k in projectData.files) {
        var fileList = document.getElementById("projectFiles");
        var fileEntry = document.createElement('li');
        fileEntry.appendChild(document.createTextNode(projectData.files[k]));
        fileList.appendChild(fileEntry);
    }

    document.getElementById("projectApps").innerHTML = "";
    for(var l in projectData.apps) {
        var appList = document.getElementById("projectApps");
        var appEntry = document.createElement('li');
        appEntry.appendChild(document.createTextNode(projectData.apps[l]));
        appList.appendChild(appEntry);
    }
    

    // delete project and minimize project details
    document.getElementById('deleteProject').addEventListener('click',function(){
        console.log(localStorage.MyProjectList[index]);
        localStorage.removeItem(localStorage.MyProjectList[0]);
        document.getElementById("display_project").style.display = "none";
    });
    document.getElementById("display_project").style.display = "block";
}

module.exports = { displayProject }