// Initial call to create a project list
updateProjectList();

// highlight workspace if opened
highlightWorkspace();

// display correct buttons
mainButtons();



/*
// Checks for when the new project button is clicked
document.getElementById('create_new_proj').addEventListener('click', () => {
    loadCreateProject();
});

// Loads in the current workspace as the new workspace
async function loadCreateProject(){
    // Checks to see if the person is not already making a project
    if(document.getElementById("create_project").style.display != "block"){

        // Reset the tentative project
        document.forms[0].reset();

        urlArray = [];
        fileArray = [];
        fileAppsArray = [];
        appArray = [];
        defaultBrowser = "";

        await captureWorkspace();

        await updateTable(document.getElementById('urlList'), urlArray, "URLs")
        await updateTable(document.getElementById('fileList'), fileArray, "Files")
        await updateTable(document.getElementById('appList'), appArray, "Apps")

        // Display the create project portal
        document.getElementById("create_project").style.display = "block";
        document.getElementById("display_project").style.display = "none";

        // Detect which applications are installed...
        await getApps();
    }
    // If the user is trying to close create a project
    else{
        document.getElementById("create_project").style.display = "none";
    }
}

*/

async function getApps(){

    // Access the files in the application folder
    // Notes:
    // -> Could add in /System/Applications for Mac default apps
    // -> Could also further explore directories within /Applications folder
    var folder = "/Applications/"
    var fs = require('fs');
    var files = fs.readdirSync(folder);

    /*
    // Reset the checkbox html code
    appList = document.getElementById("checkboxes-apps");
    appList.innerHTML = "";

    // Add each of the .app files to the dropdown menu
    for(var i = 0; i < files.length; i++){
        if(files[i].endsWith(".app")){
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = files[i].slice(0, -4);
            checkbox.value = files[i].slice(0, -4);
            checkbox.onclick = function() {
                addApp(this.value);
            }
         
            var label = document.createElement('label')
            label.htmlFor = folder + files[i];
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(files[i].slice(0,-4)));
    
            appList.appendChild(label);
        }
    }
    */
}

// Display create content from tray request
ipc.on('create-workspace', () => {
    console.log('recieved request from main')
    loadCreateProject();
});