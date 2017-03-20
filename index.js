#! /usr/bin/env node


// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
var utils = require( './lib/utils' );
var main = require( './lib/main' );


// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const PACKAGE_NAME = 'Familiar';
const PACKAGE_COMMAND ='gitf';

const args = process.argv.slice( 2 ) || [];
const commandWhitelist = [ 'commit' ];
var config = null;


// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function parseArgs( args ) {
    let command = args[ 0 ];

    if ( !command ) {
        printCommandError( 'MISSING_COMMAND' );
        return; /// TEMP
    }

    if ( !validateCommand( command, commandWhitelist) ) {
        console.log( `Whoops! The \`${command}\` command is not currently supported by ${PACKAGE_NAME}.`.error );
        return; /// TEMP
        /// TODO[@jrmykolyn] - Implement 'fallthrough' to native Git command(s).
    }

    applyCommand( command, args.slice( 1 ) );
}

function validateCommand( command, whitelist ) {
    return whitelist.includes( command );
}

function applyCommand( command, args ) {
    /// TODO[@jrmykolyn] - Build out logic for applying command(s).
}

function printCommandError( errorType ) {
    errorType = errorType || '';

    switch ( errorType ) {
        case 'MISSING_COMMAND':
            console.log( `Whoops! Looks like you called \`${PACKAGE_COMMAND}\` without a command.`.error );

            break;
        default:
            console.log( 'Whoops! Something went wrong!'.error );
    }
}


// --------------------------------------------------
// INITIALIZE
// --------------------------------------------------
main.init()
    .then(
        ( data ) => {
            config = data;
            parseArgs( args );
        },
        ( err ) => { console.log( err ); }
    );
