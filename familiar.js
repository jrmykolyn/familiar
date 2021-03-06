#! /usr/bin/env node

// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const parseArgs = require( 'minimist' );

// Project
require( './lib/setup' );

const familiar = require( './lib/familiar' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const args = process.argv.slice( 2 ) || [];
const command = args[ 0 ];
const options = parseArgs( args.slice( 1 ) );

// --------------------------------------------------
// PARSE ARGS
// --------------------------------------------------
switch ( command in familiar ) {
    case true:
        familiar[ args[ 0 ] ]( options );

        break;
    default:
        console.log( 'Whoops! Looks like you ran the `familiar` command with missing or invalid arguments!'.error );
        console.log( 'Run `familiar help` to see a list of available commands/options.' );
}
