// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
import test from 'ava';

// Project
import * as familiar from '../lib/familiar';

// --------------------------------------------------
// DEFINE TESTS
// --------------------------------------------------
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
