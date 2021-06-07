const merge = require('copy-to');

merge(require('./news'))
.and(require('./nomenklator'))
.and(require('./orders'))
.and(require('./users'))
.and(require('./stocktakings'))
.to(module.exports);
