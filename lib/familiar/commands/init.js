// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );
const os = require( 'os' );
const literati = require( 'sfco-literati' );
const StringDecoder = require('string_decoder').StringDecoder;

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const ROOT = `${__dirname}/../../../`;
const CONFIG = `${ROOT}/config`;
const decoder = new StringDecoder( 'utf8' );

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
/// TODO[@jrmykolyn]
// - Add documentation to function.
function init( options ) {
    options = ( options && typeof options === 'object' ) ? options : {};

    let srcFile = ( options.global ) ? '.familiarrc' : 'familiar.config.js';
    let outDir = ( options.outDir && typeof options.outDir === 'string' ) ? options.outDir : ( options.global ) ? os.homedir() : process.cwd();

    return literati
        .read( `${CONFIG}/${srcFile}` )
        .then( ( buffer ) => {
            return decoder.write( buffer );
        } )
        .then( ( data ) => {
            return literati.write( `${outDir}/${srcFile}`, decoder.write( data ) );
        } )
        .then( ( result ) => {
            if ( !options.silent ) {
                console.log( `Added new ${srcFile} file to: ${outDir}.` );
            }

            return result;
        } )
        .catch( ( err ) => {
            if ( !options.silent ) {
                console.log( err );
            }

            return err;
        } );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = init;
