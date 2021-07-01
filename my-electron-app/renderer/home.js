// Checks for when the new project button is clicked
document.getElementById('create_new_proj').addEventListener('click',function(){
    document.getElementById("create_project").style.display = "block";
})

// Checks for when the launch button is clicked
document.getElementById('launch').addEventListener('click',function(){
    ipc.send('launch')
});

// create a list element for each project in localStorage
var list = document.getElementById("projectList");
projectData = JSON.parse(localStorage.MyProjectList);
for(var i in projectData) {
    var entry = document.createElement('li');
    entry.setAttribute('onclick', console.log("hey"));
    entry.appendChild(document.createTextNode(projectData[i].name));
    list.appendChild(entry);
}
