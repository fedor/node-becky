**Becky** converts callback-based functions to promise-based (promisifies) and vice versa (callbackify)

## Install
```
npm install becky --save
```

## Use
```js
// basic example
var p = require('becky').promisify        // also require('becky').p
var pm = require('becky').promisifyMulti  // also require('becky').pm
var cb = require('becky').callbackify     // also require('becky').cb

// TBD

// use with async + co
var async = require('async')
var co = require('co')
var fs = require('fs')

co(function* () {
	var files = ['file1', 'file2', 'file3']
	var result = yield p(async.mapLimit)(files, 2, cb(co.wrap(
		fucntion* (file) {
			content = yield p(fs.readFile)(file)
			return file + ': ' + content
		}
	)))

	console.log('Read result:', result)
})
```