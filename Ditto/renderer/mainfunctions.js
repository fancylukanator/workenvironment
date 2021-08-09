// FUNCTION THAT TAKES TABS, DOCUMENTS, APPS, NAME AND SAVES A WORKSPACE IN LOCALSTORAGE
function saveWorkspace(tabs, documents, apps, workspaceName) {
    // create project object
    let project = {
        name: workspaceName, // Name of the project
  
        // Items contained within the project
        urls: tabs,
        files: documents,
        apps: apps,
  
        // Activation status of each of the items
        urls_active: new Array(urlArray.length).fill(1),
        files_active: new Array(fileArray.length).fill(1),
        apps_active: new Array(appArray.length).fill(1)
      }

    // Display
    console.warn('added', {project} );
    
    // Save to localStorage
    localStorage.setItem(workspaceName, JSON.stringify(project));
}



// FUNCTION THAT CREATES A LIST ELEMENT FOR EACH WORKSPACE IN LOCALSTORAGE
function updateProjectList(){
    try{
        var projectList = document.getElementById("projectList");

        // Clear the current project list
        projectList.innerHTML = "";
    
        // Construct new project list
        projectData = Object.keys(localStorage);
        for(var i in projectData) {
            var entry = document.createElement('li');
            entry.id = "project-" + i;
            entry.index = projectData[i]
            entry.onclick = function() {
                displayProject(this.index); // Send the index for the project to displayProject
            }
            entry.appendChild(document.createTextNode(projectData[i]));
            projectList.appendChild(entry);
        }
    }
    catch(e){
        console.log(e);
    }
}



// FUNCTION TO DISPLAY THE DETAILS OF A WORKSPACE
function displayProject(index) {


    // Clear out the apps and urls from create_project
    appList = document.getElementById("checkboxes-apps");
    appList.innerHTML = "";
    var tabList = document.getElementById("checkboxes-urls");
    tabList.innerHTML = "";

    // If the user is already previewing the project they clicked on... hide the project
    if(document.getElementById("projectName").index == index && document.getElementById("display_project").style.display == "block"){
        document.getElementById("display_project").style.display = "none";
    }
    // If the user wants to view a new project...
    else{
        // Get project data of interest
        projectData = JSON.parse(localStorage.getItem(index));

        // Set the name of the project and its index in storage
        document.getElementById("projectName").textContent = index;
        document.getElementById("projectName").index = index

        // List out all of the URLs
        detailsTable(document.getElementById("projectURLs"),projectData.urls,projectData.urls_active,"URLs")

        // List out all of the files
        detailsTable(document.getElementById("projectFiles"),projectData.files,projectData.files_active,"Files")

        // List all of the applications
        detailsTable(document.getElementById("projectApps"),projectData.apps,projectData.apps_active,"Apps")

        document.getElementById("display_project").style.display = "block";
        document.getElementById("create_project").style.display = "none";
    }
}


