var applescript = require('applescript');

function M1test () {

    const result = applescript.execString('return "unicorn"');

    console.log(result);
    //=> 'unicorn'
}

module.exports = { M1test };





