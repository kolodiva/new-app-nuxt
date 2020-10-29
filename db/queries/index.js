const merge = require('copy-to');

merge(require('./news'))
.and(require('./nomenklator'))
.and(require('./connections'))
.and(require('./orders'))
.to(module.exports);
