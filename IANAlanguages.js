
const XmlHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require("fs");

/**
 * load the languages into knownLanguages global array from the specified text
 * file is formatted according to www.iana.org/assignments/language-subtag-registry/language-subtag-registry
 *
 * @param {String} languagesData the text of the language data
 */
function loadLanguages(languageData) {
	var entries = languageData.split("%%");
	entries.forEach(entry => {
		var i=0, items=entry.split("\n");
		if (isIn(items,"Type: language") || isIn(items,"Type: extlang")) {
			//found one
			for (i=0; i<items.length; i++) {
				if (items[i].startsWith("Subtag:")) {
					this.languagesList.push(items[i].split(":")[1].trim());
				}
			}
		}
	});
}



module.exports = class ISOcountries {

	/**
	 * constructor
	 *
	 */
	constructor(use2=true, use3=false) {
		loadLanguages.bind(this);
		this.languagesList=[];
	}


	/**
	 * load the languages list into the knownLanguages global array from the specified file
	 * file is formatted according to www.iana.org/assignments/language-subtag-registry/language-subtag-registry
	 *
	 * @param {String} languagesFile the file name to load
	 */
	loadLanguagesFromFile = function(languagesFile, purge=false) {
		console.log("reading languages from", languagesFile);
		if (purge) this.reset();
		fs.readFile(languagesFile, {encoding: "utf-8"}, function(err,data){
			if (!err) {
				loadLanguages(data);
			}
		});
	}

	/**
	 * load the languages list into the knownLanguages global array from the specified URL
	 *
	 * @param {String} languagesURL the URL to load
	 */
	loadLanguagesFromURL = function(languagesURL, purge=false) {
		console.log("retrieving languages from", languagesURL);
		if (purge) this.reset();
		var xhttp = new XmlHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
				if (this.status == 200) {
					loadLanguages(xhttp.responseText);
				}
				else console.log("error ("+this.status+") retrieving "+languagesURL);	
			}
		};
		xhttp.open("GET", languagesURL, true);
		xhttp.send();
	}

	reset() {
		this.languagesList.length=0;
	}
	
	/**
	 * determines if a language is known 
	 *
	 * @param {String} value The value to check for existance
	 * @return {boolean} true if value is a known language, else false
	 */
	isKnown = function(value){
		if (typeof(this.languagesList) == "string")
			return this.languagesList==value;
		
		if (typeof(this.languagesList) == "object") {
			for (var x=0; x<this.languagesList.length; x++) 
				if (this.languagesList[x] == value)
					return true;
		}
		return false;
	}	
}