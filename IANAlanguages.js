const fetch=require('node-fetch')
const fs=require('fs')

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
		this.empty();
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
	/*private function*/ 
	loadLanguages(languageData) {
		/**
		 * determines if a value is in a set of values - simular to 
		 *
		 * @param {String or Array} values The set of values to check existance in
		 * @param {String} value The value to check for existance
		 * @return {boolean} if value is in the set of values
		 */
		function isIn(values, value){
			if (typeof(values)=="string")
				return values==value;
		   
			if (Array.isArray(values)) 	
				return values.includes(value)
			
			return false;
		}	
		
		var entries = languageData.split("%%");
		entries.forEach(entry => {
			let items=entry.replace(/(\r|\t)/gm,"").split("\n");
			if (isIn(items,"Type: language") || isIn(items,"Type: extlang")) 
				for (let i=0; i<items.length; i++) 
					if (items[i].startsWith("Subtag:")) {
 						let val=items[i].split(":")[1].trim();
						if (isIn(items,"Scope: private-use")) {
							if (val.indexOf("..")<0) 
								this.languagesList.push(val);
							else {
								let range=val.split("..");
								if (range[0].length == range[1].length) {
									if (range[0]<range[1])
										this.languageRanges.push({"start":range[0], "end":range[1]});
									else this.languageRanges.push({"start":range[1], "end":range[0]});
								}
							}
						}							
						else this.languagesList.push(val);
					}
			if (isIn(items,"Type: redundant")) 
				for (let i=0; i<items.length; i++) 
					if (items[i].startsWith("Tag:")) {
 						let val=items[i].split(":")[1].trim();
						this.redundantLanguagesList.push(val);
					}
		});
	}

	/**
	 * load the languages list into the knownLanguages global array from the specified file
	 * file is formatted according to www.iana.org/assignments/language-subtag-registry/language-subtag-registry
	 *
	 * @param {String} languagesFile the file name to load
	 * @param {boolean} purge  erase the existing values before loading new
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
	 * @param {boolean} purge  erase the existing values before loading new
	 */
	loadLanguagesFromURL(languagesURL, purge=false) {
		console.log("retrieving languages from", languagesURL, "using fetch()")
		if (purge) this.empty();
		
		function handleErrors(response) {
			if (!response.ok) {
				throw Error(response.statusText)
			}
			return response
		}
		
		fetch(languagesURL)
			.then(handleErrors)
			.then(response => response.text())
			.then(responseText => this.loadLanguages(responseText))
			.catch(error => console.log("error ("+error+") retrieving "+languagesURL))
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
			
			if (this.languagesList.find(lang => lang.toLowerCase()==lcValue))
				return this.languageKnown;
	
			if (this.redundantLanguagesList.find(lang => lang.toLowerCase()==lcValue))
				return this.languageRedundant;		
		}
		return this.languageUnknown;
	}	
}

module.exports = IANAlanguages;