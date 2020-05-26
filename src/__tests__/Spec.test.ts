const fs = require('fs')
const nbt = require('../index')

describe('nbt.parse', () => {
  const checkBigtest = (data: any) => {
    expect(data.value.stringTest.value).toEqual(
      'HELLO WORLD THIS IS A TEST STRING ÅÄÖ!')
    expect(data.value['nested compound test'].value).toStrictEqual({
      ham: {
        type: 'compound',
        value: {
          name: { type: 'string', value: 'Hampus' },
          value: { type: 'float', value: 0.75 }
        }
      },
      egg: {
        type: 'compound',
        value: {
          name: { type: 'string', value: 'Eggbert' },
          value: { type: 'float', value: 0.5 }
        }
      }
    })
  }

  it('parses a compressed NBT file', (done: any) => {
    fs.readFile('./src/data/bigtest.nbt.gz', (error: any, data: any) => {
      if (error) {
        throw error
      }
      nbt.parse(data, (err: any, data: any) => {
        if (err) {
          throw error
        }
        checkBigtest(data)
        done()
      })
    })
  })

  it('parses an uncompressed NBT file through parse()', (done: any) => {
    fs.readFile('./src/data/bigtest.nbt', (error: any, data: any) => {
      if (error) {
        throw error
      }
      nbt.parse(data, (error: any, data: any) => {
        if (error) {
          throw error
        }
        checkBigtest(data)
        done()
      })
    })
  })
})

describe('nbt.write', () => {
  it('writes an uncompressed NBT file', (done: any) => {
    fs.readFile('./src/data/bigtest.nbt', (err: any, nbtdata: any) => {
      if (err) {
        throw err
      }
      expect(nbt.writeUncompressed(require('../data/bigtest'))).toStrictEqual(nbtdata)
      done()
    })
  })

  it('re-encodes it input perfectly', function () {
    const input = require('../data/bigtest')
    const output = nbt.writeUncompressed(input)
    const decodedOutput = nbt.parseUncompressed(output)
    expect(decodedOutput).toStrictEqual(input)
  })
})