// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const ROOT = `${__dirname}/../../../`;
const package = require( `${ROOT}/package.json` );

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
/**
 * Function logs out the current package version.
 */
function version() {
    console.log( package.version || 'Whoops! Couldn\'t retrieve the version.'.error );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = version;
