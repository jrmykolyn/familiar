#! /usr/bin/env node


// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
var utils = require( './lib/utils' );
var main = require( './lib/main' );
var commands = require( './lib/commands' );


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
    if ( command in commands ) {
        commands[ command ]( args, JSON.parse( config ) ); /// FIXME[@jrmykolyn] - Should not have to pass `config` into `JSON.parse()` here...`
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
main.init()
    .then(
        ( data ) => {
            config = JSON.parse( data );
            parseArgs( args );
        },
        ( err ) => { console.log( err ); }
    );
