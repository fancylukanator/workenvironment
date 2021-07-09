// Initial call to create a project list
updateProjectList();

// Create a list element for each project in localStorage
function updateProjectList(){
    try{
        var projectList = document.getElementById("projectList");

        // Clear the current project list
        projectList.innerHTML = "";
    
        // Construct new project list
        projectData = JSON.parse(localStorage.MyProjectList);
        for(var i in projectData) {
            var entry = document.createElement('li');
            entry.id = "project-" + i;
            entry.index = i
            entry.onclick = function() {
                displayProject(this.index); // Send the index for the project to displayProject
            }
            entry.appendChild(document.createTextNode(projectData[i].name));
            projectList.appendChild(entry);
        }
    }
    catch(e){
        console.log(e);
    }

}

// Checks for when the new project button is clicked
document.getElementById('create_new_proj').addEventListener('click',(event) => {
    
    // Checks to see if the person is not already making a project
    if(document.getElementById("create_project").style.display != "block"){

        // Reset the tentative project
        document.forms[0].reset();

        urlArray = [];
        fileArray = [];
        appArray = [];

        updateTable(document.getElementById('urlList'), urlArray, "URLs")
        updateTable(document.getElementById('fileList'), urlArray, "Files")
        updateTable(document.getElementById('appList'), urlArray, "Apps")

        // Display the create project portal
        document.getElementById("create_project").style.display = "block";
        document.getElementById("display_project").style.display = "none";
    }
    // If the user is trying to close create a project
    else{
        document.getElementById("create_project").style.display = "none";
    }

    // Auto generate list of URLs from open chrome window
    const getChromeTabs = require('get-chrome-tabs');
    async function getTabs() {
        // get the data and wait for it to be loaded
        const tabData = await getChromeTabs();
        // display data in list on page
        var tabDataList = document.getElementById("tabDataList");
        // Clear the current url list
        tabDataList.innerHTML = "";
        // Construct new url list
        for(var i in tabData) {
            var entry = document.createElement('li');
            entry.id = "url-" + i;
            entry.index = i;
            entry.onclick = function() {
                addTabDataUrl(tabData[this.index].url); // Send the url to urlArray
            }
            entry.appendChild(document.createTextNode(tabData[i].url));
            tabDataList.appendChild(entry);
        }


    }
    // Run the above async function
    getTabs();
})




// Checks for when the TEST button is clicked
const psList = require('ps-list');
// get processes on before button
document.getElementById('before').addEventListener('click',(event) => {
    async function before() {
        psBeforeLaunch = await psList();
        // create array of all PID's
        pidBefore = [];
        for(var i in psBeforeLaunch) {
            pidBefore.push(psBeforeLaunch[i].pid);
        }
        console.log('received before processes');
        console.log(psBeforeLaunch)
        return pidBefore;
    }
    before();
})
// get processes on after button
document.getElementById('after').addEventListener('click',(event) => {
    async function after() {
        psAfterLaunch = await psList();
        // create array of all PID's
        pidAfter = [];
        for(var i in psAfterLaunch) {
            pidAfter.push(psAfterLaunch[i].pid);
        }
        console.log('received after processes');
        return pidAfter;
    }
    after();
})
// get the difference between before and after to close the 'new' process
var terminate = require('terminate');
document.getElementById('close').addEventListener('click',(event) => {
    console.log('b',pidBefore.length);
    console.log('a',pidAfter.length);
    var psNew = pidAfter.filter(function(obj) { return pidBefore.indexOf(obj) == -1; });
    console.log(psNew);
    for(var i in psNew) {
        try {
            terminate(psNew[i]);
            //console.log('terminated', psNew[i]);
        }catch(e) {
            console.log(e);
        }
    }
})
