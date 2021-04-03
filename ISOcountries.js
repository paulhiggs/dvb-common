/*jshint esversion: 6 */

const fetch=require('node-fetch');
const fs=require("fs");


/**
 * load the countries list into the allowedCountries global array from the specified text
 *
 * @param {String} countryData the text of the country JSON data
 * @returns {object} processed JSON object of countries
 */
function loadCountries(countryData) {

	return JSON.parse(countryData, function (key, value) {
		if (key == "numeric") {
			return Number(value);
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
	 * @param {boolean} purge  erase the existing values before loading new
	 */
	loadCountriesFromFile(countriesFile, purge=false) {
		console.log(`reading countries from ${countriesFile}`);
		if (purge) this.reset();
		fs.readFile(countriesFile, {encoding: "utf-8"}, function(err,data){
			if (!err) {
				this.countriesList=loadCountries(data);
			} else {
				console.log(err);
			}
		}.bind(this));
	}
	
	/**
	 * load the countries list into the allowedCountries global array from the specified JSON file
	 *
	 * @param {String} countriesURL the URL to the file to load
	 * @param {boolean} purge  erase the existing values before loading new
	 */
	loadCountriesFromURL(countriesURL, purge=false) {
		console.log(`retrieving countries from ${countriesURL} using fetch()`);
		if (purge) this.reset();

		function handleErrors(response) {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response;
		}
		
		fetch(countriesURL)
			.then(handleErrors)
			.then(response => response.text())
			.then(responseText => this.countriesList=loadCountries(responseText))
			.catch(error => console.log(`error (${error}) retrieving ${countriesURL}`));
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
	 * @param {Boolean} caseSensitive ignofe case
	 * @return {boolean} true if countryCode is known else false
	 */
	isISO3166code(countryCode, caseSensitive=true) {
		let found=false, countryCode_lc=countryCode.toLowerCase();
		
		if (this.use3CharCountries && countryCode.length==3) {
			if (caseSensitive?this.countriesList.find(elem => elem.alpha3==countryCode):this.countriesList.find(elem => elem.alpha3.toLowerCase()==countryCode_lc))
				found=true;
		}
		else if (this.use2CharCountries && countryCode.length==2) {
			if (caseSensitive?this.countriesList.find(elem => elem.alpha2==countryCode):this.countriesList.find(elem => elem.alpha2.toLowerCase()==countryCode_lc))
				found=true;
		}
		return found;
	}
};