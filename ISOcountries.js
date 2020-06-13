
const XmlHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require("fs");


/**
 * load the countries list into the allowedCountries global array from the specified text
 *
 * @param {String} countryData the text of the country JSON data
 */
function loadCountries(countryData) {
	this.countriesList = JSON.parse(countryData, function (key, value) {
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

	countriesList=[];
	constructor() {
		loadCountries.bind(this);
	}
	
	/**
	 * load the countries list into the allowedCountries global array from the specified JSON file
	 *
	 * @param {String} countriesFile the file name to load
	 */
	loadCountriesFromFile = function(countriesFile) {
		console.log("reading countries from", countriesFile);
		fs.readFile(countriesFile, {encoding: "utf-8"}, function(err,data){
			if (!err) {
				loadCountries(data);
			} else {
				console.log(err);
			}
		});
	}
	
	/**
	 * load the countries list into the allowedCountries global array from the specified JSON file
	 *
	 * @param {String} countriesURL the URL to the file to load
	 */
	loadCountriesFromURL = function(countriesURL) {
		console.log("retrieving countries from", countriesURL);
		var xhttp = new XmlHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
				if (this.status == 200) {
					loadCountries(xhttp.responseText);
				}
				else console.log("error ("+this.status+") retrieving "+countriesURL);	
			}
		};
		xhttp.open("GET", countriesURL, true);
		xhttp.send();	
	}

	reset() {
		this.countriesList.length=0;
	}
	
	/**
	 * determine if the argument contains a valid ISO 3166 country code
	 *
	 * @param {String} countryCode the country code to be checked for validity
	 * @return {boolean} true if countryCode is known else false
	 */
	isISO3166code = function(countryCode) {
		if (countryCode.length!=3) {
			return false;
		}
		var found=false;
		countriesList.forEach(country => {
			if (countryCode==country.alpha3) found=true;
		});
		return found;
	}
}