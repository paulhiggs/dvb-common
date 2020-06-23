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
    push(message) {
        this.messages.push(message);
    }
	pushCode(errno, message) {
        this.messages.push(errno+this.delim+message);
    }
    pushW(message) {
        this.messagesWarn.push(message);
    }
	pushCodeW(errno, message) {
        this.messagesWarn.push(errno+this.delim+message);
    }
 }
