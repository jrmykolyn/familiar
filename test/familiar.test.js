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
    del( [ `${__dirname}/tmp/*`, `${__dirname}/tmp/.[^.]*`, `!${__dirname}/tmp/README.md` ] );
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
    t.plan( 2 );

    // Write file(s) to `./tmp/` dir.
    let globalConfigResult = await familiar[ 'init' ]( { global: true, outDir: `${__dirname}/tmp` } );
    let localConfigResult = await familiar[ 'init' ]( { outDir: `${__dirname}/tmp` } );

    t.true( globalConfigResult );
    t.true( localConfigResult );
} );
