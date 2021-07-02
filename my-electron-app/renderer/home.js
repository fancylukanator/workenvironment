// Checks for when the new project button is clicked
document.getElementById('create_new_proj').addEventListener('click',function(){
    document.getElementById("create_project").style.display = "block";
})

// Checks for when the launch button is clicked
document.getElementById('launch').addEventListener('click',function(){
    ipc.send('launch')
});

// load in displayproject function from display_project.js
const display = require("./display_project.js");


// create a list element for each project in localStorage
var projectList = document.getElementById("projectList");
projectData = JSON.parse(localStorage.MyProjectList);
for(var i in projectData) {
    var entry = document.createElement('li');
    entry.onclick = display.test();
    entry.appendChild(document.createTextNode(projectData[i].name));
    projectList.appendChild(entry);
}

