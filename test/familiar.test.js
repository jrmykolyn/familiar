// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
import test from 'ava';
import del from 'del';

// Project
import * as familiar from '../lib/familiar';

// --------------------------------------------------
// DEFINE TESTS
// --------------------------------------------------
test.after( () => {
    del( [ `${__dirname}/tmp/*`, `!${__dirname}/tmp/README.md` ] );
} );

test( 'Testing `familiar[ "-v" ]()`', ( t ) => {
    let semverPattern = /([A-z0-9]\.?){3}/gmi;
    let version = familiar[ '-v' ]( { silent: true } );

    t.truthy( version.match( semverPattern ) );
} );

test( 'Testing `familiar[ "--version" ]()`', ( t ) => {
    let semverPattern = /([A-z0-9]\.?){3}/gmi;
    let version = familiar[ '--version' ]( { silent: true } );

    t.truthy( version.match( semverPattern ) );
} );

test( 'Testing `familiar[ "init" ]()`', async ( t ) => {
    // Write file to `./tmp/` dir.
    let result = await familiar[ 'init' ]( { outDir: `${__dirname}/tmp` } );

    t.true( result );
} );
