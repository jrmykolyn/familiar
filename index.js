#! /usr/bin/env node


// --------------------------------------------------
// DECLARE MODULES
// --------------------------------------------------
// Project
var main = require( './lib/main' );


// --------------------------------------------------
// INITIALIZE
// --------------------------------------------------
main.init()
    .then(
        ( data ) => { console.log( JSON.parse( data ) ); },
        ( err ) => { console.log( err ); }
    );
