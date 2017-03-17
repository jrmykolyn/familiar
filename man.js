#! /usr/bin/env node


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
    default:
        console.log( 'Whoops! Looks like you ran the `familiar` command with missing or invalid arguments!' );
}
