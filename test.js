import { equal } from 'assert'

// WebAssembly can't be natively loaded yet; you
// have to read it into a buffer first and compile it
// in memory

// load the helper module
const webassembly = require('webassembly')

// with the helper module, load the WebAssembly 
webassembly
  .load('add.wasm')
  .then(module => {
    // once it's loaded, run some assertions to verify
    // that it's working as expected
    const add = module.exports.add
    equal(typeof add, 'function')
    equal(add(1, 1), 2);
  })
  .catch(error => {
    console.error(error)
  });
