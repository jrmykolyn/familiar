// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
var fs = require( 'fs' );
var os = require( 'os' );
var StringDecoder = require('string_decoder').StringDecoder;

// Vendor
var Promise = require( 'bluebird' );
var isJSON = require( 'is-json' );
var deepMerge = require( 'deepmerge' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var ROOT = `${__dirname}/../../`;
var LOCAL_CONFIG = 'familiar.config.js';
var GLOBAL_CONFIG = '.familiarrc';
var DEFAULT_CONFIG = require( `${ROOT}/config/familiar.config.js` );

var decoder = new StringDecoder( 'utf8' );

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function init() {
    return new Promise( ( resolve, reject ) => {
        loadConfig()
            .then(
                // ...
                ( configData ) => {
                    if ( configData instanceof Buffer ) {
                        configData = decoder.write( configData );
                    }

                    if ( isJSON( configData ) ) {
                        configData = JSON.parse( configData );
                    }

                    resolve( deepMerge( DEFAULT_CONFIG, configData ) );
                },
                // ...
                ( err ) => {
                    resolve( DEFAULT_CONFIG );
                }
            );
    } );
}

function loadConfig() {
    return new Promise( ( resolve, reject ) => {
        getLocalConfig()
            .then( resolve )
            .catch( getGlobalConfig )
            .then( resolve, reject )
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
        resolve( DEFAULT_CONFIG );
    } );
}

function find( dir, file, callback ) {
    fs.readFile( `${dir}/${file}`, ( err, data ) => {
        if ( err ) {
            if ( dir !== '/' ) {
                let newDir = dir.substring( 0, dir.lastIndexOf( '/' ) ) || '/';
                find( newDir, file, callback );
            } else {
                callback( new Error( 'THIS IS AN ERROR!' ) ); /// TODO[@jrmykolyn] - Update `callback` invocation to include useful error data/msg.
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
