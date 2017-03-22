Person = function(emotion) {
    this.emotion = emotion;
    this.boundUseArm = this.useArm.bind(this);
};

Person.prototype.useArm = function useArm() {
    if (this == null || this.emotion == null) {
        return 'disembodied arm?';
    }
    switch (this.emotion) {
        case 'happy': return 'wave';
        case 'angry': return 'the bird';
        case 'guilty': return 'cover face';
        default: throw Error('unknown emotion: ' + this.emotion);
    }
};

//////////////////////////////////////////////////////////////////////
section('1. method()');

lindsay = new Person('happy');
console.log('lindsay', lindsay); // inspect it in the console!

log('lindsay.useArm()'); // wave
log('lindsay.boundUseArm()'); // wave

//////////////////////////////////////////////////////////////////////
section('the bird. hijacked method()');

barney = {
    emotion: 'angry',
    useArm: lindsay.useArm,
    boundUseArm: lindsay.boundUseArm
};
console.log('barney', barney); // inspect it in the console!

log('barney.useArm()'); // the bird
log('barney.boundUseArm()'); // wave

//////////////////////////////////////////////////////////////////////
section('cover face. hijacked method.call()');

log('lindsay.useArm.call(barney)'); // the bird
log('lindsay.boundUseArm.call(barney)'); // wave

//////////////////////////////////////////////////////////////////////
section('4. prototype method.call()');

log('Person.prototype.useArm.call(barney)'); // the bird
log('Person.prototype.boundUseArm.call(barney)'); // error!

//////////////////////////////////////////////////////////////////////
section('5. hijacked prototype method()');

brenna = {
    emotion: 'guilty',
    useArm: Person.prototype.useArm,
    boundUseArm: Person.prototype.boundUseArm // undefined
};
console.log('brenna', brenna); // inspect it in the console!

log('brenna.useArm()'); // cover face
log('brenna.boundUseArm()'); // error!

//////////////////////////////////////////////////////////////////////
section('6. ripped instance method()');

fUseArm = lindsay.useArm;
fBoundUseArm = lindsay.boundUseArm;

log('fUseArm()'); // disembodied arm?
log('fBoundUseArm()'); // wave

//////////////////////////////////////////////////////////////////////
section('7. ripped prototype method()');

pfUseArm = Person.prototype.useArm;
pfBoundUseArm = Person.prototype.boundUseArm;

log('pfUseArm()'); // disembodied arm?
log('pfBoundUseArm()'); // error!

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
