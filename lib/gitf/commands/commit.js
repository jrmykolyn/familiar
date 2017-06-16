// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
var exec = require( 'child_process' ).exec;

// Project
var helpers = require( '../helpers' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const { getCurrentBranch } = helpers;

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
                    if ( err ) {
                        console.log( 'Whoops! Encountered an error.'.error );
                    }

                    console.log( stdout );
                } );
            }
        );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = commit;
