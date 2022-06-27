# jsonplus
Save more kinds of data with this alternative to regular JSON parse-and-stringify!

This can stringify and parse more data types in JavaScript, including:

* URL Objects
* Dates
* Errors
* And so much more!

|                | Regular JSON | JSON+         |   |   |
|----------------|--------------|---------------|---|---|
| String         | Yes          | Yes           |   |   |
| Number         | Yes          | Yes           |   |   |
| Boolean        | Yes          | Yes           |   |   |
| Array          | Yes          | Yes           |   |   |
| Object         | Yes          | Yes           |   |   |
| NaN            | No           | Yes           |   |   |
| Infinity       | No           | Yes           |   |   |
| -Infinity      | No           | Yes           |   |   |
| Uint8Array     | No           | Yes           |   |   |
| Date           | No           | Yes           |   |   |
| SyntaxError    | No           | Message+Stack |   |   |
| ReferenceError | No           | Message+Stack |   |   |
| TypeError      | No           | Message+Stack |   |   |
| RangeError     | No           | Message+Stack |   |   |
| URIError       | No           | Message+Stack |   |   |
| Error          | No           | Message+Stack |   |   |
| URL            | No           | Yes           |   |   |

### Future Plans:

* Add the ability to have ArrayBuffers
* ~~Store RegExp expressions~~ Done
