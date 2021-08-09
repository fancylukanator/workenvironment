// Initial call to create a project list
updateProjectList();






// Checks for when the new project button is clicked
document.getElementById('create_new_proj').addEventListener('click', async => {
    
    // Checks to see if the person is not already making a project
    if(document.getElementById("create_project").style.display != "block"){

        // Reset the tentative project
        document.forms[0].reset();

        urlArray = [];
        fileArray = [];
        fileAppsArray = [];
        appArray = [];
        defaultBrowser = "";

        captureWorkspace();

        updateTable(document.getElementById('urlList'), urlArray, "URLs")
        updateTable(document.getElementById('fileList'), urlArray, "Files")
        updateTable(document.getElementById('appList'), urlArray, "Apps")

        // Display the create project portal
        document.getElementById("create_project").style.display = "block";
        document.getElementById("display_project").style.display = "none";

        // Run the above async function
        getTabs();

        // Detect which applications are installed...
        getApps();
    }
    // If the user is trying to close create a project
    else{
        document.getElementById("create_project").style.display = "none";
    }

})



async function getTabs() {
    // Auto generate list of URLs from open chrome window
    const getChromeTabs = require('get-chrome-tabs');
    // get the data and wait for it to be loaded
    const tabData = await getChromeTabs();
    // display data in list on page
    var tabList = document.getElementById("checkboxes-urls");
    // Clear the current url list
    tabList.innerHTML = "";
    // Construct new url list
    for(var i = 0; i < tabData.length; i++) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = tabData[i].url;
        checkbox.value = tabData[i].url;
        checkbox.onclick = function(){
            addURL(this.value);
        }
         
        var label = document.createElement('label')
        label.htmlFor = tabData[i].url;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(tabData[i].title)); // Display url with: tabData[i].url
    
        tabList.appendChild(label);
    }
}



function getApps(){

    // Access the files in the application folder
    // Notes:
    // -> Could add in /System/Applications for Mac default apps
    // -> Could also further explore directories within /Applications folder
    var folder = "/Applications/"
    var fs = require('fs');
    var files = fs.readdirSync(folder);

    // Reset the checkbox html code
    appList = document.getElementById("checkboxes-apps");
    appList.innerHTML = "";

    // Add each of the .app files to the dropdown menu
    for(var i = 0; i < files.length; i++){
        if(files[i].endsWith(".app")){
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = folder + files[i];
            checkbox.value = folder + files[i];
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
}