//---------------- CLASSIFICATION SCHEME LOADING ---------------- 

const fs=require("fs")
const libxml=require('libxmljs2')
const fetch=require("node-fetch")

/**
 * check if the element contains the named child element
 *
 * @param {Object} elem the element to check
 * @param {string} childElementName the name of the child element to look for
 *& @returns {boolean} true of the element contains the named child element(s) otherwise false
 */
function hasChild(elem, childElementName) {
	if (!elem) return false
	return childElementName.childNodes().find(elem => elem.type=='element' && elem.name==childElementName) != undefined
/*	let ch=0, c
	while (c=elem.child(ch++))
		if (c.type()=="element" && c.name()===childElementName)
			return true
	
	return false */
}

/**
 * Constructs a linear list of terms from a heirarical clssification schemes which are read from an XML document and parsed by libxmljs
 *
 * @param {Array} values The array to push classification scheme values into
 * @param {String} CSuri The classification scheme domian
 * @param {Object} term The classification scheme term that may include nested subterms
 * @param {boolean} leafNodesOnly flag to indicate if only the leaf <term> values are to be loaded 
 */
function addCSTerm(values, CSuri, term, leafNodesOnly=false) {
	if (term.type()!="element") return
    if (term.name()==="Term") {
		if (!leafNodesOnly || (leafNodesOnly && !hasChild(term, "Term")))
			if (term.attr("termID")) 
				values.push(`${CSuri}:${term.attr("termID").value()}`)
        var st=0, subTerm
        while (subTerm=term.child(st++))
            addCSTerm(values, CSuri, subTerm, leafNodesOnly)
    }
}

/**
 * load the hierarical values from an XML classification scheme document into a linear list 
 *
 * @param {Array} values The linear list of values within the classification scheme
 * @param {String} xmlCS the XML document  of the classification scheme
 * @param {boolean} leafNodesOnly flag to indicate if only the leaf <term> values are to be loaded 
 */
function loadClassificationScheme(values, xmlCS, leafNodesOnly=false) {
	if (!xmlCS) return
	let CSnamespace = xmlCS.root().attr("uri")
	if (!CSnamespace) return
	var t=0, term
	while (term=xmlCS.root().child(t++))
		addCSTerm(values, CSnamespace.value(), term, leafNodesOnly)
}

/**
 * read a classification scheme from a local file and load its hierarical values into a linear list 
 *
 * @param {Array} values The linear list of values within the classification scheme
 * @param {String} classificationScheme the filename of the classification scheme
 * @param {boolean} leafNodesOnly flag to indicate if only the leaf <term> values are to be loaded 
 */
function loadCSfromFile(values, classificationScheme, leafNodesOnly=false) {
	console.log(`reading CS from m${classificationScheme}`)
    fs.readFile(classificationScheme, {encoding: "utf-8"}, function(err,data){
        if (!err) 
			loadClassificationScheme(values, libxml.parseXmlString(data.replace(/(\r\n|\n|\r|\t)/gm,"")), leafNodesOnly);
		else console.log(err);
    });
}


/**
 * read a classification scheme from a URL and load its hierarical values into a linear list 
 *
 * @param {Array} values The linear list of values within the classification scheme
 * @param {String} csURL URL to the classification scheme
 * @param {boolean} leafNodesOnly flag to indicate if only the leaf <term> values are to be loaded 
 */
function loadCSfromURL(values, csURL, leafNodesOnly=false) {	
	console.log(`retrieving CS from ${csURL} via fetch()`)
	
	function handleErrors(response) {
		if (!response.ok) {
			throw Error(response.statusText)
		}
		return response
	}
	
	fetch(csURL)
		.then(handleErrors)
		.then(response => response.text())
		.then(strXML => loadClassificationScheme(values, libxml.parseXmlString(strXML), leafNodesOnly))
		.catch(error => console.log(`error (${error}) retrieving ${csURL}`))
}


 
/**
 * loads classification scheme values from either a local file or an URL based location
 *
 * @param {Array} values          The linear list of values within the classification scheme
 * @param {boolean} useURL        if true use the URL loading method else use the local file
 * @param {String} CSfilename     the filename of the classification scheme
 * @param {String} CSurl          URL to the classification scheme
 * @param {boolean} leafNodesOnly flag to indicate if only the leaf <term> values are to be loaded 
 */ 
module.exports.loadCS = function (values, useURL, CSfilename, CSurl, leafNodesOnly=false) {
	if (useURL)
		loadCSfromURL(values, CSurl, leafNodesOnly)
	else loadCSfromFile(values, CSfilename, leafNodesOnly)
} 
//--------------------------------------------------------------- 