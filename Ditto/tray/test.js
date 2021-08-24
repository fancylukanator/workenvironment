
runAppleScript = require('run-applescript')
const result = runAppleScript('return "unicorn"');

console.log(result);
//=> 'unicorn'