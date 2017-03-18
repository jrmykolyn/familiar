#! /usr/bin/env node


// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
const utils = require( './lib/utils' );


// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const package = require( './package.json' );
const args = process.argv.slice( 2 ) || [];


// --------------------------------------------------
// PARSE ARGS
// --------------------------------------------------
switch ( args[ 0 ] ) {
    case '-v':
    case '--version':
        console.log( package.version );

        break;
    case 'help':
        console.log( 'COMING SOON!');

        break;
    default:
        console.log( 'Whoops! Looks like you ran the `familiar` command with missing or invalid arguments!'.error );
        console.log( 'Run `familiar help` to see a list of available commands/options.' );
}
