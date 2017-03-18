#! /usr/bin/env node


// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
var utils = require( './lib/utils' );
var main = require( './lib/main' );


// --------------------------------------------------
// INITIALIZE
// --------------------------------------------------
main.init()
    .then(
        ( data ) => { console.log( JSON.parse( data ) ); },
        ( err ) => { console.log( err ); }
    );
