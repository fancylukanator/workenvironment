// load in displayproject function from display_project.js
const display = require("./display_project");

// Initial call to create a project list
try{
    updateProjectList();
}
catch(e){
    console.log(e)
}

// Create a list element for each project in localStorage
function updateProjectList(){
    var projectList = document.getElementById("projectList");

    // Clear the current project list
    projectList.innerHTML = "";

    // Construct new project list
    projectData = JSON.parse(localStorage.MyProjectList);
    for(var i in projectData) {
        var entry = document.createElement('li');
        entry.id = projectData[i].name;
        entry.onclick = display.displayProject(i); // Send the index for the project to displayProject
        entry.appendChild(document.createTextNode(projectData[i].name));
        projectList.appendChild(entry);
    }
}

// Checks for when the new project button is clicked
document.getElementById('create_new_proj').addEventListener('click',function(){
    document.getElementById("create_project").style.display = "block";
})

// Checks for when the launch button is clicked
document.getElementById('launch').addEventListener('click',function(){
    ipc.send('launch')
});
