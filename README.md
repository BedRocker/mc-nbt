# Minecraft NBT Parser
## Built with TypeScript
[![NPM version](https://img.shields.io/npm/v/@codetheorist/mc-nbt)](http://npmjs.com/package/prismarine-nbt)
[![Build Status](https://img.shields.io/circleci/project/BedRocker/mc-nbt/master)](https://circleci.com/gh/BedRocker/mc-nbt)

MC-NBT is a TypeScript parser and serializer for [NBT](http://wiki.vg/NBT) archives, for use with [Node.js](http://nodejs.org/).

### Installation
To install into your project, simply run `npm install --save @codetheorist/mc-nbt` in the root of your project.

### Usage
To read NBT headers from a file, the following code snippet should get you going:

```
const NBT = require('@codetheorist/mc-nbt')
const fs = require('fs')

fs.readFile('data.nbt', (error, data) => {
  if (error) throw error;

  nbt.parse(data, (error, data) => {
    console.log(data.value.stringTest.value);
    console.log(data.value['nested compound test'].value);
  });
});
```
If the file is ZLib compressed, then it will automatically be decompressed first

### API

#### writeUncompressed(value,[isLittleEndian])
Returns a buffer with a serialized nbt value. If isLittleEndian is passed and is true, write little endian nbt (mcpe).

#### parseUncompressed(data,[isLittleEndian])
Takes a buffer data and returns a parsed nbt value. If isLittleEndian is passed and is true, read little endian nbt (mcpe).

#### parse(data,[isLittleEndian], callback)
Takes an optionally compressed data and provide a parsed nbt value in the callback(err,value). If isLittleEndian is passed and is true, read little endian nbt (mcpe).

#### simplify(nbt)
Returns a simplified nbt representation : keep only the value to remove one level. This loses the types so you cannot use the resulting representation to write it back to nbt.

#### proto
Provide the protodef instance used to parse and serialize nbt.

#### protoLE
Provide the protodef instance used to parse and serialize little endian nbt.
