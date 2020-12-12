
const XmlHttpRequest=require("xmlhttprequest").XMLHttpRequest
const fetch=require('node-fetch')
const fs=require("fs")


/**
 * load the countries list into the allowedCountries global array from the specified text
 *
 * @param {String} countryData the text of the country JSON data
 * @returns {object} processed JSON object of countries
 */
function loadCountries(countryData) {

	return JSON.parse(countryData, function (key, value) {
		if (key == "numeric") {
			return new Number(value);
		} else if (key == "alpha2") {
			if (value.length!=2) return "**"; else return value;
		} else if (key == "alpha3") {
			if (value.length!=3) return "***"; else return value;
		}
		else {
			return value;
		}
	});
}


module.exports = class ISOcountries {
	
	
	/**
	 * constructor
	 *
	 * @param {boolean} use2 allow the 2 digit country codes to be searched
	 * @param {boolean} use3 allow the 3 digit country codes to be searched
	 */
	constructor(use2=true, use3=false) {
		loadCountries.bind(this);
		this.countriesList=[];
		this.use2CharCountries=use2;
		this.use3CharCountries=use3;
	}
	
	/**
	 * load the countries list into the allowedCountries global array from the specified JSON file
	 *
	 * @param {String} countriesFile the file name to load
	 */
	loadCountriesFromFile = function(countriesFile, purge=false) {
		console.log("reading countries from", countriesFile);
		if (purge) this.reset();
		fs.readFile(countriesFile, {encoding: "utf-8"}, function(err,data){
			if (!err) {
				this.countriesList = loadCountries(data);
			} else {
				console.log(err);
			}
		}.bind(this));
	}
	
	/**
	 * load the countries list into the allowedCountries global array from the specified JSON file
	 *
	 * @param {String} countriesURL the URL to the file to load
	 */
	loadCountriesFromURL_old = function(countriesURL, purge=false) {
		console.log("retrieving countries from", countriesURL);
		if (purge) this.reset();
		const loader=this.loadCountries.bind(this);
		var xhttp = new XmlHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4) {
				if (xhttp.status == 200) {
					this.countriesList = loader(xhttp.responseText);
				}
				else console.log("error ("+xhttp.status+") retrieving "+countriesURL);	
			}
		};
		xhttp.open("GET", countriesURL, true);
		xhttp.send();	
	}
	
	loadCountriesFromURL = function(countriesURL, purge=false) {
		console.log("retrieving countries from", countriesURL);
		if (purge) this.reset();

		function handleErrors(response) {
			if (!response.ok) {
				throw Error(response.statusText)
			}
			return response
		}
		
		fetch(countriesURL)
		.then(handleErrors)
		.then(response => response.text())
		.then(responseText => this.countriesList=this.loader(responseText))
/*		
		const loader=this.loadCountries.bind(this);
		var xhttp = new XmlHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4) {
				if (xhttp.status == 200) {
					this.countriesList = loader(xhttp.responseText);
				}
				else console.log("error ("+xhttp.status+") retrieving "+countriesURL);	
			}
		};
		xhttp.open("GET", countriesURL, true);
		xhttp.send();	
		*/
	}


	reset() {
		this.countriesList.length=0;
	}
	
	count() {
		return this.countriesList.length;
	}
	
	/**
	 * determine if the argument contains a valid ISO 3166 country code
	 *
	 * @param {String} countryCode the country code to be checked for validity
	 * @return {boolean} true if countryCode is known else false
	 */
	isISO3166code = function(countryCode) {
		var found=false;
		
		if (this.use3CharCountries && countryCode.length==3) {
//			var i=0;
//			while (!found && i < this.countriesList.length) {
//				if (countryCode==this.countriesList[i].alpha3)
//					found=true;
//				i++;
//			}
			
			if (this.countriesList.find(elem => elem.alpha3==countryCode))
				found=true

//			this.countriesList.forEach(country => {
//				if (countryCode==country.alpha3) found=true;
//			});
		}
		else if (this.use2CharCountries && countryCode.length==2) {
//			var i=0;
//			while (!found && i < this.countriesList.length) {
//				if (countryCode==this.countriesList[i].alpha2)
//					found=true;
//				i++;
//			}				
			if (this.countriesList.find(elem => elem.alpha2==countryCode))
				found=true
//			this.countriesList.forEach(country => {
//				if (countryCode==country.alpha2) found=true;
//			});
		}
		return found;
	}
}