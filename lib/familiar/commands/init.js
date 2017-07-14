// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );
const literati = require( 'sfco-literati' );
const StringDecoder = require('string_decoder').StringDecoder;

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const ROOT = `${__dirname}/../../../`;
const decoder = new StringDecoder( 'utf8' );

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
/// TODO[@jrmykolyn]
// - Add documentation to function.
function init( options ) {
    options = ( options && typeof options === 'object' ) ? options : {};

    let outDir = ( options.outDir && typeof options.outDir === 'string' ) ? options.outDir : process.cwd();

    return literati
        .read( `${ROOT}/config/familiar.config.js` )
        .then( ( buffer ) => {
            return decoder.write( buffer );
        } )
        .then( ( data ) => {
            return literati.write( `${outDir}/familiar.config.js`, decoder.write( data ) );
        } )
        .then( ( result ) => {
            if ( !options.silent ) {
                console.log( `Added new \`Familiar\` config. file to: ${outDir}.` );
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
