/**
 @name Try JSON+
 @author themirrazz#9986
 Run this code to try out JSON+!
*/

var JSONp=require('./index')

var data = {
  entryName: 'entry 12345',
  randomNumber: 29,
  isItTrue: true,
  collectionOfThings: [1,2,3,'something',4,false,['a','b','c'],{aKey:'a value'}],
  binaryData: new Uint8Array([1,2,3,4,5,6,7,8,9,10]),
  syntaxError: new SyntaxError('this is a syntax error'),
  typeError: new TypeError('this is a type error'),
  randomError: new Error('this is an error bc i want tooo'),
  myObject: {
    thisIsAnObject:true
  },
  oneBlankValue:null,
  anotherBlankValue:undefined,
  theCurrentTime: new Date(),
  theTimeOfMoonLanding:new Date("July 20, 69 20:17:40 GMT+00:00"),
  googleLanding:new URL('https://www.google.com/'),
  notNumber:NaN,
  toInfinity: Infinity,
  andBeyond:-Infinity,
  expression: /it's just an expression/gi,
  someBuffer: new ArrayBuffer(8),
  veryBigNumber:BigInt(9999),
  map: new Map([
    ['The Park', '12345 Parker St.'],
    ['My House', '54321 House Ln.'],
    ['My School', '33929 Learning Rd.'],
    ['My Work', '67890 Office-chair Ave.']
  ]),
  symbol: Symbol('BANG! BANG! CRASH! BANG! AKEKLCEASHSSHS!'),
  objectWithSymbolsAsKeys: {
    [Symbol("What does the symbol say?")]:'BANGA BANG BANGA CRASH CRA-CRASH BANG!',
    [Symbol("BANGA BANG BANGA ")]:'CRASH CRA-CRASH BANG!',
    [Symbol("WHAT DOES THE")]:'SYMBOL SAY?!'
  }
}

var stringified=JSONp.stringify(data)
var parsed=JSONp.parse(stringified)

console.log("----------ORIGINAL DATA-----------")
console.log(data)
console.log("---------STRINGIFIED DATA---------")
console.log(stringified)
console.log("-----------PARSED OUTPUT----------")
console.log(parsed)

