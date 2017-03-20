// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
var exec = require( 'child_process' ).exec;


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
            ( branchName ) => { console.log( branchName ); return branchName; },
            ( err ) => { console.log( err ); return ''; }
        )
        .then(
            ( branchName ) => {
                if ( branchName && config.commit.insertBranchName ) {
                    commandString += `"${branchName}${config.delimiter || ' - '}${vals[0]}"`;
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

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = {
    commit: commit
};
