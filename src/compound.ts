// tslint:disable
module.exports = {
  compound: [readCompound, writeCompound, sizeOfCompound],
};

function readCompound(buffer: any, offset: any, typeArgs: any, rootNode: any) {
  const results: any = {
    value: {},
    size: 0,
  };
  while (true) {
    const typ = typeArgs.read(buffer, offset, 'i8', rootNode);
    if (typ.value === 0) {
      offset += typ.size;
      results.size += typ.size;
      break;
    }

    const readResults = typeArgs.read(buffer, offset, 'nbt', rootNode);
    offset += readResults.size;
    results.size += readResults.size;
    results.value[readResults.value.name] = {
      type: readResults.value.type,
      value: readResults.value.value,
    };
  }
  return results;
}

function writeCompound(value: any, buffer: any, offset: any, typeArgs: any, rootNode: any) {
  Object.keys(value).map((key: any) => {
    offset = typeArgs.write(
      {
        name: key,
        type: value[key].type,
        value: value[key].value,
      },
      buffer,
      offset,
      'nbt',
      rootNode,
    );
  });
  offset = typeArgs.write(0, buffer, offset, 'i8', rootNode);

  return offset;
}

function sizeOfCompound(value: any, typeArgs: any, rootNode: any) {
  // tslint:disable:no-shadowed-variable
  const size = Object.keys(value).reduce((size, key) => {
    return (
      size +
      typeArgs.sizeOf(
        {
          name: key,
          type: value[key].type,
          value: value[key].value,
        },
        'nbt',
        rootNode,
      )
    );
  }, 0);
  return 1 + size;
}
