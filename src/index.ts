// tslint:disable:no-var-requires
const zlib = require('zlib')

const { ProtoDefCompiler } = require('protodef').Compiler

const nbtJson = JSON.stringify(require('./compiler.types.json'))
const leNbtJson = nbtJson.replace(/(i[0-9]+)/g, 'l$1')

function createProto (le: any) {
  const compiler = new ProtoDefCompiler()
  compiler.addTypes(require('./compiler-compound'))
  compiler.addTypesToCompile(JSON.parse(le ? leNbtJson : nbtJson))
  return compiler.compileProtoDefSync()
}

const proto = createProto(false)
const protoLE = createProto(true)

function writeUncompressed (value: any, le: any) {
  return (le ? protoLE : proto).createPacketBuffer('nbt', value)
}

function parseUncompressed (data: any, le: any) {
  return (le ? protoLE : proto).parsePacketBuffer('nbt', data).data
}

const hasGzipHeader = (data: any) => {
  let result = true
  if (data[0] !== 0x1f) result = false
  if (data[1] !== 0x8b) result = false
  return result
}

function parse (data: any, le: any, callback: any) {
  let isLe = false
  if (typeof le === 'function') {
    callback = le
  } else {
    isLe = le
  }
  if (hasGzipHeader(data)) {
    zlib.gunzip(data, (error: any, uncompressed: any) => {
      if (error) {
        callback(error, data)
      } else {
        callback(null, parseUncompressed(uncompressed, isLe))
      }
    })
  } else {
    callback(null, parseUncompressed(data, isLe))
  }
}

function simplify (data: any) {
  function transform (value: any, type: any) {
    if (type === 'compound') {
      return Object.keys(value).reduce((acc: any, key: any) => {
        acc[key] = simplify(value[key])
        return acc
      }, {})
    }
    if (type === 'list') {
      return value.value.map((v: any) => { return transform(v, value.type) })
    }
    return value
  }
  return transform(data.value, data.type)
}

module.exports = {
  writeUncompressed,
  parseUncompressed,
  simplify,
  parse,
  proto,
  protoLE
}
