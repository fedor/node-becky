module.exports = {}

module.exports.callbackify = module.exports.cb = func => function () {
	let args = [].slice.call(arguments)
	const cb = args.pop()
	func.apply(this, args)
		.then(res => cb.call(this, null, res))
		.catch(err => cb.call(this, err))
}

module.exports.promisify = module.exports.p = func => function () {
	let args = [].slice.call(arguments)
	return new Promise((resolve, reject) => {
		args.push((err, res) => { err ? reject(err) : resolve(res) })
		func.apply(this, args)
	})
}

module.exports.promisifyMulti = module.exports.pm = func => function () {
	let args = [].slice.call(arguments)
	return new Promise((resolve, reject) => {
		args.push(function(err) { err ? reject(err) : resolve([].slice.call(arguments, 1)) })
		func.apply(this, args)
	})
}