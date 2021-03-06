export {};
// tslint:disable:no-var-requires
const fs = require('fs');
const { resolve } = require('path');
const nbt = require(resolve(__dirname, '../src/index'));

fs.readFile('bigtest.nbt.gz', (error: any, data: any) => {
  if (error) {
    throw error;
  }

  nbt.parse(data, (err: any, result: any) => {
    // tslint:disable:no-console
    console.log(err);
    console.log(result.value.stringTest);
    console.log(result.value['nested compound test']);
    console.log(nbt.simplify(result)['nested compound test']);
  });
});
