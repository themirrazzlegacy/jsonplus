# JSON+
Save more kinds of data with this alternative to regular JSON parse-and-stringify!


A full list of what JSON+ can stringify!

* Strings, Numbers, and Booleans
* Objects and Arrays
* Uint8Array and ArrayBuffer
* Date objects
* URLs and URIErrors
* SyntaxErrors, TypeErrors, RangeErrors, and ReferenceErrors
* Regular old multi-purpose Errors
* BigInts, for numbers that are too big
* Maps
* RegExp Expressions
* NaN, Infinity, and negative(-) Infinity
* null AND undefined

## How it works
Instead of building off of JSON, it uses objects with `type` keys to represent items normally not supported in JSON.
With Maps, Arrays, and Objects, each item is converted back into it's original form by checking the `type` property.
This makes sure that normally unsupported types can still be supported in Objects, Arrays, and Maps.
Because of how this works, you could directly store a Map, Date, Error, or anything else without putting it inside an Object or Array.
This also means it can be parsed using the regular `JSON` API, you'll just end up with a bunch of objects with the `type` and `value` properties.

### How Uint8Arrays are stored
Because `Uint8Array`s have the `byteLength` property, we're able to use that to go through the Uint8Array like a normal array, and then put it inside of a normal array.
Because `Uint8Array`s can take an array as the bytes to construct it with, it returns a new Uint8Array that's ready to go.

### How ArrayBuffers are stored
Because `Uint8Array`s can take an `ArrayBuffer` as it is constructed, the `ArrayBuffer`s are converted to `Uint8Array`s, and then finally to an array.
This are reconstructed to a `Uint8Array` where it then returns the `buffer` property, which contains an `ArrayBuffer` with the exact same bytes.

### How Maps are stored
`Map`s are basically iteratible objects. Using the `forEach` method, `Map`s are converted to an Object with the keys and values. These are then converted to an `Array` that is fed to a `Map`, preserving the contents of the `Map`.

### How Dates are stored
`Date` objects except a number representing the number of milliseconds since the UNIX epoch. Because `Date` objects have the `getTime` method, which returns the milliseconds since the UNIX epoch, the result of `getTime` is stored, and then fed into a new `Date` object once parsed.

### How Errors are stored
`SyntaxError`s, `TypeError`s, `ReferenceError`s, and anything that is an instance of `Error` is stored the same way. The `Error`'s `name`, `message`, and `stack` properties are saved. When parsed, the `name` and `stack` properties are instantly reapplied. The `message` property is fed to the constructor.

### How Big Integers are stored
`BigInt`s are first converted to a string via `toString`, and then converted to a number. When parsed, the number is fed into the `BigInt` function.

### How Regexp Expressions are stored.
The `source` and `flags` properties of the `RegExp` are saved. When parsed, they are fed into the `RegExp` constructor as paramaters.

### How NaN, Null, Undefined, Infinity, and negative Infinity are stored.
These are stored using the Precise Values method. Because these are special values and not a type, if it is equivalent to the value, it uses a special type for each value. During parsing, the `value` property is completely ignored if it is a Precise Value.

### How URLs are stored.
The `href` property of `URL` objects are stored when stringified, and then passed to a new `URL` object when parsed.

## Future Plans:

None yet...
