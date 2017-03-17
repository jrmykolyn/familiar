#! /usr/bin/env node

// DECLARE MODULES
var fs = require( 'fs' );
var os = require( 'os' );
var StringDecoder = require('string_decoder').StringDecoder;

var Promise = require( 'bluebird' );

// DECLARE VARS
var LOCAL_CONFIG = 'familiar.config.js';
var GLOBAL_CONFIG = '.familiarrc';
var DEFAULT_CONFIG = LOCAL_CONFIG;

const decoder = new StringDecoder( 'utf8' );

// DECLARE FUNCTIONS
function init() {
    loadConfig()
        .then(
            ( data ) => {
                console.log( decoder.write( data ) );
            },
            ( err ) => {
                console.log( 'Whoops! Something went very wrong!' );
            }
        );
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

// INITIALIZE
init();