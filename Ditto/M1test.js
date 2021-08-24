var applescript = require('applescript');

function M1test () {

    var script = 'try \ntell application "Slack" to get path of documents \nend try';

    applescript.execString(script, function(err, rtn) {
        if (err) {
            console.log(err);// Something went wrong!
        }
        console.log(rtn);
    });

}

module.exports = { M1test };





