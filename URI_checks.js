/**
 * determine if the passed value conforms to am IETF RFC4151 TAG URI
 *
 * @param {string} identifier  The service identifier to be checked
 * @return {boolean}           true if the service identifier is in RFC4151 TAG URI format
 */
module.exports.isTAGURI = function (identifier){
    // RFC 4151 compliant - https://tools.ietf.org/html/rfc4151
    // tagURI = "tag:" taggingEntity ":" specific [ "#" fragment ]

    let TagRegex=new RegExp('^tag:(([\\da-z\\-\\._]+@)?[\\da-z][\\da-z\-]*[\\da-z]*(\\.[\\da-z][\\da-z\\-]*[\\da-z]*)*),\\d{4}(\\-\\d{2}(\\-\\d{2})?)?:([\'a-z\\d\-\\._~!$&\\(\\)\\*\\+,;=:@\\?/]|%[0-9a-f]{2})*(#([\'a-z0-9\\-\\._~!$&\\(\\)\\*\\+,;=:@\\?/]|%[0-9a-f]{2})*)?$', 'i')
    return TagRegex.test(identifier.trim())
/*
    var TAGregex=/tag:(([\dA-Za-z\-\._]+@)?[\dA-Za-z][\dA-Za-z\-]*[\dA-Za-z]*(\.[\dA-Za-z][\dA-Za-z\-]*[\dA-Za-z]*)*),\d{4}(\-\d{2}(\-\d{2})?)?:(['A-Za-z\d\-\._~!$&\(\)\*\+,;=:@\?/]|%[0-9A-Fa-f]{2})*(#(['A-Za-z0-9\-\._~!$&\(\)\*\+,;=:@\?/]|%[0-9A-Fa-f]{2})*)?/g;
    var s=identifier.match(TAGregex);
    return s?s[0] === identifier:false; */
}

/**
 * check if the argument complies to a CRID format
 *
 * @param {string} value	value whose format to check
 * @returns	{boolean}		true if the argument confirms to the CRID format, else false
 **/
module.exports.isCRIDURI = function (value) {
    let CRIDRegex=new RegExp('crid://(.*)/(.*)','i')
    return CRIDRegex.test(value.trim())
  /*  
	const CRIDregex=/[cC][rR][iI][dD]:\/\/(.*)\/(.*)/g;
    var s=value.match(CRIDregex);
    return s?s[0] === value:false; */
}