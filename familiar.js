#! /usr/bin/env node

// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
require( './lib/setup' );

const familiarCommands = require( './lib/familiar-commands' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const args = process.argv.slice( 2 ) || [];
const command = args[ 0 ];

// --------------------------------------------------
// PARSE ARGS
// --------------------------------------------------
switch ( command in familiarCommands ) {
    case true:
        familiarCommands[ args[ 0 ] ]( args.slice( 1 ) );

        break;
    default:
        console.log( 'Whoops! Looks like you ran the `familiar` command with missing or invalid arguments!'.error );
        console.log( 'Run `familiar help` to see a list of available commands/options.' );
}
