/**
 * @name JSXON
 * JavaScript eXtended Object Notation
 * @author themirrazz#9986
 */


/**
 * Utility for converting a Uint8Array to a jsonifiable object.
 * @param {Uint8Array} ui8 
 */
function Uint8toArray(ui8) {
  var output=[]
  for(var i=0;i<ui8.byteLength;i++) {
    output.push(ui8[i])
  }
  return output
}

/**@param {Map} map*/
function generateMapData(map) {
  var data={}
  map.forEach((value,key,self)=>{
    data[key]=generateData(value)
  })
  return data
}

function retrieveMap(data) {
  var map=[]
  var keys=Object.keys(data)
  var values=Object.values(data)
  for(var i=0;i<keys.length;i++) {
    map.push(
      [keys[i],retrieveItem(values[i])]
    )
  }
  return new Map(map)
}


/**
 * Returns an unstringified version of an item.
 * @param {*} item 
 */
function generateData(item) {
  if(item instanceof Uint8Array) {
    return {
      type: 'uint8array',
      value:Uint8toArray(item)
    }
  } else if(item instanceof Date) {
    return {
      type: 'date',
      value: item.getTime()
    }
  } else if(item instanceof Map) {
    return {
      type: 'map',
      value: generateMapData(item)
    }
  } else if(item instanceof Array) {
    return {
      type: 'array',
      value: generateArrayData(item)
    }
  } else if(item instanceof SyntaxError) {
    return {
      type: 'syntaxerror',
      value: {
        name: item.name,
        stack:item.stack,
        data:item.message
      }
    }
  } else if(item instanceof ReferenceError) {
    return {
      type: 'referror',
      value: {
        name: item.name,
        stack:item.stack,
        data:item.message
      }
    }
  } else if(item instanceof RangeError) {
    return {
      type: 'rangeerror',
      value: {
        name: item.name,
        stack:item.stack,
        data:item.message
      }
    }
  } else if(item instanceof ArrayBuffer) {
    return {
      type: 'arraybuffer',
      value: Uint8toArray(new Uint8Array(item))
    }
  } else if(item instanceof TypeError) {
    return {
      type: 'typeerror',
      value: {
        name: item.name,
        stack:item.stack,
        data:item.message
      }
    }
  } else if(item instanceof URIError) {
    return {
      type: 'urierror',
      value: {
        name: item.name,
        stack:item.stack,
        data:item.message
      }
    }
  } else if(item instanceof Error) {
    return {
      type: 'error',
      value: {
        name: String(item.name),
        stack:item.stack?String(item.stack):null,
        data:String(item.message)
      }
    }
  } else if((typeof item==="bigint")) {
    return {
      type: 'bigint',
      value:Number(item.toString())
    }
  } else if((item instanceof String) || (typeof item=="string")) {
    return {
      type: 'string',
      value: String(item)
    }
  } else if(item===Infinity) {
    return {
      type:'infinity',
      value:'Infinity'
    }
  } else if(item===-Infinity) {
    return {
      type:'minusinfinity',
      value:'Infinity'
    }
  } else if((item instanceof Number) || (typeof item=="number")) {
    if(isNaN(item)) {
      return {
        type: 'nan',
        value:0
      }
    }
    return {
      type:'number',
      value:Number(item)
    }
  } else if((item instanceof Boolean) || (typeof item=='boolean')) {
    return {
      type: 'bool',
      value: item?true:false
    }
  } else if((item instanceof Object) && (item.constructor==Object)) {
    return {
      type: 'object',
      value: generateObjectData(item)
    }
  } else if(item instanceof URL) {
    return {
      type: 'url',
      value:item.href
    }
  } else if(item instanceof RegExp) {
    return {
      type: 'regexp',
      value: {
        string:item.toString(),
        source:item.source,
        flags:item.flags
      }
    }
  } else if(item === undefined) {
    return {
      type: 'undefined',
      value: false
    }
  } else if(item === null) {
    return {
      type: 'null',
      value: false
    }
  } else {
    throw new TypeError("unsupported data type")
  }
}

function retrieveArray(data) {
  var array=[]
  for(var i=0;i<data.length;i++) {
    array.push(
      retrieveItem(data[i])
    )
  }
  return array
}

function generateObjectData(object) {
  var data={}
  var keys=Object.keys(object)
  for(var i=0;i<keys.length;i++) {
    data[keys[i]]=generateData(
      object[keys[i]]
    )
  }
  return data
}

function retrieveObject(data) {
  var object={}
  var keys=Object.keys(data)
  for(var i=0;i<keys.length;i++) {
    object[keys[i]]=retrieveItem(
      data[keys[i]]
    )
  }
  return object
}

function generateArrayData(array) {
  var data=[]
  for(var i=0;i<array.length;i++) {
    data.push(
      generateData(array[i])
    )
  }
  return data
}

function retrieveItem(data) {
  var {type,value}=data;
  if(type=="uint8array") {
    return new Uint8Array(value)
  } else if(type=="syntaxerror") {
    var error=new SyntaxError(value.data)
    error.name=value.name;
    error.stack=value.stack;
    return error
  } else if(type=="referror") {
    var error=new ReferenceError(value.data)
    error.name=value.name;
    error.stack=value.stack;
    return error
  } else if(type=="rangeerror") {
    var error=new RangeError(value.data)
    error.name=value.name;
    error.stack=value.stack;
    return error
  } else if(type=='arraybuffer') {
    return (new Uint8Array(value)).buffer
  } else if(type=='bigint') {
    return BigInt(value)
  } else if(type=="typeerror") {
    var error=new TypeError(value.data)
    error.name=value.name;
    error.stack=value.stack;
    return error
  } else if(type=="urierror") {
    var error=new URIError(value.data)
    error.name=value.name;
    error.stack=value.stack;
    return error
  } else if(type=="error") {
    var error=new Error(value.data)
    error.name=value.name;
    error.stack=value.stack;
    return error
  } else if(type=='map') {
    return retrieveMap(value)
  } else if(type=='nan') {
    return NaN
  } else if(type=='infinity') {
    return Infinity
  } else if(type=='regexp') {
    return new RegExp(value.source,value.flags)
  } else if(type=='minusinfinity') {
    return -Infinity
  } else if(type=="date") {
    return new Date(value)
  } else if(type=="array") {
    return retrieveArray(value)
  } else if(type=='bool') {
    return value?true:false
  } else if(type=='null') {
    return null
  } else if(type=='url') {
    return new URL(value)
  } else if(type=='undefined') {
    return undefined
  } else if(type=='object') {
    return retrieveObject(value)
  } else if(type=='string') {
    return value
  } else if(type=='number') {
    return value
  } else {
    throw new TypeError("invalid data type")
  }
}

module.exports = {
  parse: function (data) {
    return retrieveItem(JSON.parse(data))
  },
  stringify:function (item) {
    return JSON.stringify(
      generateData(item)
    )
  }
}
