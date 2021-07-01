// Adds new link to the URLS array...
urlArray = [];
document.getElementById('url').addEventListener('change', (event) => {
  let url = document.getElementById('url').value;
  urlArray.push(url);
  document.getElementById("url").value = ""; // clear the value
  console.warn('added', {urlArray} );
});

// Adds new files to the FILE array...
fileArray = [];
document.getElementById('addfile').addEventListener('change', (event) => {
  let file = document.getElementById('addfile').value;
  fileArray.push(file);
  console.warn('added', {fileArray} );
});

// Adds new apps to the APP array...
appArray = [];
document.getElementById('addapp').addEventListener('change', (event) => {
  let app = document.getElementById('addapp').value;
  appArray.push(app);
  console.warn('added', {appArray} );
});




// creates array of JSON objects containing project information...
let projects = [];
// example {name: 'project1', }
const addProject = (ev) => {
  ev.preventDefault();      // stop form from submitting
  //get table content
  let project = {
    name: document.getElementById('wspace').value,
    urls: urlArray,
    files: fileArray,
    apps: appArray
  }
  projects.push(project);
  document.forms[0].reset();
  
  //display
  console.warn('added', {projects} );
  
  // save to localStorage
  localStorage.setItem('MyProjectList', JSON.stringify(projects));

  // create button on home page for project
  var btn = document.createElement("button");
  // name the btn
  btn.innerHTML = project.name; 
  // choose where to place the btn
  var myDiv = document.getElementById("projBtn");
  myDiv.appendChild(btn);


  // hide create project form, return to home
  document.getElementById("create_project").style.display = "none";
}

// execute addProject function when button is clicked
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn').addEventListener('click', addProject);
});

