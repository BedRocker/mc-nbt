const fs = require('fs')
const nbt = require('../../index')

fs.readFile('level.dat', function (error, data) {
  if (error) {
    throw error
  }

  nbt.parse(data, true, function (err, result) {
    // tslint:disable:no-console
    console.log(err)
    console.log(JSON.stringify(result, null, 2))
  })
})