// FUNTION TO DISPLAY THE DETAILS OF A WORKSPACE
function detailsTable(table, array, active, type){

    // Reset the table
    table.innerHTML = "";

    // Add in the header to the table
    row = table.insertRow()
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    cell1.innerHTML = type;
    cell2.innerHTML = ""; //"Selected";
    cell3.innerHTML = ""; //"Delete";

    // Add contents to the table
    for(var i = 0; i < array.length; i++){
      row = table.insertRow()
      var cell1 = row.insertCell();
      var cell2 = row.insertCell();
      var cell3 = row.insertCell();

      // First cell contains the path
      cell1.innerHTML = array[i];

      // Second cell contains ability to toggle activation
      cell2.innerHTML = '<input type="checkbox" id = "c2-' + type + '-' + i + '"/>';
      var cb = document.getElementById("c2-" + type + "-" + i);
      cb.id = "checkbox-" + type + "-" + i;
      cb.index = i
      cb.onclick = function() {
          activate(type,this.index);
      }
      if(active[i]){
          cb.checked = true; // Sets the check box to be on if previously active
      }

      // Third cell allows the item to be deleted from the project
      cell3.innerHTML = '<button type="button" id = "c3-' + type + '-' + i + '">x</button>';
      var del = document.getElementById("c3-" + type + "-" + i);
      del.id = "delete-" + type + "-" + i;
      del.index = i
      del.onclick = function() {
          deleteItem(type,this.index);
      }
    }

    // Final row to add additional stuff
    row = table.insertRow()
    var cell1 = row.insertCell();
    
    // Set type specific input options
    switch(type){
        case "URLs":
            cell1.innerHTML = '<input type="text" id="select-new-url"><button type="button" id = "add-new-url">Add</button><button type="button" id = "new-captured-urls">Capture</button>';
            var add = document.getElementById("add-new-url");
            add.onclick = function() {
                addToWorkspace("URL");
            }
            var capture = document.getElementById("new-captured-urls");
            capture.onclick = function() {
                addToWorkspace(type);
            }
            break;
        case "Files":
            cell1.innerHTML = '<input type="file" multiple id="select-new-files">';
            var add = document.getElementById("select-new-files");
            add.onchange = function() {
                addToWorkspace(type);
            }
            break;
        case "Apps":
            cell1.innerHTML = '<form><div class="multiselect"><div class="selectBox" id = "select-new-apps"><select><option>Select Applications...</option></select><div class="overSelect"></div></div><div id="checkboxes-apps-display"></div></div></form>';
            var dropdown = document.getElementById("select-new-apps");
            dropdown.onclick = function(){
                dropdownApps();
                console.log("Dropdown")
            }
            displayApps(array);
            break;
    }
}


// FUNCTION TO TOGGLE IF AN ITEM WILL BE LAUNCHED
function activate(type,index){

    // Get the index of the project
    p_index = document.getElementById("projectName").index

    // Snag the project to be editted
    var project = JSON.parse(localStorage.getItem(p_index))
    
    // Toggles the activation of the requested item
    switch(type){
        case "URLs":
            project.urls_active[index] = (project.urls_active[index] == 0 ? 1 : 0);
            break;
        case "Files":
            project.files_active[index] = (project.files_active[index] == 0 ? 1 : 0);
            break;
        case "Apps":
            project.apps_active[index] = (project.apps_active[index] == 0 ? 1 : 0);
            break;
    }

    // Update the project key
    localStorage.setItem(p_index, JSON.stringify(project))
}


// FUNCTION TO DELETE A FILE/LINK/APP FROM A WORKSPACE
function deleteItem(type, index){

    // Get the index of the project
    p_index = document.getElementById("projectName").index

    // Snag the project to be editted
    var project = JSON.parse(localStorage.getItem(p_index))
    
    // Removes the item and its active status
    switch(type){
        case "URLs":
            project.urls.splice(index,1)
            project.urls_active.splice(index,1)
            break;
        case "Files":
            project.files.splice(index,1)
            project.files_active.splice(index,1)
            break;
        case "Apps":
            try {
                document.getElementById(project.apps[index]).checked = false;
              } catch (error) {
                console.log(error)
              }
            console.log(project.apps[index])
            project.apps.splice(index,1)
            project.apps_active.splice(index,1)
            break;
    }


    // Update project key
    localStorage.setItem(p_index, JSON.stringify(project))

    // Reload the project display
    document.getElementById("display_project").style.display = "none";
    displayProject(p_index)
}



// FUNCTION TO DELETE A WORKSPACE
function deleteWorkspace(workspaceName) {
    localStorage.removeItem(workspaceName)
}



