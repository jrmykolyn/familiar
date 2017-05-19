// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const exec = require( 'child_process' ).exec;

// Vendor
const Promise = require( 'bluebird' );

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function execP( command ) {
    return new Promise( ( resolve, reject ) => {
        exec( command, {}, ( err, stdout, stderr ) => {
            if ( err ) {
                reject( err );
            }

            resolve( stdout );
        } );
    } );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = execP;
