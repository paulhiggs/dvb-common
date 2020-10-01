const XmlHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require("fs");

class IANAlanguages {

	languageUnknown=0;
	languageKnown=1;
	languageRedundant=2;

	languagesList=[];
	redundantLanguagesList=[];
	/**
	 * constructor
	 *
	 */
	constructor() {
		empty();
	}

	empty() {
		this.languagesList=[];
		this.redundantLanguagesList=[];
		this.languageRanges=[];
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
					if (items[i].startsWith("Subtag:")) {
		//				this.languagesList.push(items[i].split(":")[1].trim());

 						var val = items[i].split(":")[1].trim();
						if (isIn(items,"Scope: private-use")) {
							if (val.indexOf("..")<0) 
								this.languagesList.push(val);
							else {
								var range=val.split("..");
								if (range[0].length == range[1].length) {
								
									if (range[0]<range[1])
										this.languageRanges.push({"start":range[0], "end":range[1]});
									else
										this.languageRanges.push({"start":range[1], "end":range[0]});
								}
									
							}
						}							
						else
							this.languagesList.push(val);
					}
			if (isIn(items,"Type: redundant")) 
				for (var i=0; i<items.length; i++) 
					if (items[i].startsWith("Tag:")) {
		//				this.languagesList.push(items[i].split(":")[1].trim());

 						var val = items[i].split(":")[1].trim();
						this.redundantLanguagesList.push(val);
					}
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
	 * @return {integer} indicating the "known" state of the language
	 */
	isKnown(value){
		let lcValue=value.toLowerCase();
		
		if (typeof(this.languagesList)=="string")
			return this.languagesList.toLowerCase()==lcValue?languageKnown:languageUnknown;
		
		if (typeof(this.languagesList)=="object") {
			
			if (this.languageRanges.find(range => range["start"]<=value && value<=range["end"]))
				return this.languageKnown;
/*
			var x;
			for (x=0; x<this.languageRanges.length; x++) 
				if (this.languageRanges[x]["start"]<=value && value<=this.languageRanges[x]["end"])
					return this.languageKnown;	
*/

			
			if (this.languagesList.find(lang => lang.toLowerCase()==lcValue))
				return this.languageKnown;
/*
			for (x=0; x<this.languagesList.length; x++) 
				if (this.languagesList[x].toLowerCase()==lcValue)
					return this.languageKnown;
*/	
			if (this.redundantLanguagesList.find(lang => lang.toLowerCase()==lcValue))
				return this.languageRedundant;
/*			
			for (x=0; x<this.redundantLanguagesList.length; x++) 
				if (this.redundantLanguagesList[x].toLowerCase()==lcValue)
					return this.languageRedundant;
*/			
		}
		return this.languageUnnown;
	}	
}

module.exports = IANAlanguages;