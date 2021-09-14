// Initialize arrays to store all we need
urlArray = [];
fileArray = [];
fileAppsArray = [];
appArray = [];
defaultBrowser = "";
tabTitleArray = [];


/*
// Adds new manual link to the URL array...
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
*/


// Adds new open URLs to the URL array...
function addURL(url){

  if(!urlArray.includes(url)){
    urlArray.push(url);
  }
  else{
    var index = urlArray.indexOf(url);
    if (index !== -1) {
      urlArray.splice(index, 1);
    }
  }
  updateTable(document.getElementById('urlList'), urlArray, "URLs")
}


/*
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
*/

/*
// Select applications from dropdown menu
var expandedApps = false;
document.getElementById("selectApps").addEventListener('click', (event) => {
  var checkboxes = document.getElementById("checkboxes-apps");
  if (!expandedApps) {
    checkboxes.style.display = "block";
    expandedApps = true;
  } else {
    checkboxes.style.display = "none";
    expandedApps = false;
  }
});
*/


// Adds new apps to the APP array...
function addApp(path){

  if(!appArray.includes(path)){
    appArray.push(path);
  }
  else{
    var index = appArray.indexOf(path);
    if (index !== -1) {
      appArray.splice(index, 1);
    }
  }
  updateTable(document.getElementById('appList'), appArray, "Apps")
}



// Function to display details of the project
async function updateTable(table, array, type){

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
      try {
        document.getElementById(urlArray[index]).checked = false;
      } catch (error) {
        console.log(error)
      }
      urlArray.splice(index,1)
      updateTable(document.getElementById('urlList'), urlArray, "URLs")
      break;
    case "Files":
      fileArray.splice(index,1)
      fileAppsArray.splice(index,1)
      updateTable(document.getElementById('fileList'), fileArray, "Files")
      break;
    case "Apps":
      try {
        document.getElementById(appArray[index]).checked = false;
      } catch (error) {
        console.log(error)
      }
      appArray.splice(index,1)
      updateTable(document.getElementById('appList'), appArray, "Apps")
      break;
  }
}



// creates array of JSON objects containing project information...
// creates a project button
// hides form content when submitted

document.getElementById('create_new_proj').addEventListener('click', () => {
  loadCreateProject();
  // Display correct buttons
});

async function loadCreateProject() {

  // Unselect project from list
  if(document.getElementById("projectName").textContent != ""){
    document.getElementById(document.getElementById("projectName").textContent).classList.remove('selectedProject');
  }
  
  // Hide the previously displayed project
  document.getElementById("display_project").style.display = "none";
  document.getElementById("default-home").style.display = "none";

  // Display to the user that the workspace is being loaded
  document.getElementById("loading").style.display = "block"
  document.getElementById("detecting_app").innerHTML = "Initializing capture...";

  urlArray = [];
  fileArray = [];
  fileAppsArray = [];
  appArray = [];
  defaultBrowser = "";

  // Ensures that the new project has an unique name
  counter = 1;
  while(localStorage.getItem("Workspace " + counter) != null){
    counter = counter + 1;
  }
  workspaceName = "Workspace " + counter;

  await captureWorkspace();

  // Sets the current workspace to the current one
  localStorage.setItem('openedWorkspace', workspaceName)

  // Sets the selected workspace to the current one
  localStorage.setItem('selectedWorkspace', workspaceName)

  // Updates the icon tray title
  ipc.send('update-title-tray-window-event', workspaceName);

  // save project to localStorage
  saveWorkspace(urlArray, urlTitleArray, defaultBrowser, fileArray, fileAppsArray, appArray, workspaceName);
  
  // Hide the loading display
  document.getElementById("loading").style.display = "none"

  // Update the project list
  updateProjectList()

  // Open up the newly created project
  displayProject(workspaceName)

  // Load correct buttons
  mainButtons()

  // Select the workspace name to be renamed
  node = document.getElementById("projectName")

  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);

  workspacesIntro();

};
