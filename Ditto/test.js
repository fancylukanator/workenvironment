const execShPromise = require("exec-sh").promise;

async function myTest(){
    test = await execShPromise('osascript ./appleScripts/getDocPaths.scpt ' + "Slack", true);
    return test;
}

myvar = myTest();

console.log(myvar)