// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );
const os = require( 'os' );
const StringDecoder = require('string_decoder').StringDecoder;

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const ROOT = `${__dirname}/../../../`;
const decoder = new StringDecoder( 'utf8' );

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
/// TODO[@jrmykolyn] - Move `.familiarrc` file name references into project settings/config.
function initGlobal() {
    fs.readFile( `${ROOT}/config/.familiarrc`, ( err, data ) => {
        if ( err ) {
            console.log( err );
            return;
        }

        fs.writeFile( `${os.homedir()}/.familiarrc`, decoder.write( data ), ( err, data ) => {
            if ( err ) {
                console.log( err );
                return;
            }

            console.log( `Added new 'Familiar' global config. file (".familiarrc") to the following directory; ${os.homedir()}` );
        } );
    } );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = initGlobal;
