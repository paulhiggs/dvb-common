const XmlHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require("fs");

class IANAlanguages {

	languagesList=[];
	/**
	 * constructor
	 *
	 */
	constructor() {
		this.languagesList=[];
	}

	empty() {
		this.languagesList=[];
	}

	/**
	 * load the languages into knownLanguages global array from the specified text
	 * file is formatted according to www.iana.org/assignments/language-subtag-registry/language-subtag-registry
	 *
	 * @param {String} languagesData the text of the language data
	 */
	/*private function*/ loadLanguages(languageData) {
	
		/**
		 * determines if a value is in a set of values - simular to 
		 *
		 * @param {String or Array} values The set of values to check existance in
		 * @param {String} value The value to check for existance
		 * @return {boolean} if value is in the set of values
		 */
		function isIn(values, value){
			if (typeof(values) == "string")
				return values==value;
			
			if (typeof(values) == "object") 
				for (var x=0; x<values.length; x++) 
					if (values[x] == value)
						return true;

			return false;
		}
		
		var entries = languageData.split("%%");
		entries.forEach(entry => {
			var items=entry.replace(/(\r|\t)/gm,"").split("\n");
			if (isIn(items,"Type: language") || isIn(items,"Type: extlang")) 
				for (var i=0; i<items.length; i++) 
					if (items[i].startsWith("Subtag:")) 
						this.languagesList.push(items[i].split(":")[1].trim());
		});
	}

	/**
	 * load the languages list into the knownLanguages global array from the specified file
	 * file is formatted according to www.iana.org/assignments/language-subtag-registry/language-subtag-registry
	 *
	 * @param {String} languagesFile the file name to load
	 */
	loadLanguagesFromFile(languagesFile, purge=false) {
		console.log("reading languages from", languagesFile);
		if (purge) this.empty();

		fs.readFile(languagesFile, {encoding: "utf-8"}, function(err,data){
			if (!err) {
				this.loadLanguages(data);		
			}
			else console.log("error loading languages")
		}.bind(this));
	}

	/**
	 * load the languages list into the knownLanguages global array from the specified URL
	 *
	 * @param {String} languagesURL the URL to load
	 */
	loadLanguagesFromURL(languagesURL, purge=false) {
		console.log("retrieving languages from", languagesURL);
		if (purge) this.empty();
		const loader=this.loadLanguages.bind(this);
		var xhttp = new XmlHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4) {
				if (xhttp.status == 200) {
					loader(xhttp.responseText);

				}
				else console.log("error ("+xhttp.status+") retrieving "+languagesURL);	
			}
		};
		xhttp.open("GET", languagesURL, true);
		xhttp.send();
	}

	
	/**
	 * determines if a language is known 
	 *
	 * @param {String} value The value to check for existance
	 * @return {boolean} true if value is a known language, else false
	 */
	isKnown(value){
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

module.exports = IANAlanguages;