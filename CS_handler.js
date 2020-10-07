//---------------- CLASSIFICATION SCHEME LOADING ---------------- 

const fs=require("fs");
const libxml = require("libxmljs");

/**
 * Constructs a linear list of terms from a heirarical clssification schemes which are read from an XML document and parsed by libxmljs
 *
 * @param {Array} values The array to push classification scheme values into
 * @param {String} CSuri The classification scheme domian
 * @param {Object} term The classification scheme term that may include nested subterms
 */
function addCSTerm(values, CSuri, term){
    if (term.name()==="Term") {
        values.push(CSuri+":"+term.attr("termID").value())
        var st=0, subTerm;
        while (subTerm=term.child(st++)) {
            addCSTerm(values,CSuri,subTerm);
        }
    }
}

/**
 * load the hierarical values from an XML classification scheme document into a linear list 
 *
 * @param {Array} values The linear list of values within the classification scheme
 * @param {String} xmlCS the XML document  of the classification scheme
 */
function loadClassificationScheme(values, xmlCS) {
	if (!xmlCS) return;
	var CSnamespace = xmlCS.root().attr("uri");
	if (!CSnamespace) return;
	var t=0, term;
	while (term=xmlCS.root().child(t++)) {
		addCSTerm(values,CSnamespace.value(),term);
	}
}

/**
 * read a classification scheme from a local file and load its hierarical values into a linear list 
 *
 * @param {Array} values The linear list of values within the classification scheme
 * @param {String} classificationScheme the filename of the classification scheme
 */
function loadCSfromFile(values, classificationScheme) {
	console.log("reading CS from", classificationScheme);
    fs.readFile(classificationScheme, {encoding: "utf-8"}, function(err,data){
        if (!err) {
			loadClassificationScheme(values, libxml.parseXmlString(data.replace(/(\r\n|\n|\r|\t)/gm,"")));
        } else {
            console.log(err);
        }
    });
}

/**
 * read a classification scheme from a URL and load its hierarical values into a linear list 
 *
 * @param {Array} values The linear list of values within the classification scheme
 * @param {String} csURL URL to the classification scheme
 */
function loadCSfromURL(values, csURL) { 
	console.log("retrieving CS from", csURL);
	var xhttp = new XmlHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				loadClassificationScheme(values, libxml.parseXmlString(xhttp.responseText));
			}
			else console.log("error ("+this.status+") retrieving "+csURL);	
		}
	};
	xhttp.open("GET", csURL, true);
	xhttp.send();
} 
 
/**
 * loads classification scheme values from either a local file or an URL based location
 *
 * @param {Array} values The linear list of values within the classification scheme
 * @param {boolean} useURL if true use the URL loading method else use the local file
 * @param {String} CSfilename the filename of the classification scheme
 * @param {String} CSurl URL to the classification scheme
 * 
 */ 
module.exports.loadCS = function (values, useURL, CSfilename, CSurl) {
	if (useURL)
		loadCSfromURL(values,CSurl);
	else loadCSfromFile(values, CSfilename);	
} 
//--------------------------------------------------------------- 