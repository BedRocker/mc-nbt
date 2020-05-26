const fs = require('fs')
const nbt = require('../../index')

fs.readFile('bigtest.nbt.gz', function (error, data) {
  if (error) {
    throw error
  }

  nbt.parse(data, function (err, result) {
    // tslint:disable:no-console
    console.log(err)
    console.log(result.value.stringTest)
    console.log(result.value['nested compound test'])
    console.log(nbt.simplify(result)['nested compound test'])
  })
})
