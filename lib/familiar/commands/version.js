// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const ROOT = `${__dirname}/../../../`;
const package = require( `${ROOT}/package.json` );

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
/**
 * Function exposes the current package version.
 *
 * By default, function logs out and returns the current version.
 *
 * If invoked with an `options` object containing a truthy `silent` key, the console log will be supressed.
 *
 * @param {Object} options
 * @return {string|null}
 */
function version( options ) {
    options = ( options && typeof options === 'object' ) ? options : {};

    let version = package.version || null;

    if ( !options.silent ) {
        console.log( version || 'Whoops! Couldn\'t retrieve the version.'.error );
    }

    return version;
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = version;
