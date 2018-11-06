const Configstore = require('configstore');
const config = new Configstore('remote-deployer');

module.exports = {
    setKey: (key, value) => config.set(key, value),
    set: (obj) => config.set(obj),
    get: (key) => config.get(key),
    has: (key) => config.has(key),
    delete: (key) => config.delete(key),
    clear: () => config.clear(),
    path: () => config.path,
    all: () => config.all(),
    size: () => config.size()
}