// FUNCTION TO ADD STUFF TO A WORKSPACE
async function addToWorkspace(type){

    // Get the index of the project
    p_index = document.getElementById("projectName").index

    // Snag the project to be editted
    var project = JSON.parse(localStorage.getItem(p_index))
    
    // Add the new item to the array
    switch(type){
        case "URL":
            let url = document.getElementById('select-new-url').value;
            if(url != "" && !project.urls.includes(url)){
                project.urls.push(url)
                project.urls_active.push(1)
            }
            break;
        case "URLs":
            var tabData = await captureURLs();
            for(var i = 0; i < tabData.length; i++){
                console.log(tabData[i].url)
                if(tabData[i].url != "" && !project.urls.includes(tabData[i].url)){
                    project.urls.push(tabData[i].url)
                    project.urls_active.push(1)
                }
            }    
            break;
        case "Files":
            let files = document.getElementById('select-new-files').files;
            for(var i = 0; i < files.length; i++){
                if(files[i].path != "" && !project.files.includes(files[i].path)){
                    project.files.push(files[i].path)
                    project.files_active.push(1)
                }
            }
            break;
        case "Apps":
            var app = document.getElementById(latest_app);
            console.log(latest_app)
            if(!app.checked){
                console.log("DELETED FROM LIST")
                deleteItem(type,project.apps.indexOf(latest_app))
                return;
            }
            else{
                project.apps.push(latest_app)
                project.apps_active.push(1)
            }
            break;
    }

    // Update the project key
    localStorage.setItem(p_index, JSON.stringify(project))

    // Reload the project display
    document.getElementById("display_project").style.display = "none";
    displayProject(p_index)
}


// FUNTION TO LAUNCH A PROJECT
function openWorkspace(workspaceName) {

    // Get project data of interest
    project = JSON.parse(localStorage.getItem(workspaceName));

    // Hide the project
    document.getElementById("display_project").style.display = "none";

    // Open all of the active urls
    for(var j in project.urls){
        if(project.urls_active[j]){
            shell.openExternal(project.urls[j]);
        }
    }
    // Open all of the active files
    for(var k in project.files) {
        if(project.files_active[k]){
            shell.openPath(project.files[k]);
        }
    }
    // Open all of the active applications
    for(var l in project.apps) {
        if(project.apps_active[l]){
            shell.openPath(project.apps[l]);
        }
    }
}



