// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
var exec = require( 'child_process' ).exec;

// Project
var utils = require( './utils' );


// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function commit( args, config ) {
    /// TODO[@jrmykolyn] - Update `vals` assignment to ensure that correct values are captured.
    let vals = args.filter( ( arg ) => { return ( typeof arg === 'string' && arg.charAt( 0 ) !== '-' ); } );
    let commandString = `git commit -m `;

    if ( !args.includes( '-m' ) ) {
        console.log( '`commit` command must be invoked with the `-m` flag.'.error );
    }

    getCurrentBranch()
        .then(
            ( branchName ) => { return branchName; },
            ( err ) => { return ''; }
        )
        .then(
            ( branchName ) => {
                if ( branchName
                    && config.commit.insertBranchName
                    && !config.commit.excludeBranches.includes( branchName )
                ) {
                    commandString += `"${branchName}${config.commit.delimiter}${vals[0]}"`;
                } else {
                    commandString += `"${vals[0]}"`;
                }

                exec( commandString, {}, ( err, stdout, stderr ) => {
                    /// TODO[@jrmykolyn] - Handle success/failure.

                    if ( err ) {
                        console.log( 'Whoops! Encountered an error.'.error );
                    }
                } );
            }
        );
}

function getCurrentBranch() {
    return new Promise( ( resolve, reject ) => {
        exec( 'git branch | grep "*"', {}, ( err, stdout, stderr ) => {
            let branchName = '';

            if ( err ) {
                reject( branchName );
            }

            // Sanitize/format `branchName`.
            branchName = ( stdout + '' ).substring( stdout.lastIndexOf( ' ' ) + 1 );
            branchName = branchName.replace( /(\n|\r)/gmi, '' );

            resolve(  branchName );
        } );
    } )
}

function getCurrentCommitHash() {
    return new Promise( ( resolve, reject ) => {
        utils.execP( 'git rev-parse HEAD' )
            .then(
                resolve,
                reject
            );
    } );
}

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
                } else {
                    console.log( '`hashes` ARE EITHER: NOT UNIQUE; OR INVALID' ); /// TEMP
                }
            },
            ( err ) => {
                console.log( ( err + '' ).error );
            }
        );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = {
    commit: commit,
    pull: pull
};
