import test from 'ava';

// NOTE:
// - Contents of file represent a sanity check.

test( 'Force pass', ( t ) => {
    t.pass();
} );

test( 'True', ( t ) => {
    t.true( true );
} );

test( 'False', ( t ) => {
    t.false( false );
} );

test( 'Truthy', ( t ) => {
    t.truthy( 1 );
} );

test( 'Falsy', ( t ) => {
    t.falsy( '' )
} );

test( '1 === 1', ( t ) => {
    t.is( 1, 1 );
} );

test( 'true != false', ( t ) => {
    t.not( true, false );
} );
