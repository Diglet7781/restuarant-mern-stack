const prod = false;

if (!prod){
    module.exports = require('./dev.js');
}else{
    module.exports = require('./prod.js');
}