// FUNCTION TO CAPTURE WORKSPACE
async function captureWorkspace() {
        // Initializes arrays to store the open apps, tabs, and documents
        let apps = [];
        let tabs = [];
        let documents = [];
      
        // Array to keep track of what app should be used to open each document
        let documentApps = [];
      
        // Variable to store the web browser
        let webBrowser;
      
        // Detect applications that are open
        detectApps = await execShPromise('osascript -e \'tell application "System Events" to get the name of every process whose background only is false\'', true);
        openApps = parseText(String(detectApps.stdout));
      
      
      
        // SECTION FOR WHICH APPS TO IGNORE IN THE CAPTURE
      
        // Ignore ditto
        var index = openApps.indexOf("ditto");
        if (index !== -1) {
          openApps.splice(index, 1);
        }
      
        // Ignore Finder
        var index = openApps.indexOf("Finder");
        if (index !== -1) {
          openApps.splice(index, 1);
        }
      
      
      
        // SECTION TO RENAME SPECIFIC APPS IN THE CAPTURE
      
        // Quick fix for Adobe Reader
        var index = openApps.indexOf("AdobeReader");
        if (index !== -1) {
          openApps.splice(index, 1, "Adobe Acrobat Reader DC");
        }
      
        // Visual Studio Code displays as 'Electron' for whatever reason
        var index = openApps.indexOf("Electron");
        if (index !== -1) {
          openApps.splice(index, 1, "Visual Studio Code");
        }
      
      
        // Loop through all of the open apps to see if they have open documents or tabs
        for(var i = 0; i < openApps.length; i++){
      
          // Different cases for specific apps
          switch(openApps[i]){
      
            // All browsers are treated the same
            case "Safari":
            case "Google Chrome":
            case "Firefox":
            case "Brave":
            case "Opera":
            case "Chromium":
      
              // Collect the open tabs
              detectTabs = await execShPromise('osascript -e \'try \ntell application "' + openApps[i] + '" to get URL of tabs of windows \nend try\'', true);
              openTabs = parseText(String(detectTabs.stdout));
              tabs = tabs.concat(openTabs)
      
              // Set the default browser
              if(openTabs.length > 0){
                webBrowser = openApps[i]
              }
      
              // Adds browser to list of apps if no tabs are open
              if(openTabs.length == 0){
                apps.push(openApps[i]);
              }
      
              break;
            
            // Special case for finding MS PowerPoint files
            case "Microsoft PowerPoint":
              detectDocPaths = await execShPromise('osascript -e \'try \ntell application "' + openApps[i] + '" to get path of presentations \nend try\'', true);
              detectDocNames = await execShPromise('osascript -e \'try \ntell application "' + openApps[i] + '" to get name of presentations \nend try\'', true);
              findFiles(openApps[i], apps, documents, documentApps, detectDocPaths, detectDocNames)
              break;
      
            // Special case for finding Adobe Reader files
            case "Adobe Acrobat Reader DC":
              detectDocPaths = await execShPromise('osascript -e \'try \ntell application "' + openApps[i] + '" to get file alias of documents \nend try\'', true);
              detectDocNames = await execShPromise('osascript -e \'try \ntell application "' + openApps[i] + '" to get name of documents \nend try\'', true);
              findFiles(openApps[i], apps, documents, documentApps, detectDocPaths, detectDocNames)
              break;
      
            // If the app has no special case run the default
            default:
              detectDocPaths = await execShPromise('osascript -e \'try \ntell application "' + openApps[i] + '" to get path of documents \nend try\'', true);
              detectDocNames = await execShPromise('osascript -e \'try \ntell application "' + openApps[i] + '" to get name of documents \nend try\'', true);
              findFiles(openApps[i], apps, documents, documentApps, detectDocPaths, detectDocNames)
              break;
          }
        }
    
        urlArray = tabs;
        fileArray = documents;
        fileAppsArray = documentApps;
        appArray = apps;
        defaultBrowser = webBrowser;
}




// FUNCTION TO BREAKDOWN COMMA/SPACE DELIMITED TEXT INTO ARRAY
function parseText(text){

    // Removes text for formatting
    text = text.replace('\n','');
    text = text.replace('alias Macintosh HD','')
    text = text.replace('Macintosh HD','')
  
    // Replaces : with / for propper formatting
    if(!text.includes('/')){
      text = text.replaceAll(':','/');
    }
  
    // Transform delimited text into array
    var array = text.split(', ');
  
    // Remove an empty indices
    var index = array.indexOf('');
    if (index !== -1) {
      array.splice(index, 1);
    }
  
    // Remove unknown elements
    var index = array.indexOf('missing value');
    if (index !== -1) {
      array.splice(index, 1);
    }
    return array;
}


// FUNCTION TO LOCATE OPEN DOCUMENTS WITHIN APPS
function findFiles(app, apps, documents, documentApps, detectDocPaths, detectDocNames){
  
    // Parses the text into an array
    docPaths = parseText(String(detectDocPaths.stdout));
    docNames = parseText(String(detectDocNames.stdout));
  
    // Loops through each file/document within an app
    for(var j = 0; j < docPaths.length; j++){
  
      // Keep track of what app is used to open each document
      documentApps.push(app);
  
      // Adds the full path name of any open documents
      if(docPaths[j].includes(docNames[j])){
        documents.push(docPaths[j]);
      }
      else{
        documents.push(docPaths[j] + "/" + docNames[j]);
      }
    }
  
    // Adds the app to the list of apps if it has no documents opened in it
    if(docPaths.length == 0){
      apps.push(app);
    }
}