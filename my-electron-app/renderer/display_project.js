// function that displays all information about the project
function displayProject(index) {

    projectData = JSON.parse(localStorage.MyProjectList)[index];

    // show all data
    document.getElementById("projectName").innerHTML = projectData.name;
    for(var j in projectData.urls){
        var linkList = document.getElementById("projectURLs");
        var linkEntry = document.createElement('li');
        linkEntry.appendChild(document.createTextNode(projectData.urls[j]));
        linkList.appendChild(linkEntry);
    }
}
    /*for(var k in projectData.files) {
        var fileList = document.getElementById("projectFiles");
        var fileEntry = document.createElement('li');
        fileEntry.appendChild(document.createTextNode(projectData.files[k]));
        fileList.appendChild(fileEntry);
    }
    for(var l in projectData.apps) {
        var appList = document.getElementById("projectApps");
        var appEntry = document.createElement('li');
        appEntry.appendChild(document.createTextNode(projectData.apps[l]));
        appList.appendChild(appEntry);
    }
    

    // delete project and minimize project details
document.getElementById('deleteProject').addEventListener('click',function(){
        localStorage.removeItem('MyProjectList[0]');
        document.getElementById("display_project").style.display = "none";
    });
    document.getElementById("display_project").style.display = "block";
}
*/

module.exports = { displayProject }