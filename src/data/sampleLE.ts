export {};
// tslint:disable:no-var-requires
const fs = require('fs');
const { resolve } = require('path');
const nbt = require(resolve(__dirname, '../index'));

fs.readFile('level.dat', (error: any, data: any) => {
  if (error) {
    throw error;
  }

  nbt.parse(data, true, (err: any, result: any) => {
    // tslint:disable:no-console
    console.log(err);
    console.log(JSON.stringify(result, null, 2));
  });
});
