// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
var helpers = require( '../helpers' );
var utils = require( '../../utils' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const { getCurrentCommitHash } = helpers;

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function pull( args, config ) {
    /// TODO[@jrmykolyn] - Update `vals` assignment to ensure that correct values are captured.
    let vals = args.filter( ( arg ) => { return ( typeof arg === 'string' && arg.charAt( 0 ) !== '-' ); } );
    let commandString = `git pull `;
    let hashes = [];

    commandString = `${commandString}${vals[0]} ${vals[1]}`;

    getCurrentCommitHash()
        .then(
            ( hash ) => { hashes.push( hash ); return hash; },
            ( err ) => { return ''; }
        )
        .then(
            ( hash ) => {
                return utils.execP( commandString )
                    .then(
                        ( data ) => { console.log( data ); return data; },
                        ( err ) => { throw new Error( err ); }
                    );
            }
        )
        .then(
            getCurrentCommitHash
        )
        .then(
            ( newHash ) => {
                hashes.push( newHash );

                let validHashes = hashes.filter( ( h ) => { return !!h; } );

                if ( validHashes.length && validHashes[ 0 ] !== validHashes[ 1 ] ) {
                    console.log( '`hashes` ARE BOTH UNIQUE AND VALID' ); /// TEMP
                    console.log( 'SCRAPE COMMIT MESSAGES FOR KEY WORDS/TERMS; PROMPT USER TO INSTALL/UPDATE PACKAGES.' ); /// TEMP

                    /// TODO[@jrmykolyn] - Update function to:
                    // - Extract date/timestamp from initial commit (eg. `hashes[ 0 ]`).
                    // - Print all commits *since* initial commit.
                    // - Check printed messages for presence of keywords (eg. 'npm', 'bower', etc.)
                    // - Prompt user to install/download additional packages.
                } else {
                    console.log( '`hashes` ARE EITHER: NOT UNIQUE; OR INVALID' ); /// TEMP
                }

                let hashSHA = hashes[ 0 ].substring( 0, 7 ); /// TEMP - Get substring from orig. hash.

                console.log( 'LOGGING OUT `hashSHA`' ); /// TEMP
                console.log( hashSHA ); /// TEMP
            },
            ( err ) => {
                console.log( ( err + '' ).error );
            }
        );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = pull;
