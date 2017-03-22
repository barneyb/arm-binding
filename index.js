MyNum = function(num) {
    this.num = num;
    this.boundGET = this.GET.bind(this);
};

MyNum.prototype.GET = function GET() {
    return this.num;
};

//////////////////////////////////////////////////////////////////////
section('1. method()');

one = new MyNum('one');
console.log('one', one); // inspect it in the console!

log('one.GET()'); // one
log('one.boundGET()'); // one

//////////////////////////////////////////////////////////////////////
section('2. hijacked method()');

two = {
    num: 2,
    GET: one.GET,
    boundGET: one.boundGET
};
console.log('two', two); // inspect it in the console!

log('two.GET()'); // 2
log('two.boundGET()'); // one

//////////////////////////////////////////////////////////////////////
section('3. hijacked method.call()');

log('one.GET.call(two)'); // 2
log('one.boundGET.call(two)'); // one

//////////////////////////////////////////////////////////////////////
section('4. prototype method.call()');

log('MyNum.prototype.GET.call(two)'); // 2
log('MyNum.prototype.boundGET.call(two)'); // error!

//////////////////////////////////////////////////////////////////////
section('5. hijacked prototype method()');

three = {
    num: 3,
    GET: MyNum.prototype.GET,
    boundGET: MyNum.prototype.boundGET // undefined
};
console.log('three', three); // inspect it in the console!

log('three.GET()'); // 3
log('three.boundGET()'); // error!

//////////////////////////////////////////////////////////////////////
section('6. ripped instance method()');

fGET = one.GET;
fBoundGET = one.boundGET;

log('fGET()'); // undefined
log('fBoundGET()'); // one

//////////////////////////////////////////////////////////////////////
section('7. ripped prototype method()');

pfGET = MyNum.prototype.GET;
pfBoundGET = MyNum.prototype.boundGET;

log('pfGET()'); // undefined
log('pfBoundGET()'); // error!

//////////////////////////////////////////////////////////////////////
function log(script) {
	var result;
    try {
    	result = eval(script); // don't look! terrible things!
    } catch (err) {
    	result = err;
    }
    jQuery("body").append(jQuery('<p><code>' + script + '</code> yields <var>' + result + '</var></p>'));
}
function section(label) {
    jQuery("body").append(jQuery('<h4>' + label + '</h4>'));
}
