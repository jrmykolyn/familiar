// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
const commit = require( './commit' );
const pull = require( './pull' );
const status = require( './status' );

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = {
    commit,
    pull,
    status
}
