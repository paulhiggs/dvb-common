/*jshint esversion: 6 */
/**
 * Manages errors and warnings for the application
 * 
 */
module.exports = class ErrorList {
      
    constructor() {
        this.countsErr=[]; 
        this.countsWarn=[]; 
        this.errors=[];
        this.warnings=[];
    }
    increment(key) {
        if (this.countsErr[key]===undefined)
            this.set(key,1);
        else this.countsErr[key]++;
    }
    set(key,value) {
        this.countsErr[key]=value;
    }
    incrementW(key) {
        if (this.countsWarn[key]===undefined)
            this.setW(key,1);
        else this.countsWarn[key]++;
    }
    setW(key,value) {
        this.countsWarn[key]=value;
    }
    push(errMessage, key=null) {
        this.errors.push({code:null, message:errMessage, element:null});
		if (key) this.increment(key);
    }
	pushCode(errNo, errMessage, key=null) {
        this.errors.push({code:errNo, message:errMessage, element:null});
		if (key) this.increment(key);
    }
	pushCodeWithFragment(errNo, errMessage, fragment, key=null) {
        this.errors.push({code:errNo, message:errMessage, element:fragment});
		if (key) this.increment(key);
    }
	pushW(errMessage, key=null) {
        this.warnings.push({code:null, message:errMessage, element:null});
		if (key) this.incrementW(key);
    }
	pushCodeW(errNo, errMessage, key=null) {
        this.warnings.push({code:errNo, message:errMessage, element:null});
		if (key) this.increment(key);
    }
    pushCodeWWithFragment(errNo, errMessage, fragment, key=null) {
        this.warnings.push({code:errNo, message:errMessage, element:fragment});
		if (key) this.increment(key);
    }
    numErrors() { return this.errors.length; }
    numWarnings() { return this.warnings.length; }

    numCountsErr() { return this.countsErr.length; }
    numCountsWarn() { return this.countsWarn.length; }
 };
