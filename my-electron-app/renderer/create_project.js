// Adds new link to the URLS array...
urlArray = [];
document.getElementById('url').addEventListener('change', (event) => {
  let url = document.getElementById('url').value;

  // Ensure url is both unique and not null
  if(url != "" && !urlArray.includes(url)){
    urlArray.push(url);
    document.getElementById("url").value = ""; // clear the value
    console.warn('added', {urlArray} );
    updateTable(document.getElementById('urlList'), urlArray, "URL")
  }
});

// Adds new files to the FILE array...
fileArray = [];
document.getElementById('addfile').addEventListener('change', (event) => {
  let file = document.getElementById('addfile').files[0].path;

  // Ensure file is both unique and not null
  if(file != "" && !fileArray.includes(file)){
    fileArray.push(file);
    console.warn('added', {fileArray});
    updateTable(document.getElementById('fileList'), fileArray, "FILE")
  }
});

// Adds new apps to the APP array...
appArray = [];
document.getElementById('addapp').addEventListener('change', (event) => {
  let app = document.getElementById('addapp').value;

  // Ensure app is both unique and not null
  if(app != "" && !appArray.includes(app)){
    appArray.push(app);
    console.warn('added', {appArray} );
    updateTable(document.getElementById('appList'), appArray, "APP")
  }
});

// Function to update the specific table
function updateTable(table, array, type){
  table.innerHTML = "";

  for(var i = 0; i < array.length; i++){
    row = table.insertRow()
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    cell1.innerHTML = type;
    cell2.innerHTML = array[i];
  }
}


// creates array of JSON objects containing project information...
// creates a project button
// hides form content when submitted

const addProject = (ev) => {

  // Loads in current projects
  let projects = JSON.parse(localStorage.getItem('MyProjectList')) || [];

  ev.preventDefault();// stop form from submitting
  
  // Ensure that the project has a name and that the name is unique
  if(document.getElementById('wspace').value != "" && !projects.map(({ name }) => name).includes(document.getElementById('wspace').value)){
    let project = {
      name: document.getElementById('wspace').value,
      urls: urlArray.slice(),
      files: fileArray.slice(),
      apps: appArray.slice()
    }
    projects.push(project);
    document.forms[0].reset();
    
    //display
    console.warn('added', {projects} );
    
    // save to localStorage
    localStorage.setItem('MyProjectList', JSON.stringify(projects));
  
    // Reset and clear all project creation stuff
    document.getElementById('urlList').innerHTML = "";
    document.getElementById('fileList').innerHTML = "";
    document.getElementById('appList').innerHTML = "";
    urlArray = [];
    fileArray = [];
    appArray = [];
  

    // hide create project form, return to home
    document.getElementById("create_project").style.display = "none";
  
    // Update the project list
    updateProjectList()
  }
}

// execute addProject function when button is clicked
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn').addEventListener('click', addProject);
});


