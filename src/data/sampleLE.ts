export {};
const fs = require('fs')
const nbt = require('../../index')

fs.readFile('level.dat', function (error: any, data: any) {
  if (error) {
    throw error
  }

  nbt.parse(data, true, function (err: any, result: any) {
    // tslint:disable:no-console
    console.log(err)
    console.log(JSON.stringify(result, null, 2))
  })
})
