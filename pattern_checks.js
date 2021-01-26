// pattern_checks.js
	  

/**
 * checks if the argument complies to the TV Anytime defintion of RatioType
 *
 * @param {string}     str string contining value to check
 * @returns {boolean} true if the argment is compliant to a tva:RatioType
 */
module.exports.isRatioType = function (str) {
    const ratioRegex=new RegExp('^\\d+:\\d+')
    return ratioRegex.test(str.trim())
/*	const ratioRegex=/^\d+:\d+$/
	let s=str.match(ratioRegex)
	return s?s[0]===str:false */
}

/**
 * checks if the argument complies to an XML representation of UTC time
 *
 * @param {string} str string contining the UTC time
 * @returns {boolean}  true if the argment is formatted according to UTC ("Zulu") time
 */
module.exports.isUTCDateTime = function (str) {
    const UTCregex=new RegExp('^[\\d]{4}-((0[1-9])|(1[0-2]))-((0[1-9])|1\\d|2\\d|(3[0-1]))T(([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(\.\\d+)?|(24:00:00(\\.0+)?))Z$')
    return UTCregex.test(str.trim())
/*	const UTCregex=/^[\d]{4}-((0[1-9])|(1[0-2]))-((0[1-9])|1\d|2\d|(3[0-1]))T(([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d+)?|(24:00:00(\.0+)?))Z$/
	let s=str.match(UTCregex)
	return s?s[0]===str:false */
}


/**
 * checks of the specified argument matches an HTTP(s) URL where the protocol is required to be provided
 *
 * @param {string} arg  The value whose format is to be checked
 * @returns {boolean} true if the argument is an HTTP URL
 */
module.exports.isHTTPURL=function (arg) {
	let pattern = new RegExp('^(https?:\\/\\/)'+ // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
		'(\\#[-a-z\\d_]*)?$','i') // fragment locator
	return pattern.test(arg)
}


/**
 * checks if the argument complies to an XML representation of UTC time
 *
 * @param {string} duration string contining the UTC time
 * @returns {boolean}  true if the argment is formatted according to UTC ("Zulu") time
 */
 module.exports.isISODuration = function (duration) {
    let isoRegex=new RegExp('^(-|\\+)?P(?:([-+]?[\\d,.]*)Y)?(?:([-+]?[\\d,.]*)M)?(?:([-+]?[\\d,.]*)W)?(?:([-+]?[\\d,.]*)D)?'+
                            '(?:T(?:([-+]?[\\d,.]*)H)?(?:([-+]?[\\d,.]*)M)?(?:([-+]?[\\d,.]*)S)?)?$')
    return isoRegex.test(duration.trim())
/*	const isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
	let s=duration.match(isoRegex);
	return s?s[0]===duration:false; */
}
 
 
/**
 * checks if the argument complies to a DVB locator according to clause 6.4.2 of ETSI TS 102 851 
 * i.e. dvb://<original_network_id>..<service_id> ;<event_id>
 *
 * @param {string} locator string contining the DVB locator
 * @returns {boolean}  true is the argment is formatted as a DVB locator
 */
module.exports.isDVBLocator = function (locator) {
 //   let locatorRegex = new RegExp('^dvb:\\/\\/[\\dA-Fa-f]+\\.[\\dA-Fa-f]*\\.[\\dA-Fa-f]+;[\\dA-Fa-f]+$')
    let locatorRegex = new RegExp(/^dvb:\/\/[\dA-Fa-f]+\.[\dA-Fa-f]*\.[\dA-Fa-f]+;[\dA-Fa-f]+$/)
    return locatorRegex.test(locator.trim())
/*	const locatorRegex = /^dvb:\/\/[\dA-Fa-f]+\.[\dA-Fa-f]*\.[\dA-Fa-f]+;[\dA-Fa-f]+$/
	let s=locator.match(locatorRegex)
	return s?s[0]===locator:false */
}


