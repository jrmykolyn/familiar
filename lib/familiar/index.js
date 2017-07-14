// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
const commands = require( './commands' );

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = {
    '-v': commands.version,
    '--version': commands.version,
    'help': commands.help,
    'init': commands.init,
    'summon': commands.init
};
