// function that displays all information about the project
function displayProject () {
    // show all data
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
    // delete project and minimize project details
    document.getElementById('deleteProject').addEventListener('click',function(){
        localStorage.removeItem('MyProjectList[0]');
        document.getElementById("display_project").style.display = "none";
    });
    document.getElementById("display_project").style.display = "block";
}