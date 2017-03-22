// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );
const StringDecoder = require('string_decoder').StringDecoder;


// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const ROOT = `${__dirname}/..`;
const package = require( '../package.json' );
const decoder = new StringDecoder( 'utf8' );


// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function help() {
    console.log( 'COMING SOON!');
}

/// TODO[@jrmykolyn]
// - Add documentation to function.
// - Update function body to use chained read/write methods.
function summon() {
    fs.readFile( `${ROOT}/config/familiar.config.js`, ( err, data ) => {
        if ( err ) {
            console.log( err );
            return;
        }

        fs.writeFile( `${process.cwd()}/familiar.config.js`, decoder.write( data ), ( err, data ) => {
            if ( err ) {
                console.log( err );
                return;
            }

            console.log( 'Added new `Familiar` config. file in current working directory.' );
        } );
    } );
}


// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = {
    '-v': () => {
        console.log( 'MATCHED `-v`' );
    },
    '--version': () => {
        console.log( 'MATCHED `--version`' );
    },
    'help': help,
    'init': summon,
    'summon': summon
};