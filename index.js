#! /usr/bin/env node

// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
require( './lib/setup' );

var main = require( './lib/main' );
var gitf = require( './lib/gitf' );

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

    applyCommand( command, args.slice( 1 ) );
}

function applyCommand( command, args ) {
    if ( command in gitf ) {
        gitf[ command ]( args, config );
    } else {
        console.log( `Whoops! The \`${command}\` command is not currently supported by ${PACKAGE_NAME}.`.error );
        /// TODO[@jrmykolyn] - Throw error or 'fallthrough' to native Git command.
    }
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
main.init().then(
    ( configData ) => {
        config = configData;

        parseArgs( args );
    },
    ( err ) => { console.log( err ); }
);
