// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
const colors = require( 'colors' );
const exec = require( 'child_process' ).exec;

colors.setTheme( {
    'error': 'red'
} );


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
} // /execP()


// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = {
    execP: execP
};
