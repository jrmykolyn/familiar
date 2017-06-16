// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
var exec = require( 'child_process' ).exec;

// Vendor
var Promise = require( 'bluebird' );

// Project
var utils = require( '../../utils' )

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
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

            resolve( branchName );
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

/// TODO[@jrmykolyn] - Build out method.
function getCommitDate( commit ) {
    return new Promise( ( resolve, reject ) => {
        utils.execP( '' ).then( resolve, reject );
    } );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = {
    getCommitDate,
    getCurrentBranch,
    getCurrentCommitHash
};
