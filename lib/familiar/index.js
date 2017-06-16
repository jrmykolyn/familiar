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
    'init-global': commands.initGlobal,
    'summon': commands.init
};
