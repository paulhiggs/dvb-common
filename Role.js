/*jshint esversion: 6 */
/**
 * Manages Classification Scheme checking
 * 
 */
const { throws } = require("assert");
const fs=require('fs');
const fetch=require('node-fetch');


module.exports = class Role {
    constructor () {
        this.values=[];
        addRoles.bind(this);
    }

    count() {
        return this.values.length;
    }

    
    /**
     * read a classification scheme from a URL and load its hierarical values into a linear list 
     *
     * @param {String} roleURL URL to the classification scheme
     */
    loadFromURL(rolesURL) {
        
		function handleErrors(response) {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response;
		}
		console.log(`retrieving Roles from ${csURL} via fetch()`);
        let vals=[];

		fetch(rolesURL)
			.then(handleErrors)
			.then(response => response.text())
			.then(roles => roles.split('\n').forEach(e=>{this.values.push(e);}))
			.catch(error => console.log(`error (${error}) retrieving ${rolesURL}`));
    }

    /**
     * read a classification scheme from a local file and load its hierarical values into a linear list 
     *
     * @param {String} roleFule the filename of the classification scheme
     */
    loadFromFile(rolesFile) {
        console.log(`reading Roles from ${rolesFile}`);

        fs.readFile(rolesFile, {encoding: "utf-8"}, (err, data)=> {
            if (!err) {
                data.split('\n').forEach(e=>{this.values.push(e);});
            }
            else console.log(err);
        });


    }


    /**
     * loads classification scheme values from either a local file or an URL based location and return them
     * as an array
     *        
     * @param {boolean} useURL        if true use the URL loading method else use the local file
     * @param {String} CSfilename     the filename of the classification scheme
     * @param {String} CSurl          URL to the classification scheme
     */
    loadRoles(useURL, CSfilename, CSurl){
        if (useURL)
		    this.loadFromURL(CSurl, leafNodesOnly);
	    else this.loadFromFile(CSfilename, leafNodesOnly);
    }


    /**
     * determines if the value is in the classification scheme
     *
     * @param {String} value           The value to check for existance
     * @returns {boolean} true if value is in the classification scheme
     */
    isIn(value) {
        return this.values.includes(value);
    }
};