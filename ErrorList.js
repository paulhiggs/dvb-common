/**
 * Manages errors and warnings for the application
 * 
 */
module.exports = class ErrorList {
    counts=[]; messages=[]; countsWarn=[]; messagesWarn=[];
    
	delim='#';
	
    increment(key) {
        if (this.counts[key]===undefined)
            this.set(key,1);
        else this.counts[key]++;
    }
    set(key,value) {
        this.counts[key]=value;
    }
    incrementW(key) {
        if (this.countsWarn[key]===undefined)
            this.setW(key,1);
        else this.countsWarn[key]++;
    }
    setW(key,value) {
        this.countsWarn[key]=value;
    }
    push(message, key=null) {
        this.messages.push(message);
		if (key) this.increment(key);
    }
	pushCode(errno, message) {
        this.messages.push(errno+this.delim+message);
    }
    pushW(message, key=null) {
        this.messagesWarn.push(message);
		if (key) this.incrementW(key);
    }
	pushCodeW(errno, message) {
        this.messagesWarn.push(errno+this.delim+message);
    }
 }
