// Initialize arrays to store all we need
urlArray = [];
fileArray = [];
appArray = [];



// Adds new link to the URLS array...
document.getElementById('addurl').addEventListener('click', (event) => {
  // Prevent multiple button clicks
  event.preventDefault();
  // Gets the url
  let url = document.getElementById('url').value;
  // Ensure url is both unique and not null
  if(url != "" && !urlArray.includes(url)){
    urlArray.push(url);
    document.getElementById("url").value = ""; // clear the value
    console.warn('added', {urlArray} );
    updateTable(document.getElementById('urlList'), urlArray, "URLs")
  }
});



// Adds new files to the FILE array...
document.getElementById('addfile').addEventListener('change', (event) => {
  let files = document.getElementById('addfile').files;
  for(var i = 0; i < files.length; i++){
    // Ensure file is both unique and not null
    if(files[i].path != "" && !fileArray.includes(files[i].path)){
      fileArray.push(files[i].path);
      console.warn('added', {fileArray});
    }
  }
  updateTable(document.getElementById('fileList'), fileArray, "Files")
});



// Adds new apps to the APP array...
document.getElementById('addapp').addEventListener('change', (event) => {
  let apps = document.getElementById('addapp').files;

  for(var i = 0; i < apps.length; i++){
    // Ensure file is both unique and not null
    if(apps[i].path != "" && !appArray.includes(apps[i].path)){
      appArray.push(apps[i].path);
      console.warn('added', {appArray});
    }
  }
  updateTable(document.getElementById('appList'), appArray, "Apps")
});



// Function to display details of the project
function updateTable(table, array, type){

  // Reset the table
  table.innerHTML = "";

  // Add in the header to the table
  row = table.insertRow()
  var cell1 = row.insertCell();
  var cell2 = row.insertCell();
  cell1.innerHTML = type;
  cell2.innerHTML = "Delete";

  // Add contents to the table
  for(var i = 0; i < array.length; i++){
    row = table.insertRow()
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();

    // First cell contains the path
    cell1.innerHTML = array[i];

    // Second cell allows the item to be deleted from the temp project
    cell2.innerHTML = '<button type="button" id = "c2-del-' + type + '-' + i + '">X</button>';
    var del = document.getElementById("c2-del-" + type + "-" + i);
    del.id = "delete-" + type + "-" + i;
    del.index = i
    del.onclick = function() {
        deleteTempItem(type,this.index);
    }
  }
}



// Function to delete a temp item in a project to be created
function deleteTempItem(type,index){
  switch(type){
    case "URLs":
      urlArray.splice(index,1)
      updateTable(document.getElementById('urlList'), urlArray, "URLs")
      break;
    case "Files":
      fileArray.splice(index,1)
      updateTable(document.getElementById('fileList'), fileArray, "Files")
      break;
    case "Apps":
      appArray.splice(index,1)
      updateTable(document.getElementById('appList'), appArray, "Apps")
      break;
  }
}



// creates array of JSON objects containing project information...
// creates a project button
// hides form content when submitted

document.getElementById('created_proj').addEventListener('click', (ev) => {

  // Loads in current projects
  let projects = JSON.parse(localStorage.getItem('MyProjectList')) || [];

  ev.preventDefault();// stop form from submitting
  
  // Ensure that the project has a name and that the name is unique
  if(document.getElementById('wspace').value != "" && !projects.map(({ name }) => name).includes(document.getElementById('wspace').value)){
    
    let project = {
      name: document.getElementById('wspace').value, // Name of the project

      // Items contained within the project
      urls: urlArray.slice(),
      files: fileArray.slice(),
      apps: appArray.slice(),

      // Activation status of each of the items
      urls_active: new Array(urlArray.length).fill(1),
      files_active: new Array(fileArray.length).fill(1),
      apps_active: new Array(appArray.length).fill(1)
    }

    // Add the project and reset project creation portal
    projects.push(project);
    document.forms[0].reset();
    
    // Display
    console.warn('added', {projects} );
    
    // Save to localStorage
    localStorage.setItem('MyProjectList', JSON.stringify(projects));
  
    // Reset and clear all project creation stuff
    document.getElementById('urlList').innerHTML = "";
    document.getElementById('fileList').innerHTML = "";
    document.getElementById('appList').innerHTML = "";
    urlArray = [];
    fileArray = [];
    appArray = [];
  
    // Hide create project form, return to home
    document.getElementById("create_project").style.display = "none";
  
    // Update the project list
    updateProjectList()
  }
});


