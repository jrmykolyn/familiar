// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
var fs = require( 'fs' );
var os = require( 'os' );
var StringDecoder = require('string_decoder').StringDecoder;

// Vendor
var Promise = require( 'bluebird' );


// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var LOCAL_CONFIG = 'familiar.config.js';
var GLOBAL_CONFIG = '.familiarrc';
var DEFAULT_CONFIG = LOCAL_CONFIG;

var decoder = new StringDecoder( 'utf8' );


// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function init() {
    return new Promise( ( resolve, reject ) => {
        loadConfig()
            .then(
                ( data ) => {
                    resolve( JSON.stringify( decoder.write( data ) ) );
                },
                ( err ) => {
                    console.log( 'Whoops! Something went very wrong!' );
                    reject( err );
                }
            );
    } );
}

function loadConfig() {
    return new Promise( ( resolve, reject ) => {
        getLocalConfig()
            .then( resolve )
            .catch( getGlobalConfig )
            .then( resolve )
            .catch( getDefaultConfig )
            .then( resolve, reject );
    } );
}

function getLocalConfig() {
    return new Promise( ( resolve, reject ) => {
        find( process.cwd(), LOCAL_CONFIG, ( data ) => {
            if ( data instanceof Error ) {
                reject( data );
            } else {
                resolve( data );
            }
        } );
    } );
}

function getGlobalConfig() {
    return new Promise( ( resolve, reject ) => {
        fs.readFile( `${os.homedir()}/${GLOBAL_CONFIG}`, ( err, data ) => {
            if ( err ) {
                reject( err );
            } else {
                resolve( data );
            }
        } );
    } );
}

function getDefaultConfig() {
    return new Promise( ( resolve, reject ) => {
        fs.readFile( `${__dirname}/${DEFAULT_CONFIG}`, ( err, data ) => {
            if ( err ) {
                reject( err );
            } else {
                resolve( data );
            }
        } );
    } );
}

function find( dir, file, callback ) {
    fs.readFile( `${dir}/${file}`, ( err, data ) => {
        if ( err ) {
            if ( dir !== '/' ) {
                let newDir = dir.substring( 0, dir.lastIndexOf( '/' ) ) || '/';
                find( newDir, file, callback );
            } else {
                callback( new Error( 'THIS IS AN ERROR!' ) );
            }
        } else {
            callback( data );
        }
    } );
}


// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = {
    init: init
};
