/* jshint esversion: 6 */

/**
 * constructs an XPath based on the provided arguments
 *
 * @param {string} SCHEMA_PREFIX   Used when constructing Xpath queries
 * @param {string} elementName     The name of the element to be searched for
 * @param {int} index              The instance of the named element to be searched for (if specified)
 * @returns {string} the XPath selector
 */
 module.exports.xPath = function (SCHEMA_PREFIX, elementName, index=null) {
	return `${SCHEMA_PREFIX}:${elementName}${index?`[${index}]`:""}`;
};


/**
 * constructs an XPath based on the provided arguments
 * 
 * @param {string} SCHEMA_PREFIX Used when constructing Xpath queries
 * @param {array} elementNames the name of the element to be searched for
 * @returns {string} the XPath selector
 */
module.exports.xPathM = function (SCHEMA_PREFIX, elementNames) {
	let t="";
	elementNames.forEach(elementName => {
		if (t.length) { t+="/"; first=false;}
		t+=`${SCHEMA_PREFIX}:${elementName}`;
	});
	return t;
};


/**
 * determines if a value is in a set of values 
 *
 * @param {String or Array} values The set of values to check existance in
 * @param {String} value The value to check for existance
 * @return {boolean} if value is in the set of values
 */
module.exports.isIn = function(values, value, caseSensitive=true){
	let vlc=value.toLowerCase();
    if (typeof(values)=="string")
        return caseSensitive? values==value : values.toLowerCase()==vlc;
   
    if (typeof(values)=="object") 	
		return caseSensitive? values.includes(value) : (values.find(element => element.toLowerCase()==vlc) != undefined);
    
    return false;
};


/**
 * determines if a value is in a set of values using a case insensitive comparison
 *
 * @param {String or Array} values The set of values to check existance in
 * @param {String} value The value to check for existance
 * @return {boolean} if value is in the set of values
 */
module.exports.isIni = function(values, value){
	return isIn(values, value, false);
};


/**
 * replace ENTITY strings with a generic characterSet
 *
 * @param {string} str string containing HTML or XML entities (starts with & ends with ;)
 * @return {string} the string with entities replaced with a single character '*'
 */
module.exports.unEntity = function(str) {
	return str.replace(/(&.+;)/ig, "*");
};