
/** equivalent "normal" JavaScript
MyNum = function(num) {
    this.num = num;
    this.boundGET = this.GET.bind(this);
};

MyNum.prototype.GET = function GET() {
    return this.num;
};
*/
class MyNum {
	constructor(num) {
    	this.num = num;
    	this.boundGET = this.GET.bind(this);
	}

	GET() {
    	return this.num;
    }
}

//////////////////////////////////////////////////////////////////////
section('1. method()');

const one = new MyNum('one');
console.log('one', one); // inspect it in the console!

log('one.GET()', () => one.GET()); // one
log('one.boundGET()', () => one.boundGET()); // one

//////////////////////////////////////////////////////////////////////
section('2. hijacked method()');

const two = {
    num: 2,
    GET: one.GET,
    boundGET: one.boundGET
};
console.log('two', two); // inspect it in the console!

log('two.GET()', () => two.GET()); // 2
log('two.boundGET()', () => two.boundGET()); // one

//////////////////////////////////////////////////////////////////////
section('3. hijacked method.call()');

log('one.GET.call(two)', () => one.GET.call(two)); // 2
log('one.boundGET.call(two)', () => one.boundGET.call(two)); // one

//////////////////////////////////////////////////////////////////////
section('4. prototype method.call()');

log('MyNum.prototype.GET.call(two)',
	() => MyNum.prototype.GET.call(two)); // 2
log('MyNum.prototype.boundGET.call(two)',
	() => MyNum.prototype.boundGET.call(two)); // error!)

//////////////////////////////////////////////////////////////////////
section('5. hijacked prototype method()');

const three = {
    num: 3,
    GET: MyNum.prototype.GET,
    boundGET: MyNum.prototype.boundGET // undefined
};
console.log('three', three); // inspect it in the console!

log('three.GET()', () => three.GET()); // 3
log('three.boundGET()', () => three.boundGET()); // error!

//////////////////////////////////////////////////////////////////////
section('6. ripped instance method()')

const fGET = one.GET;
const fBoundGET = one.boundGET;

log('fGET()', () => fGET()); // error
log('fBoundGET()', () => fBoundGET()); // one

//////////////////////////////////////////////////////////////////////
section('7. ripped prototype method()')

const pfGET = MyNum.prototype.GET;
const pfBoundGET = MyNum.prototype.boundGET;

log('pfGET()', () => pfGET()); // error
log('pfBoundGET()', () => pfBoundGET()); // error!

//////////////////////////////////////////////////////////////////////
function log(label, work) {
	let result;
    try {
    	result = work();
    } catch (err) {
    	result = err;
    }
    jQuery("body").append(jQuery('<p><code>' + label
    	+ '</code> yields <var>' + result + '</var></p>'));
}
function section(label) {
    jQuery("body").append(jQuery('<h4>' + label + '</h4>'));
}
