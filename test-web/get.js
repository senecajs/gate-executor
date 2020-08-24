(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GateExecutor = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).GateExecutor=t()}}((function(){var t={exports:{}};return function(e){!function(n){"object"==typeof t.exports?t.exports=n():("undefined"!=typeof window?window:void 0!==e?e:"undefined"!=typeof self?self:this).GateExecutor=n()}((function(){var t,e,n,o,r=(t=function(t,e){(function(t,n){var o=u.nextTick,r=(Function.prototype.apply,Array.prototype.slice),i={},l=0;function f(t,e){this._id=t,this._clearFn=e}f.prototype.unref=f.prototype.ref=function(){},f.prototype.close=function(){this._clearFn.call(window,this._id)},e.setImmediate="function"==typeof t?t:function(t){var n=l++,u=!(arguments.length<2)&&r.call(arguments,1);return i[n]=!0,o((function(){i[n]&&(u?t.apply(null,u):t.call(null),e.clearImmediate(n))})),n},e.clearImmediate="function"==typeof n?n:function(t){delete i[t]}}).call(this,r({}).setImmediate,r({}).clearImmediate)},function(n){return e||t(e={exports:{},parent:n},e.exports),e.exports}),i={},u={},l=u={};function f(){throw new Error("setTimeout has not been defined")}function c(){throw new Error("clearTimeout has not been defined")}function a(t){if(n===setTimeout)return setTimeout(t,0);if((n===f||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:f}catch(e){n=f}try{o="function"==typeof clearTimeout?clearTimeout:c}catch(e){o=c}}();var s,d=[],p=!1,h=-1;function y(){p&&s&&(p=!1,s.length?d=s.concat(d):h=-1,d.length&&m())}function m(){if(!p){var t=a(y);p=!0;for(var n=d.length;n;){for(s=d,d=[];++h<n;)s&&s[h].run();h=-1,n=d.length}s=null,p=!1,function(t){if(o===clearTimeout)return clearTimeout(t);if((o===c||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(t);try{o(t)}catch(e){try{return o.call(null,t)}catch(e){return o.call(this,t)}}}(t)}}function g(t,e){this.fun=t,this.array=e}function w(){}l.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];d.push(new g(t,e)),1!==d.length||p||a(m)},g.prototype.run=function(){this.fun.apply(null,this.array)},l.title="browser",l.browser=!0,l.env={},l.argv=[],l.version="",l.versions={},l.on=w,l.addListener=w,l.once=w,l.off=w,l.removeListener=w,l.removeAllListeners=w,l.emit=w,l.prependListener=w,l.prependOnceListener=w,l.listeners=function(t){return[]},l.binding=function(t){throw new Error("process.binding is not supported")},l.cwd=function(){return"/"},l.chdir=function(t){throw new Error("process.chdir is not supported")},l.umask=function(){return 0};var v={};return function(t){"use strict";function e(n,o){var r=this;i("object"==typeof n),i("number"==typeof o),r.id=++o,r.options=n;var u=[],l={lookup:{},history:[]},f=[],c={work_counter:0,gate:!1,running:!1,clear:null,firstclear:null,tm_in:null};function a(){if(c.running){r.isclear()||c.tm_in||(c.tm_in=setInterval(d,n.interval));do{var t=!1,e=null;c.gate||(e=u.shift()),e&&(i("object"==typeof e),i("string"==typeof e.id),i("function"==typeof e.fn),l.lookup[e.id]=e,l.history.push(e),c.gate=e.gate,e.start=Date.now(),e.callback=s(e),f.push(e),e.fn(e.callback),t=!0)}while(t)}}function s(e){return function(){if(!e.done){for(e.done=!0,delete l.lookup[e.id];l.history[0]&&l.history[0].done;)l.history.shift();for(;f[0]&&f[0].done;)f.shift();if(e.gate&&(c.gate=!1),0===u.length&&0===l.history.length){if(clearInterval(c.tm_in),c.tm_in=null,c.firstclear){var n=c.firstclear;c.firstclear=null,n()}c.clear&&c.clear()}t(a)}}}function d(){for(var t=Date.now(),e=null,n=0;n<f.length;++n)!(e=f[n]).gate&&!e.done&&e.tm<t-e.start&&(e.ontm&&e.ontm(e.tm,e.start,t),e.callback())}r.start=function(e){return i(null==e||"function"==typeof e),t((function(){c.running=!0,e&&(c.firstclear=e),a()})),r},r.pause=function(){c.running=!1},r.clear=function(t){return i("function"==typeof t),c.clear=t,r},r.isclear=function(){return 0===u.length&&0===l.history.length},r.add=function(e){return i("object"==typeof e),i("function"==typeof e.fn),i(null==e.id||"string"==typeof e.id),i(null==e.tm||"number"==typeof e.tm),i(null==e.dn||"string"==typeof e.dn),c.work_counter+=1,e.id=e.id||""+c.work_counter,e.ge=r.id,e.tm=null==e.tm?n.timeout:e.tm,e.dn=e.dn||e.fn.name||""+Date.now(),e.ctxt={},u.push(e),c.running&&t(a),r},r.gate=function(){var t=new e(n,o);return r.add({gate:t,fn:function(e){t.start(e)}}),t},r.state=function(){for(var t=[],e=0;e<l.history.length;++e){var n=l.history[e];n.done||t.push({s:"a",ge:n.ge,dn:n.dn,id:n.id})}for(var o=0;o<u.length;++o){var r=u[o];r.gate?t.push(r.gate.state()):t.push({s:"w",ge:r.ge,dn:r.dn,id:r.id})}return t.internal={qlen:u.length,hlen:l.history.length,klen:Object.keys(l.lookup).length,tlen:d.length},t}}i="function"==typeof i?i:function(){},v=function(t){return(t=t||{}).interval=null==t.interval?111:t.interval,t.timeout=null==t.timeout?2222:t.timeout,i("object"==typeof t),i("number"==typeof t.interval),i("number"==typeof t.timeout),i(0<t.interval),i(0<t.timeout),new e(t,0)}}.call(this,r({}).setImmediate),v}))}.call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{}),t=t.exports}));
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (Buffer,__dirname){
'use strict';

const Util = require('util');

const Hoek = require('@hapi/hoek');


const internals = {
    flags: ['not', 'once', 'only', 'part', 'shallow'],
    grammar: ['a', 'an', 'and', 'at', 'be', 'have', 'in', 'to'],
    locations: {},
    count: 0
};


// Global settings

exports.settings = {
    truncateMessages: false,
    comparePrototypes: false
};


// Utilities

exports.fail = function (message) {

    throw new Error(message);
};


exports.count = function () {

    return internals.count;
};


exports.incomplete = function () {

    const locations = Object.keys(internals.locations);
    return locations.length ? locations : null;
};


internals.atNamedRx = /^\s*at (?:async )?[^(/]*\(?(.+)\:(\d+)\:(\d+)\)?$/;


internals.atUnnamedRx = /^\s*at (?:async )?(.+)\:(\d+)\:(\d+)\)?$/;


exports.thrownAt = function (error) {

    error = error || new Error();
    const stack = typeof error.stack === 'string' ? error.stack : '';
    const frame = stack.replace(error.toString(), '').split('\n').slice(1).filter(internals.filterLocal)[0] || '';
    const at = frame.match(frame.includes('(') ? internals.atNamedRx : internals.atUnnamedRx);
    return Array.isArray(at) ? {
        filename: at[1],
        line: at[2],
        column: at[3]
    } : undefined;
};


internals.filterLocal = function (line) {

    return line.indexOf(__dirname) === -1;
};


// Expect interface

exports.expect = function (value, prefix) {

    const at = exports.thrownAt();
    const location = at.filename + ':' + at.line + '.' + at.column;
    internals.locations[location] = true;
    ++internals.count;
    return new internals.Assertion(value, prefix, location, at);
};


internals.Assertion = function (ref, prefix, location, at) {

    this._ref = ref;
    this._prefix = prefix || '';
    this._location = location;
    this._at = at;
    this._flags = {};
};


internals.Assertion.prototype.assert = function (result, verb, actual, expected) {

    delete internals.locations[this._location];

    if (this._flags.not ? !result : result) {
        this._flags = {};
        return this;
    }

    if (verb === 'exist' &&
        this._flags.not &&
        this._ref instanceof Error) {

        const original = this._ref;
        original.at = exports.thrownAt();

        throw original;
    }

    let message = '';

    if (this._prefix) {
        message += this._prefix + ': ';
    }

    message += 'Expected ' + internals.display(this._ref) + ' to ';

    if (this._flags.not) {
        message += 'not ';
    }

    message += verb;

    if (this._flags.once) {
        message += ' once';
    }

    if (arguments.length === 3) {           // 'actual' without 'expected'
        message += ' but got ' + internals.display(actual);
    }

    const error = new Error(message);
    Error.captureStackTrace(error, this.assert);
    error.actual = actual;
    error.expected = expected;
    error.at = exports.thrownAt(error) || this._at;
    throw error;
};


internals.flags.forEach((word) => {

    Object.defineProperty(internals.Assertion.prototype, word, {
        get: function () {

            this._flags[word] = !this._flags[word];
            return this;
        },
        configurable: true
    });
});


internals.grammar.forEach((word) => {

    Object.defineProperty(internals.Assertion.prototype, word, {
        get: function () {

            return this;
        },
        configurable: true
    });
});


internals.addMethod = function (names, fn) {

    const method = function (name) {

        internals.Assertion.prototype[name] = fn;
    };

    names = [].concat(names);
    names.forEach(method);
};


['arguments', 'array', 'boolean', 'buffer', 'date', 'function', 'number', 'regexp', 'string', 'object'].forEach((word) => {

    const article = ['a', 'e', 'i', 'o', 'u'].indexOf(word[0]) !== -1 ? 'an ' : 'a ';
    const method = function () {

        const type = internals.type(this._ref);
        return this.assert(type === word, 'be ' + article + word, type);
    };

    internals.addMethod(word, method);
});


internals.addMethod('error', function (...args /* type, message */) {

    const type = args.length && typeof args[0] !== 'string' && !(args[0] instanceof RegExp) ? args[0] : Error;
    const lastArg = args[1] || args[0];
    const message = typeof lastArg === 'string' || lastArg instanceof RegExp ? lastArg : null;
    const err = this._ref;

    if (!this._flags.not ||
        message === null) {

        this.assert(err instanceof type, 'be an error with ' + (type.name || 'provided') + ' type');
    }

    if (message !== null) {
        const error = err.message || '';
        this.assert(typeof message === 'string' ? error === message : error.match(message), 'be an error with specified message', error, message);
    }
});


[true, false, null, undefined].forEach((value) => {

    const name = Util.inspect(value);
    const method = function () {

        return this.assert(this._ref === value, 'be ' + name);
    };

    internals.addMethod(name, method);
});


internals.nan = function () {

    return this.assert(Number.isNaN(this._ref), 'be NaN');
};

internals.addMethod('NaN', internals.nan);


internals.include = function (value) {

    internals.assert(this, arguments.length === 1, 'Can only assert include with a single parameter');

    this._flags.deep = !this._flags.shallow;
    this._flags.part = this._flags.hasOwnProperty('part') ? this._flags.part : false;
    return this.assert(Hoek.contain(this._ref, value, this._flags), 'include ' + internals.display(value));
};

internals.addMethod(['include', 'includes', 'contain', 'contains'], internals.include);


internals.endWith = function (value) {

    internals.assert(this, typeof this._ref === 'string' && typeof value === 'string', 'Can only assert endsWith on a string, with a string');

    const comparator = this._ref.slice(-value.length);
    return this.assert(comparator === value, 'endWith ' + internals.display(value));
};

internals.addMethod(['endWith', 'endsWith'], internals.endWith);


internals.startWith = function (value) {

    internals.assert(this, typeof this._ref === 'string' && typeof value === 'string', 'Can only assert startsWith on a string, with a string');

    const comparator = this._ref.slice(0, value.length);
    return this.assert(comparator === value, 'startWith ' + internals.display(value));
};

internals.addMethod(['startWith', 'startsWith'], internals.startWith);


internals.exist = function () {

    return this.assert(this._ref !== null && this._ref !== undefined, 'exist');
};

internals.addMethod(['exist', 'exists'], internals.exist);


internals.empty = function () {

    internals.assert(this, typeof this._ref === 'object' || typeof this._ref === 'string', 'Can only assert empty on object, array or string');

    const length = this._ref.length !== undefined ? this._ref.length : Object.keys(this._ref).length;
    return this.assert(!length, 'be empty');
};

internals.addMethod('empty', internals.empty);


internals.length = function (size) {

    internals.assert(this, (typeof this._ref === 'object' && this._ref !== null) || typeof this._ref === 'string', 'Can only assert length on object, array or string');

    const length = this._ref.length !== undefined ? this._ref.length : Object.keys(this._ref).length;
    return this.assert(length === size, 'have a length of ' + size, length);
};

internals.addMethod('length', internals.length);


internals.equal = function (value, options) {

    options = options || {};
    const settings = Hoek.applyToDefaults({ prototype: exports.settings.comparePrototypes, deepFunction: true }, options);

    const compare = this._flags.shallow ? (a, b) => a === b
        : (a, b) => Hoek.deepEqual(a, b, settings);

    return this.assert(compare(this._ref, value), `equal specified value: ${internals.display(value)}`, this._ref, value);
};

internals.addMethod(['equal', 'equals'], internals.equal);


internals.above = function (value) {

    return this.assert(this._ref > value, 'be above ' + value);
};

internals.addMethod(['above', 'greaterThan'], internals.above);


internals.least = function (value) {

    return this.assert(this._ref >= value, 'be at least ' + value);
};

internals.addMethod(['least', 'min'], internals.least);


internals.below = function (value) {

    return this.assert(this._ref < value, 'be below ' + value);
};

internals.addMethod(['below', 'lessThan'], internals.below);


internals.most = function (value) {

    return this.assert(this._ref <= value, 'be at most ' + value);
};

internals.addMethod(['most', 'max'], internals.most);


internals.within = function (from, to) {

    return this.assert(this._ref >= from && this._ref <= to, 'be within ' + from + '..' + to);
};

internals.addMethod(['within', 'range'], internals.within);


internals.between = function (from, to) {

    return this.assert(this._ref > from && this._ref < to, 'be between ' + from + '..' + to);
};

internals.addMethod('between', internals.between);


internals.above = function (value, delta) {

    internals.assert(this, internals.type(this._ref) === 'number', 'Can only assert about on numbers');
    internals.assert(this, internals.type(value) === 'number' && internals.type(delta) === 'number', 'About assertion requires two number arguments');

    return this.assert(Math.abs(this._ref - value) <= delta, 'be about ' + value + ' \u00b1' + delta);
};

internals.addMethod('about', internals.above);


internals.instanceof = function (type) {

    return this.assert(this._ref instanceof type, 'be an instance of ' + (type.name || 'provided type'));
};

internals.addMethod(['instanceof', 'instanceOf'], internals.instanceof);


internals.match = function (regex) {

    return this.assert(regex.exec(this._ref), 'match ' + regex);
};

internals.addMethod(['match', 'matches'], internals.match);


internals.satisfy = function (validator) {

    return this.assert(validator(this._ref), 'satisfy rule');
};

internals.addMethod(['satisfy', 'satisfies'], internals.satisfy);


internals.throw = function (...args /* type, message */) {

    internals.assert(this, typeof this._ref === 'function', 'Can only assert throw on functions');
    internals.assert(this, !this._flags.not || !args.length, 'Cannot specify arguments when expecting not to throw');

    const type = args.length && typeof args[0] !== 'string' && !(args[0] instanceof RegExp) ? args[0] : null;
    const lastArg = args[1] || args[0];
    const message = typeof lastArg === 'string' || lastArg instanceof RegExp ? lastArg : null;

    let thrown = false;

    try {
        this._ref();
    }
    catch (err) {
        thrown = true;

        if (type) {
            this.assert(err instanceof type, 'throw ' + (type.name || 'provided type'));
        }

        if (message !== null) {
            const error = err.message || '';
            this.assert(typeof message === 'string' ? error === message : error.match(message), 'throw an error with specified message', error, message);
        }

        this.assert(thrown, 'throw an error', err);
        return err;
    }

    return this.assert(thrown, 'throw an error');
};

internals.addMethod(['throw', 'throws'], internals.throw);


internals.reject = async function (...args/* type, message */) {

    try {
        internals.assert(this, internals.isPromise(this._ref), 'Can only assert reject on promises');

        const type = args.length && typeof args[0] !== 'string' && !(args[0] instanceof RegExp) ? args[0] : null;
        const lastArg = args[1] || args[0];
        const message = typeof lastArg === 'string' || lastArg instanceof RegExp ? lastArg : null;

        let thrown = null;
        try {
            await this._ref;
        }
        catch (err) {
            thrown = err;
        }

        internals.assert(this, !this._flags.not || !arguments.length, 'Cannot specify arguments when expecting not to reject');

        if (thrown) {

            internals.assert(this, arguments.length < 2 || message, 'Can not assert with invalid message argument type');
            internals.assert(this, arguments.length < 1 || message !== null || typeof type === 'function', 'Can not assert with invalid type argument');

            if (type) {
                this.assert(thrown instanceof type, 'reject with ' + (type.name || 'provided type'));
            }

            if (message !== null) {
                const error = thrown.message || '';
                this.assert(typeof message === 'string' ? error === message : error.match(message), 'reject with an error with specified message', error, message);
            }

            this.assert(thrown, 'reject with an error', thrown);
        }

        this.assert(thrown, 'reject with an error');
        return thrown;
    }
    catch (err) {
        return new Promise((resolve, reject) => {

            reject(err);
        });
    }
};

internals.addMethod(['reject', 'rejects'], internals.reject);


internals.isPromise = function (promise) {

    return promise && typeof promise.then === 'function';
};


internals.display = function (value) {

    const string = value instanceof Error
        ? `[${value.toString()}]`
        : internals.isPromise(value)
            ? '[Promise]'
            : typeof value === 'function'
                ? '[Function]'
                : Util.inspect(value);

    if (!exports.settings.truncateMessages ||
        string.length <= 40) {

        return string;
    }

    if (Array.isArray(value)) {
        return '[Array(' + value.length + ')]';
    }

    if (typeof value === 'object') {
        const keys = Object.keys(value);
        return '{ Object (' + (keys.length > 2 ? (keys.splice(0, 2).join(', ') + ', ...') : keys.join(', ')) + ') }';
    }

    return string.slice(0, 40) + '...\'';
};


internals.natives = {
    '[object Arguments]': 'arguments',
    '[object Array]': 'array',
    '[object AsyncFunction]': 'function',
    '[object Date]': 'date',
    '[object Function]': 'function',
    '[object Number]': 'number',
    '[object RegExp]': 'regexp',
    '[object String]': 'string'
};


internals.type = function (value) {

    if (value === null) {
        return 'null';
    }

    if (value === undefined) {
        return 'undefined';
    }

    if (Buffer.isBuffer(value)) {
        return 'buffer';
    }

    const name = Object.prototype.toString.call(value);
    if (internals.natives[name]) {
        return internals.natives[name];
    }

    if (value === Object(value)) {
        return 'object';
    }

    return typeof value;
};


internals.assert = function (assertion, condition, error) {

    if (!condition) {
        delete internals.locations[assertion._location];
        Hoek.assert(condition, error);
    }
};

}).call(this,{"isBuffer":require("../../../is-buffer/index.js")},"/node_modules/@hapi/code/lib")
},{"../../../is-buffer/index.js":63,"@hapi/hoek":17,"util":80}],3:[function(require,module,exports){
'use strict';

const Assert = require('./assert');
const Clone = require('./clone');
const Merge = require('./merge');
const Reach = require('./reach');


const internals = {};


module.exports = function (defaults, source, options = {}) {

    Assert(defaults && typeof defaults === 'object', 'Invalid defaults value: must be an object');
    Assert(!source || source === true || typeof source === 'object', 'Invalid source value: must be true, falsy or an object');
    Assert(typeof options === 'object', 'Invalid options: must be an object');

    if (!source) {                                                  // If no source, return null
        return null;
    }

    if (options.shallow) {
        return internals.applyToDefaultsWithShallow(defaults, source, options);
    }

    const copy = Clone(defaults);

    if (source === true) {                                          // If source is set to true, use defaults
        return copy;
    }

    const nullOverride = options.nullOverride !== undefined ? options.nullOverride : false;
    return Merge(copy, source, { nullOverride, mergeArrays: false });
};


internals.applyToDefaultsWithShallow = function (defaults, source, options) {

    const keys = options.shallow;
    Assert(Array.isArray(keys), 'Invalid keys');

    const seen = new Map();
    const merge = source === true ? null : new Set();

    for (let key of keys) {
        key = Array.isArray(key) ? key : key.split('.');            // Pre-split optimization

        const ref = Reach(defaults, key);
        if (ref &&
            typeof ref === 'object') {

            seen.set(ref, merge && Reach(source, key) || ref);
        }
        else if (merge) {
            merge.add(key);
        }
    }

    const copy = Clone(defaults, {}, seen);

    if (!merge) {
        return copy;
    }

    for (const key of merge) {
        internals.reachCopy(copy, source, key);
    }

    return Merge(copy, source, { mergeArrays: false, nullOverride: false });
};


internals.reachCopy = function (dst, src, path) {

    for (const segment of path) {
        if (!(segment in src)) {
            return;
        }

        src = src[segment];
    }

    const value = src;
    let ref = dst;
    for (let i = 0; i < path.length - 1; ++i) {
        const segment = path[i];
        if (typeof ref[segment] !== 'object') {
            ref[segment] = {};
        }

        ref = ref[segment];
    }

    ref[path[path.length - 1]] = value;
};

},{"./assert":4,"./clone":7,"./merge":20,"./reach":22}],4:[function(require,module,exports){
'use strict';

const AssertError = require('./error');

const internals = {};


module.exports = function (condition, ...args) {

    if (condition) {
        return;
    }

    if (args.length === 1 &&
        args[0] instanceof Error) {

        throw args[0];
    }

    throw new AssertError(args);
};

},{"./error":10}],5:[function(require,module,exports){
(function (process){
'use strict';

const internals = {};


module.exports = internals.Bench = class {

    constructor() {

        this.ts = 0;
        this.reset();
    }

    reset() {

        this.ts = internals.Bench.now();
    }

    elapsed() {

        return internals.Bench.now() - this.ts;
    }

    static now() {

        const ts = process.hrtime();
        return (ts[0] * 1e3) + (ts[1] / 1e6);
    }
};

}).call(this,require('_process'))
},{"_process":73}],6:[function(require,module,exports){
'use strict';

const Ignore = require('./ignore');


const internals = {};


module.exports = function () {

    return new Promise(Ignore);         // $lab:coverage:ignore$
};

},{"./ignore":16}],7:[function(require,module,exports){
(function (Buffer){
'use strict';

const Reach = require('./reach');
const Types = require('./types');
const Utils = require('./utils');


const internals = {
    needsProtoHack: new Set([Types.set, Types.map, Types.weakSet, Types.weakMap])
};


module.exports = internals.clone = function (obj, options = {}, _seen = null) {

    if (typeof obj !== 'object' ||
        obj === null) {

        return obj;
    }

    let clone = internals.clone;
    let seen = _seen;

    if (options.shallow) {
        if (options.shallow !== true) {
            return internals.cloneWithShallow(obj, options);
        }

        clone = (value) => value;
    }
    else if (seen) {
        const lookup = seen.get(obj);
        if (lookup) {
            return lookup;
        }
    }
    else {
        seen = new Map();
    }

    // Built-in object types

    const baseProto = Types.getInternalProto(obj);
    if (baseProto === Types.buffer) {
        return Buffer && Buffer.from(obj);              // $lab:coverage:ignore$
    }

    if (baseProto === Types.date) {
        return new Date(obj.getTime());
    }

    if (baseProto === Types.regex) {
        return new RegExp(obj);
    }

    // Generic objects

    const newObj = internals.base(obj, baseProto, options);
    if (newObj === obj) {
        return obj;
    }

    if (seen) {
        seen.set(obj, newObj);                              // Set seen, since obj could recurse
    }

    if (baseProto === Types.set) {
        for (const value of obj) {
            newObj.add(clone(value, options, seen));
        }
    }
    else if (baseProto === Types.map) {
        for (const [key, value] of obj) {
            newObj.set(key, clone(value, options, seen));
        }
    }

    const keys = Utils.keys(obj, options);
    for (const key of keys) {
        if (key === '__proto__') {
            continue;
        }

        if (baseProto === Types.array &&
            key === 'length') {

            newObj.length = obj.length;
            continue;
        }

        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (descriptor) {
            if (descriptor.get ||
                descriptor.set) {

                Object.defineProperty(newObj, key, descriptor);
            }
            else if (descriptor.enumerable) {
                newObj[key] = clone(obj[key], options, seen);
            }
            else {
                Object.defineProperty(newObj, key, { enumerable: false, writable: true, configurable: true, value: clone(obj[key], options, seen) });
            }
        }
        else {
            Object.defineProperty(newObj, key, {
                enumerable: true,
                writable: true,
                configurable: true,
                value: clone(obj[key], options, seen)
            });
        }
    }

    return newObj;
};


internals.cloneWithShallow = function (source, options) {

    const keys = options.shallow;
    options = Object.assign({}, options);
    options.shallow = false;

    const seen = new Map();

    for (const key of keys) {
        const ref = Reach(source, key);
        if (typeof ref === 'object' ||
            typeof ref === 'function') {

            seen.set(ref, ref);
        }
    }

    return internals.clone(source, options, seen);
};


internals.base = function (obj, baseProto, options) {

    if (options.prototype === false) {                  // Defaults to true
        if (internals.needsProtoHack.has(baseProto)) {
            return new baseProto.constructor();
        }

        return baseProto === Types.array ? [] : {};
    }

    const proto = Object.getPrototypeOf(obj);
    if (proto &&
        proto.isImmutable) {

        return obj;
    }

    if (baseProto === Types.array) {
        const newObj = [];
        if (proto !== baseProto) {
            Object.setPrototypeOf(newObj, proto);
        }

        return newObj;
    }

    if (internals.needsProtoHack.has(baseProto)) {
        const newObj = new proto.constructor();
        if (proto !== baseProto) {
            Object.setPrototypeOf(newObj, proto);
        }

        return newObj;
    }

    return Object.create(proto);
};

}).call(this,require("buffer").Buffer)
},{"./reach":22,"./types":25,"./utils":26,"buffer":30}],8:[function(require,module,exports){
'use strict';

const Assert = require('./assert');
const DeepEqual = require('./deepEqual');
const EscapeRegex = require('./escapeRegex');
const Utils = require('./utils');


const internals = {};


module.exports = function (ref, values, options = {}) {        // options: { deep, once, only, part, symbols }

    /*
        string -> string(s)
        array -> item(s)
        object -> key(s)
        object -> object (key:value)
    */

    if (typeof values !== 'object') {
        values = [values];
    }

    Assert(!Array.isArray(values) || values.length, 'Values array cannot be empty');

    // String

    if (typeof ref === 'string') {
        return internals.string(ref, values, options);
    }

    // Array

    if (Array.isArray(ref)) {
        return internals.array(ref, values, options);
    }

    // Object

    Assert(typeof ref === 'object', 'Reference must be string or an object');
    return internals.object(ref, values, options);
};


internals.array = function (ref, values, options) {

    if (!Array.isArray(values)) {
        values = [values];
    }

    if (!ref.length) {
        return false;
    }

    if (options.only &&
        options.once &&
        ref.length !== values.length) {

        return false;
    }

    let compare;

    // Map values

    const map = new Map();
    for (const value of values) {
        if (!options.deep ||
            !value ||
            typeof value !== 'object') {

            const existing = map.get(value);
            if (existing) {
                ++existing.allowed;
            }
            else {
                map.set(value, { allowed: 1, hits: 0 });
            }
        }
        else {
            compare = compare || internals.compare(options);

            let found = false;
            for (const [key, existing] of map.entries()) {
                if (compare(key, value)) {
                    ++existing.allowed;
                    found = true;
                    break;
                }
            }

            if (!found) {
                map.set(value, { allowed: 1, hits: 0 });
            }
        }
    }

    // Lookup values

    let hits = 0;
    for (const item of ref) {
        let match;
        if (!options.deep ||
            !item ||
            typeof item !== 'object') {

            match = map.get(item);
        }
        else {
            compare = compare || internals.compare(options);

            for (const [key, existing] of map.entries()) {
                if (compare(key, item)) {
                    match = existing;
                    break;
                }
            }
        }

        if (match) {
            ++match.hits;
            ++hits;

            if (options.once &&
                match.hits > match.allowed) {

                return false;
            }
        }
    }

    // Validate results

    if (options.only &&
        hits !== ref.length) {

        return false;
    }

    for (const match of map.values()) {
        if (match.hits === match.allowed) {
            continue;
        }

        if (match.hits < match.allowed &&
            !options.part) {

            return false;
        }
    }

    return !!hits;
};


internals.object = function (ref, values, options) {

    Assert(options.once === undefined, 'Cannot use option once with object');

    const keys = Utils.keys(ref, options);
    if (!keys.length) {
        return false;
    }

    // Keys list

    if (Array.isArray(values)) {
        return internals.array(keys, values, options);
    }

    // Key value pairs

    const symbols = Object.getOwnPropertySymbols(values).filter((sym) => values.propertyIsEnumerable(sym));
    const targets = [...Object.keys(values), ...symbols];

    const compare = internals.compare(options);
    const set = new Set(targets);

    for (const key of keys) {
        if (!set.has(key)) {
            if (options.only) {
                return false;
            }

            continue;
        }

        if (!compare(values[key], ref[key])) {
            return false;
        }

        set.delete(key);
    }

    if (set.size) {
        return options.part ? set.size < targets.length : false;
    }

    return true;
};


internals.string = function (ref, values, options) {

    // Empty string

    if (ref === '') {
        return values.length === 1 && values[0] === '' ||               // '' contains ''
            !options.once && !values.some((v) => v !== '');             // '' contains multiple '' if !once
    }

    // Map values

    const map = new Map();
    const patterns = [];

    for (const value of values) {
        Assert(typeof value === 'string', 'Cannot compare string reference to non-string value');

        if (value) {
            const existing = map.get(value);
            if (existing) {
                ++existing.allowed;
            }
            else {
                map.set(value, { allowed: 1, hits: 0 });
                patterns.push(EscapeRegex(value));
            }
        }
        else if (options.once ||
            options.only) {

            return false;
        }
    }

    if (!patterns.length) {                     // Non-empty string contains unlimited empty string
        return true;
    }

    // Match patterns

    const regex = new RegExp(`(${patterns.join('|')})`, 'g');
    const leftovers = ref.replace(regex, ($0, $1) => {

        ++map.get($1).hits;
        return '';                              // Remove from string
    });

    // Validate results

    if (options.only &&
        leftovers) {

        return false;
    }

    let any = false;
    for (const match of map.values()) {
        if (match.hits) {
            any = true;
        }

        if (match.hits === match.allowed) {
            continue;
        }

        if (match.hits < match.allowed &&
            !options.part) {

            return false;
        }

        // match.hits > match.allowed

        if (options.once) {
            return false;
        }
    }

    return !!any;
};


internals.compare = function (options) {

    if (!options.deep) {
        return internals.shallow;
    }

    const hasOnly = options.only !== undefined;
    const hasPart = options.part !== undefined;

    const flags = {
        prototype: hasOnly ? options.only : hasPart ? !options.part : false,
        part: hasOnly ? !options.only : hasPart ? options.part : false
    };

    return (a, b) => DeepEqual(a, b, flags);
};


internals.shallow = function (a, b) {

    return a === b;
};

},{"./assert":4,"./deepEqual":9,"./escapeRegex":14,"./utils":26}],9:[function(require,module,exports){
(function (Buffer){
'use strict';

const Types = require('./types');


const internals = {
    mismatched: null
};


module.exports = function (obj, ref, options) {

    options = Object.assign({ prototype: true }, options);

    return !!internals.isDeepEqual(obj, ref, options, []);
};


internals.isDeepEqual = function (obj, ref, options, seen) {

    if (obj === ref) {                                                      // Copied from Deep-eql, copyright(c) 2013 Jake Luer, jake@alogicalparadox.com, MIT Licensed, https://github.com/chaijs/deep-eql
        return obj !== 0 || 1 / obj === 1 / ref;
    }

    const type = typeof obj;

    if (type !== typeof ref) {
        return false;
    }

    if (obj === null ||
        ref === null) {

        return false;
    }

    if (type === 'function') {
        if (!options.deepFunction ||
            obj.toString() !== ref.toString()) {

            return false;
        }

        // Continue as object
    }
    else if (type !== 'object') {
        return obj !== obj && ref !== ref;                                  // NaN
    }

    const instanceType = internals.getSharedType(obj, ref, !!options.prototype);
    switch (instanceType) {
        case Types.buffer:
            return Buffer && Buffer.prototype.equals.call(obj, ref);        // $lab:coverage:ignore$
        case Types.promise:
            return obj === ref;
        case Types.regex:
            return obj.toString() === ref.toString();
        case internals.mismatched:
            return false;
    }

    for (let i = seen.length - 1; i >= 0; --i) {
        if (seen[i].isSame(obj, ref)) {
            return true;                                                    // If previous comparison failed, it would have stopped execution
        }
    }

    seen.push(new internals.SeenEntry(obj, ref));

    try {
        return !!internals.isDeepEqualObj(instanceType, obj, ref, options, seen);
    }
    finally {
        seen.pop();
    }
};


internals.getSharedType = function (obj, ref, checkPrototype) {

    if (checkPrototype) {
        if (Object.getPrototypeOf(obj) !== Object.getPrototypeOf(ref)) {
            return internals.mismatched;
        }

        return Types.getInternalProto(obj);
    }

    const type = Types.getInternalProto(obj);
    if (type !== Types.getInternalProto(ref)) {
        return internals.mismatched;
    }

    return type;
};


internals.valueOf = function (obj) {

    const objValueOf = obj.valueOf;
    if (objValueOf === undefined) {
        return obj;
    }

    try {
        return objValueOf.call(obj);
    }
    catch (err) {
        return err;
    }
};


internals.hasOwnEnumerableProperty = function (obj, key) {

    return Object.prototype.propertyIsEnumerable.call(obj, key);
};


internals.isSetSimpleEqual = function (obj, ref) {

    for (const entry of obj) {
        if (!ref.has(entry)) {
            return false;
        }
    }

    return true;
};


internals.isDeepEqualObj = function (instanceType, obj, ref, options, seen) {

    const { isDeepEqual, valueOf, hasOwnEnumerableProperty } = internals;
    const { keys, getOwnPropertySymbols } = Object;

    if (instanceType === Types.array) {
        if (options.part) {

            // Check if any index match any other index

            for (const objValue of obj) {
                for (const refValue of ref) {
                    if (isDeepEqual(objValue, refValue, options, seen)) {
                        return true;
                    }
                }
            }
        }
        else {
            if (obj.length !== ref.length) {
                return false;
            }

            for (let i = 0; i < obj.length; ++i) {
                if (!isDeepEqual(obj[i], ref[i], options, seen)) {
                    return false;
                }
            }

            return true;
        }
    }
    else if (instanceType === Types.set) {
        if (obj.size !== ref.size) {
            return false;
        }

        if (!internals.isSetSimpleEqual(obj, ref)) {

            // Check for deep equality

            const ref2 = new Set(ref);
            for (const objEntry of obj) {
                if (ref2.delete(objEntry)) {
                    continue;
                }

                let found = false;
                for (const refEntry of ref2) {
                    if (isDeepEqual(objEntry, refEntry, options, seen)) {
                        ref2.delete(refEntry);
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    return false;
                }
            }
        }
    }
    else if (instanceType === Types.map) {
        if (obj.size !== ref.size) {
            return false;
        }

        for (const [key, value] of obj) {
            if (value === undefined && !ref.has(key)) {
                return false;
            }

            if (!isDeepEqual(value, ref.get(key), options, seen)) {
                return false;
            }
        }
    }
    else if (instanceType === Types.error) {

        // Always check name and message

        if (obj.name !== ref.name ||
            obj.message !== ref.message) {

            return false;
        }
    }

    // Check .valueOf()

    const valueOfObj = valueOf(obj);
    const valueOfRef = valueOf(ref);
    if ((obj !== valueOfObj || ref !== valueOfRef) &&
        !isDeepEqual(valueOfObj, valueOfRef, options, seen)) {

        return false;
    }

    // Check properties

    const objKeys = keys(obj);
    if (!options.part &&
        objKeys.length !== keys(ref).length &&
        !options.skip) {

        return false;
    }

    let skipped = 0;
    for (const key of objKeys) {
        if (options.skip &&
            options.skip.includes(key)) {

            if (ref[key] === undefined) {
                ++skipped;
            }

            continue;
        }

        if (!hasOwnEnumerableProperty(ref, key)) {
            return false;
        }

        if (!isDeepEqual(obj[key], ref[key], options, seen)) {
            return false;
        }
    }

    if (!options.part &&
        objKeys.length - skipped !== keys(ref).length) {

        return false;
    }

    // Check symbols

    if (options.symbols !== false) {                                // Defaults to true
        const objSymbols = getOwnPropertySymbols(obj);
        const refSymbols = new Set(getOwnPropertySymbols(ref));

        for (const key of objSymbols) {
            if (!options.skip ||
                !options.skip.includes(key)) {

                if (hasOwnEnumerableProperty(obj, key)) {
                    if (!hasOwnEnumerableProperty(ref, key)) {
                        return false;
                    }

                    if (!isDeepEqual(obj[key], ref[key], options, seen)) {
                        return false;
                    }
                }
                else if (hasOwnEnumerableProperty(ref, key)) {
                    return false;
                }
            }

            refSymbols.delete(key);
        }

        for (const key of refSymbols) {
            if (hasOwnEnumerableProperty(ref, key)) {
                return false;
            }
        }
    }

    return true;
};


internals.SeenEntry = class {

    constructor(obj, ref) {

        this.obj = obj;
        this.ref = ref;
    }

    isSame(obj, ref) {

        return this.obj === obj && this.ref === ref;
    }
};

}).call(this,require("buffer").Buffer)
},{"./types":25,"buffer":30}],10:[function(require,module,exports){
'use strict';

const Stringify = require('./stringify');


const internals = {};


module.exports = class extends Error {

    constructor(args) {

        const msgs = args
            .filter((arg) => arg !== '')
            .map((arg) => {

                return typeof arg === 'string' ? arg : arg instanceof Error ? arg.message : Stringify(arg);
            });

        super(msgs.join(' ') || 'Unknown error');

        if (typeof Error.captureStackTrace === 'function') {            // $lab:coverage:ignore$
            Error.captureStackTrace(this, exports.assert);
        }
    }
};

},{"./stringify":24}],11:[function(require,module,exports){
'use strict';

const Assert = require('./assert');


const internals = {};


module.exports = function (attribute) {

    // Allowed value characters: !#$%&'()*+,-./:;<=>?@[]^_`{|}~ and space, a-z, A-Z, 0-9, \, "

    Assert(/^[ \w\!#\$%&'\(\)\*\+,\-\.\/\:;<\=>\?@\[\]\^`\{\|\}~\"\\]*$/.test(attribute), 'Bad attribute value (' + attribute + ')');

    return attribute.replace(/\\/g, '\\\\').replace(/\"/g, '\\"');                             // Escape quotes and slash
};

},{"./assert":4}],12:[function(require,module,exports){
'use strict';

const internals = {};


module.exports = function (input) {

    if (!input) {
        return '';
    }

    let escaped = '';

    for (let i = 0; i < input.length; ++i) {

        const charCode = input.charCodeAt(i);

        if (internals.isSafe(charCode)) {
            escaped += input[i];
        }
        else {
            escaped += internals.escapeHtmlChar(charCode);
        }
    }

    return escaped;
};


internals.escapeHtmlChar = function (charCode) {

    const namedEscape = internals.namedHtml[charCode];
    if (typeof namedEscape !== 'undefined') {
        return namedEscape;
    }

    if (charCode >= 256) {
        return '&#' + charCode + ';';
    }

    const hexValue = charCode.toString(16).padStart(2, '0');
    return `&#x${hexValue};`;
};


internals.isSafe = function (charCode) {

    return (typeof internals.safeCharCodes[charCode] !== 'undefined');
};


internals.namedHtml = {
    '38': '&amp;',
    '60': '&lt;',
    '62': '&gt;',
    '34': '&quot;',
    '160': '&nbsp;',
    '162': '&cent;',
    '163': '&pound;',
    '164': '&curren;',
    '169': '&copy;',
    '174': '&reg;'
};


internals.safeCharCodes = (function () {

    const safe = {};

    for (let i = 32; i < 123; ++i) {

        if ((i >= 97) ||                    // a-z
            (i >= 65 && i <= 90) ||         // A-Z
            (i >= 48 && i <= 57) ||         // 0-9
            i === 32 ||                     // space
            i === 46 ||                     // .
            i === 44 ||                     // ,
            i === 45 ||                     // -
            i === 58 ||                     // :
            i === 95) {                     // _

            safe[i] = null;
        }
    }

    return safe;
}());

},{}],13:[function(require,module,exports){
'use strict';

const internals = {};


module.exports = function (input) {

    if (!input) {
        return '';
    }

    const lessThan = 0x3C;
    const greaterThan = 0x3E;
    const andSymbol = 0x26;
    const lineSeperator = 0x2028;

    // replace method
    let charCode;
    return input.replace(/[<>&\u2028\u2029]/g, (match) => {

        charCode = match.charCodeAt(0);

        if (charCode === lessThan) {
            return '\\u003c';
        }

        if (charCode === greaterThan) {
            return '\\u003e';
        }

        if (charCode === andSymbol) {
            return '\\u0026';
        }

        if (charCode === lineSeperator) {
            return '\\u2028';
        }

        return '\\u2029';
    });
};

},{}],14:[function(require,module,exports){
'use strict';

const internals = {};


module.exports = function (string) {

    // Escape ^$.*+-?=!:|\/()[]{},

    return string.replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&');
};

},{}],15:[function(require,module,exports){
'use strict';

const internals = {};


module.exports = internals.flatten = function (array, target) {

    const result = target || [];

    for (let i = 0; i < array.length; ++i) {
        if (Array.isArray(array[i])) {
            internals.flatten(array[i], result);
        }
        else {
            result.push(array[i]);
        }
    }

    return result;
};

},{}],16:[function(require,module,exports){
'use strict';

const internals = {};


module.exports = function () { };

},{}],17:[function(require,module,exports){
'use strict';

const internals = {};


module.exports = {
    applyToDefaults: require('./applyToDefaults'),
    assert: require('./assert'),
    Bench: require('./bench'),
    block: require('./block'),
    clone: require('./clone'),
    contain: require('./contain'),
    deepEqual: require('./deepEqual'),
    Error: require('./error'),
    escapeHeaderAttribute: require('./escapeHeaderAttribute'),
    escapeHtml: require('./escapeHtml'),
    escapeJson: require('./escapeJson'),
    escapeRegex: require('./escapeRegex'),
    flatten: require('./flatten'),
    ignore: require('./ignore'),
    intersect: require('./intersect'),
    isPromise: require('./isPromise'),
    merge: require('./merge'),
    once: require('./once'),
    reach: require('./reach'),
    reachTemplate: require('./reachTemplate'),
    stringify: require('./stringify'),
    wait: require('./wait')
};

},{"./applyToDefaults":3,"./assert":4,"./bench":5,"./block":6,"./clone":7,"./contain":8,"./deepEqual":9,"./error":10,"./escapeHeaderAttribute":11,"./escapeHtml":12,"./escapeJson":13,"./escapeRegex":14,"./flatten":15,"./ignore":16,"./intersect":18,"./isPromise":19,"./merge":20,"./once":21,"./reach":22,"./reachTemplate":23,"./stringify":24,"./wait":27}],18:[function(require,module,exports){
'use strict';

const internals = {};


module.exports = function (array1, array2, options = {}) {

    if (!array1 ||
        !array2) {

        return (options.first ? null : []);
    }

    const common = [];
    const hash = (Array.isArray(array1) ? new Set(array1) : array1);
    const found = new Set();
    for (const value of array2) {
        if (internals.has(hash, value) &&
            !found.has(value)) {

            if (options.first) {
                return value;
            }

            common.push(value);
            found.add(value);
        }
    }

    return (options.first ? null : common);
};


internals.has = function (ref, key) {

    if (typeof ref.has === 'function') {
        return ref.has(key);
    }

    return ref[key] !== undefined;
};

},{}],19:[function(require,module,exports){
'use strict';

const internals = {};


module.exports = function (promise) {

    return !!promise && typeof promise.then === 'function';
};

},{}],20:[function(require,module,exports){
(function (Buffer){
'use strict';

const Assert = require('./assert');
const Clone = require('./clone');
const Utils = require('./utils');


const internals = {};


module.exports = internals.merge = function (target, source, options) {

    Assert(target && typeof target === 'object', 'Invalid target value: must be an object');
    Assert(source === null || source === undefined || typeof source === 'object', 'Invalid source value: must be null, undefined, or an object');

    if (!source) {
        return target;
    }

    options = Object.assign({ nullOverride: true, mergeArrays: true }, options);

    if (Array.isArray(source)) {
        Assert(Array.isArray(target), 'Cannot merge array onto an object');
        if (!options.mergeArrays) {
            target.length = 0;                                                          // Must not change target assignment
        }

        for (let i = 0; i < source.length; ++i) {
            target.push(Clone(source[i], { symbols: options.symbols }));
        }

        return target;
    }

    const keys = Utils.keys(source, options);
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (key === '__proto__' ||
            !Object.prototype.propertyIsEnumerable.call(source, key)) {

            continue;
        }

        const value = source[key];
        if (value &&
            typeof value === 'object') {

            if (target[key] === value) {
                continue;                                           // Can occur for shallow merges
            }

            if (!target[key] ||
                typeof target[key] !== 'object' ||
                (Array.isArray(target[key]) !== Array.isArray(value)) ||
                value instanceof Date ||
                (Buffer && Buffer.isBuffer(value)) ||               // $lab:coverage:ignore$
                value instanceof RegExp) {

                target[key] = Clone(value, { symbols: options.symbols });
            }
            else {
                internals.merge(target[key], value, options);
            }
        }
        else {
            if (value !== null &&
                value !== undefined) {                              // Explicit to preserve empty strings

                target[key] = value;
            }
            else if (options.nullOverride) {
                target[key] = value;
            }
        }
    }

    return target;
};

}).call(this,require("buffer").Buffer)
},{"./assert":4,"./clone":7,"./utils":26,"buffer":30}],21:[function(require,module,exports){
'use strict';

const internals = {};


module.exports = function (method) {

    if (method._hoekOnce) {
        return method;
    }

    let once = false;
    const wrapped = function (...args) {

        if (!once) {
            once = true;
            method(...args);
        }
    };

    wrapped._hoekOnce = true;
    return wrapped;
};

},{}],22:[function(require,module,exports){
'use strict';

const Assert = require('./assert');


const internals = {};


module.exports = function (obj, chain, options) {

    if (chain === false ||
        chain === null ||
        chain === undefined) {

        return obj;
    }

    options = options || {};
    if (typeof options === 'string') {
        options = { separator: options };
    }

    const isChainArray = Array.isArray(chain);

    Assert(!isChainArray || !options.separator, 'Separator option no valid for array-based chain');

    const path = isChainArray ? chain : chain.split(options.separator || '.');
    let ref = obj;
    for (let i = 0; i < path.length; ++i) {
        let key = path[i];
        const type = options.iterables && internals.iterables(ref);

        if (Array.isArray(ref) ||
            type === 'set') {

            const number = Number(key);
            if (Number.isInteger(number)) {
                key = number < 0 ? ref.length + number : number;
            }
        }

        if (!ref ||
            typeof ref === 'function' && options.functions === false ||         // Defaults to true
            !type && ref[key] === undefined) {

            Assert(!options.strict || i + 1 === path.length, 'Missing segment', key, 'in reach path ', chain);
            Assert(typeof ref === 'object' || options.functions === true || typeof ref !== 'function', 'Invalid segment', key, 'in reach path ', chain);
            ref = options.default;
            break;
        }

        if (!type) {
            ref = ref[key];
        }
        else if (type === 'set') {
            ref = [...ref][key];
        }
        else {  // type === 'map'
            ref = ref.get(key);
        }
    }

    return ref;
};


internals.iterables = function (ref) {

    if (ref instanceof Set) {
        return 'set';
    }

    if (ref instanceof Map) {
        return 'map';
    }
};

},{"./assert":4}],23:[function(require,module,exports){
'use strict';

const Reach = require('./reach');


const internals = {};


module.exports = function (obj, template, options) {

    return template.replace(/{([^}]+)}/g, ($0, chain) => {

        const value = Reach(obj, chain, options);
        return (value === undefined || value === null ? '' : value);
    });
};

},{"./reach":22}],24:[function(require,module,exports){
'use strict';

const internals = {};


module.exports = function (...args) {

    try {
        return JSON.stringify.apply(null, args);
    }
    catch (err) {
        return '[Cannot display object: ' + err.message + ']';
    }
};

},{}],25:[function(require,module,exports){
(function (Buffer){
'use strict';

const internals = {};


exports = module.exports = {
    array: Array.prototype,
    buffer: Buffer && Buffer.prototype,             // $lab:coverage:ignore$
    date: Date.prototype,
    error: Error.prototype,
    generic: Object.prototype,
    map: Map.prototype,
    promise: Promise.prototype,
    regex: RegExp.prototype,
    set: Set.prototype,
    weakMap: WeakMap.prototype,
    weakSet: WeakSet.prototype
};


internals.typeMap = new Map([
    ['[object Error]', exports.error],
    ['[object Map]', exports.map],
    ['[object Promise]', exports.promise],
    ['[object Set]', exports.set],
    ['[object WeakMap]', exports.weakMap],
    ['[object WeakSet]', exports.weakSet]
]);


exports.getInternalProto = function (obj) {

    if (Array.isArray(obj)) {
        return exports.array;
    }

    if (Buffer && obj instanceof Buffer) {          // $lab:coverage:ignore$
        return exports.buffer;
    }

    if (obj instanceof Date) {
        return exports.date;
    }

    if (obj instanceof RegExp) {
        return exports.regex;
    }

    if (obj instanceof Error) {
        return exports.error;
    }

    const objName = Object.prototype.toString.call(obj);
    return internals.typeMap.get(objName) || exports.generic;
};

}).call(this,require("buffer").Buffer)
},{"buffer":30}],26:[function(require,module,exports){
'use strict';

const internals = {};


exports.keys = function (obj, options = {}) {

    return options.symbols !== false ? Reflect.ownKeys(obj) : Object.getOwnPropertyNames(obj);  // Defaults to true
};

},{}],27:[function(require,module,exports){
'use strict';

const internals = {};


module.exports = function (timeout) {

    return new Promise((resolve) => setTimeout(resolve, timeout));
};

},{}],28:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],29:[function(require,module,exports){

},{}],30:[function(require,module,exports){
(function (Buffer){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this,require("buffer").Buffer)
},{"base64-js":28,"buffer":30,"ieee754":62}],31:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"object-keys":67}],32:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var OrdinaryGetOwnProperty = require('./OrdinaryGetOwnProperty');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://www.ecma-international.org/ecma-262/6.0/#sec-createdataproperty

module.exports = function CreateDataProperty(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	var oldDesc = OrdinaryGetOwnProperty(O, P);
	var extensible = !oldDesc || IsExtensible(O);
	var immutable = oldDesc && (!oldDesc['[[Writable]]'] || !oldDesc['[[Configurable]]']);
	if (immutable || !extensible) {
		return false;
	}
	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		{
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Value]]': V,
			'[[Writable]]': true
		}
	);
};

},{"../GetIntrinsic":49,"../helpers/DefineOwnProperty":50,"./FromPropertyDescriptor":33,"./IsDataDescriptor":36,"./IsExtensible":37,"./IsPropertyKey":38,"./OrdinaryGetOwnProperty":40,"./SameValue":42,"./Type":46}],33:[function(require,module,exports){
'use strict';

var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://www.ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	var obj = {};
	if ('[[Value]]' in Desc) {
		obj.value = Desc['[[Value]]'];
	}
	if ('[[Writable]]' in Desc) {
		obj.writable = Desc['[[Writable]]'];
	}
	if ('[[Get]]' in Desc) {
		obj.get = Desc['[[Get]]'];
	}
	if ('[[Set]]' in Desc) {
		obj.set = Desc['[[Set]]'];
	}
	if ('[[Enumerable]]' in Desc) {
		obj.enumerable = Desc['[[Enumerable]]'];
	}
	if ('[[Configurable]]' in Desc) {
		obj.configurable = Desc['[[Configurable]]'];
	}
	return obj;
};

},{"../helpers/assertRecord":51,"./Type":46}],34:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $Array = GetIntrinsic('%Array%');

// eslint-disable-next-line global-require
var toStr = !$Array.isArray && require('../helpers/callBound')('Object.prototype.toString');

// https://www.ecma-international.org/ecma-262/6.0/#sec-isarray

module.exports = $Array.isArray || function IsArray(argument) {
	return toStr(argument) === '[object Array]';
};

},{"../GetIntrinsic":49,"../helpers/callBound":53}],35:[function(require,module,exports){
'use strict';

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":64}],36:[function(require,module,exports){
'use strict';

var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://www.ecma-international.org/ecma-262/6.0/#sec-isdatadescriptor

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

},{"../helpers/assertRecord":51,"./Type":46,"has":61}],37:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $Object = GetIntrinsic('%Object%');

var isPrimitive = require('../helpers/isPrimitive');

var $preventExtensions = $Object.preventExtensions;
var $isExtensible = $Object.isExtensible;

// https://www.ecma-international.org/ecma-262/6.0/#sec-isextensible-o

module.exports = $preventExtensions
	? function IsExtensible(obj) {
		return !isPrimitive(obj) && $isExtensible(obj);
	}
	: function IsExtensible(obj) {
		return !isPrimitive(obj);
	};

},{"../GetIntrinsic":49,"../helpers/isPrimitive":56}],38:[function(require,module,exports){
'use strict';

// https://www.ecma-international.org/ecma-262/6.0/#sec-ispropertykey

module.exports = function IsPropertyKey(argument) {
	return typeof argument === 'string' || typeof argument === 'symbol';
};

},{}],39:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $match = GetIntrinsic('%Symbol.match%', true);

var hasRegExpMatcher = require('is-regex');

var ToBoolean = require('./ToBoolean');

// https://ecma-international.org/ecma-262/6.0/#sec-isregexp

module.exports = function IsRegExp(argument) {
	if (!argument || typeof argument !== 'object') {
		return false;
	}
	if ($match) {
		var isRegExp = argument[$match];
		if (typeof isRegExp !== 'undefined') {
			return ToBoolean(isRegExp);
		}
	}
	return hasRegExpMatcher(argument);
};

},{"../GetIntrinsic":49,"./ToBoolean":43,"is-regex":65}],40:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('../helpers/callBound');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

var has = require('has');

var IsArray = require('./IsArray');
var IsPropertyKey = require('./IsPropertyKey');
var IsRegExp = require('./IsRegExp');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://www.ecma-international.org/ecma-262/6.0/#sec-ordinarygetownproperty

module.exports = function OrdinaryGetOwnProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	if (!has(O, P)) {
		return void 0;
	}
	if (!$gOPD) {
		// ES3 / IE 8 fallback
		var arrayLength = IsArray(O) && P === 'length';
		var regexLastIndex = IsRegExp(O) && P === 'lastIndex';
		return {
			'[[Configurable]]': !(arrayLength || regexLastIndex),
			'[[Enumerable]]': $isEnumerable(O, P),
			'[[Value]]': O[P],
			'[[Writable]]': true
		};
	}
	return ToPropertyDescriptor($gOPD(O, P));
};

},{"../GetIntrinsic":49,"../helpers/callBound":53,"../helpers/getOwnPropertyDescriptor":54,"./IsArray":34,"./IsPropertyKey":38,"./IsRegExp":39,"./ToPropertyDescriptor":45,"./Type":46,"has":61}],41:[function(require,module,exports){
'use strict';

module.exports = require('../5/CheckObjectCoercible');

},{"../5/CheckObjectCoercible":47}],42:[function(require,module,exports){
'use strict';

var $isNaN = require('../helpers/isNaN');

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.12

module.exports = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN(x) && $isNaN(y);
};

},{"../helpers/isNaN":55}],43:[function(require,module,exports){
'use strict';

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],44:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $Object = GetIntrinsic('%Object%');

var RequireObjectCoercible = require('./RequireObjectCoercible');

// https://www.ecma-international.org/ecma-262/6.0/#sec-toobject

module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"../GetIntrinsic":49,"./RequireObjectCoercible":41}],45:[function(require,module,exports){
'use strict';

var has = require('has');

var GetIntrinsic = require('../GetIntrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var ToBoolean = require('./ToBoolean');
var IsCallable = require('./IsCallable');

// https://ecma-international.org/ecma-262/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (has(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (has(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (has(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

},{"../GetIntrinsic":49,"./IsCallable":35,"./ToBoolean":43,"./Type":46,"has":61}],46:[function(require,module,exports){
'use strict';

var ES5Type = require('../5/Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ecmascript-data-types-and-values

module.exports = function Type(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	return ES5Type(x);
};

},{"../5/Type":48}],47:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value, optMessage) {
	if (value == null) {
		throw new $TypeError(optMessage || ('Cannot call method on ' + value));
	}
	return value;
};

},{"../GetIntrinsic":49}],48:[function(require,module,exports){
'use strict';

// https://www.ecma-international.org/ecma-262/5.1/#sec-8

module.exports = function Type(x) {
	if (x === null) {
		return 'Null';
	}
	if (typeof x === 'undefined') {
		return 'Undefined';
	}
	if (typeof x === 'function' || typeof x === 'object') {
		return 'Object';
	}
	if (typeof x === 'number') {
		return 'Number';
	}
	if (typeof x === 'boolean') {
		return 'Boolean';
	}
	if (typeof x === 'string') {
		return 'String';
	}
};

},{}],49:[function(require,module,exports){
'use strict';

/* globals
	Atomics,
	SharedArrayBuffer,
*/

var undefined;

var $TypeError = TypeError;

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () { throw new $TypeError(); };
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = require('has-symbols')();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var generator; // = function * () {};
var generatorFunction = generator ? getProto(generator) : undefined;
var asyncFn; // async function() {};
var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
var asyncGen; // async function * () {};
var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
var asyncGenIterator = asyncGen ? asyncGen() : undefined;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%ArrayPrototype%': Array.prototype,
	'%ArrayProto_entries%': Array.prototype.entries,
	'%ArrayProto_forEach%': Array.prototype.forEach,
	'%ArrayProto_keys%': Array.prototype.keys,
	'%ArrayProto_values%': Array.prototype.values,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': asyncFunction,
	'%AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
	'%AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
	'%AsyncGeneratorFunction%': asyncGenFunction,
	'%AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
	'%AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%Boolean%': Boolean,
	'%BooleanPrototype%': Boolean.prototype,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
	'%Date%': Date,
	'%DatePrototype%': Date.prototype,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%ErrorPrototype%': Error.prototype,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%EvalErrorPrototype%': EvalError.prototype,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
	'%Function%': Function,
	'%FunctionPrototype%': Function.prototype,
	'%Generator%': generator ? getProto(generator()) : undefined,
	'%GeneratorFunction%': generatorFunction,
	'%GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
	'%Math%': Math,
	'%Number%': Number,
	'%NumberPrototype%': Number.prototype,
	'%Object%': Object,
	'%ObjectPrototype%': Object.prototype,
	'%ObjProto_toString%': Object.prototype.toString,
	'%ObjProto_valueOf%': Object.prototype.valueOf,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
	'%PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
	'%Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
	'%Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
	'%Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%RangeErrorPrototype%': RangeError.prototype,
	'%ReferenceError%': ReferenceError,
	'%ReferenceErrorPrototype%': ReferenceError.prototype,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%RegExpPrototype%': RegExp.prototype,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%StringPrototype%': String.prototype,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
	'%SyntaxError%': SyntaxError,
	'%SyntaxErrorPrototype%': SyntaxError.prototype,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
	'%TypeError%': $TypeError,
	'%TypeErrorPrototype%': $TypeError.prototype,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
	'%URIError%': URIError,
	'%URIErrorPrototype%': URIError.prototype,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
	'%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype
};

var bind = require('function-bind');
var $replace = bind.call(Function.call, String.prototype.replace);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	if (!(name in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[name] === 'undefined' && !allowMissing) {
		throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}

	return INTRINSICS[name];
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);

	var value = getBaseIntrinsic('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);
	for (var i = 1; i < parts.length; i += 1) {
		if (value != null) {
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, parts[i]);
				if (!allowMissing && !(parts[i] in value)) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				value = desc ? (desc.get || desc.value) : value[parts[i]];
			} else {
				value = value[parts[i]];
			}
		}
	}
	return value;
};

},{"function-bind":58,"has-symbols":59}],50:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

var callBound = require('../helpers/callBound');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

// eslint-disable-next-line max-params
module.exports = function DefineOwnProperty(IsDataDescriptor, SameValue, FromPropertyDescriptor, O, P, desc) {
	if (!$defineProperty) {
		if (!IsDataDescriptor(desc)) {
			// ES3 does not support getters/setters
			return false;
		}
		if (!desc['[[Configurable]]'] || !desc['[[Writable]]']) {
			return false;
		}

		// fallback for ES3
		if (P in O && $isEnumerable(O, P) !== !!desc['[[Enumerable]]']) {
			// a non-enumerable existing property
			return false;
		}

		// property does not exist at all, or exists but is enumerable
		var V = desc['[[Value]]'];
		// eslint-disable-next-line no-param-reassign
		O[P] = V; // will use [[Define]]
		return SameValue(O[P], V);
	}
	$defineProperty(O, P, FromPropertyDescriptor(desc));
	return true;
};

},{"../GetIntrinsic":49,"../helpers/callBound":53}],51:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = require('has');

var predicates = {
	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(Type, Desc) {
		if (Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};

		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}

		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	}
};

module.exports = function assertRecord(Type, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (!predicate(Type, value)) {
		throw new $TypeError(argumentName + ' must be a ' + recordType);
	}
};

},{"../GetIntrinsic":49,"has":61}],52:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

var GetIntrinsic = require('../GetIntrinsic');

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

module.exports = function callBind() {
	return $reflectApply(bind, $call, arguments);
};

module.exports.apply = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

},{"../GetIntrinsic":49,"function-bind":58}],53:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var callBind = require('./callBind');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

},{"../GetIntrinsic":49,"./callBind":52}],54:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%');
if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;

},{"../GetIntrinsic":49}],55:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],56:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],57:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],58:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":57}],59:[function(require,module,exports){
(function (global){
'use strict';

var origSymbol = global.Symbol;
var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./shams":60}],60:[function(require,module,exports){
'use strict';

/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

},{}],61:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":58}],62:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],63:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],64:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
	} catch (_) {
		reflectApply = null;
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = reflectApply
	? function isCallable(value) {
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value);
	}
	: function isCallable(value) {
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		return strClass === fnClass || strClass === genClass;
	};

},{}],65:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols')();
var hasToStringTag = hasSymbols && typeof Symbol.toStringTag === 'symbol';
var hasOwnProperty;
var regexExec;
var isRegexMarker;
var badStringifier;

if (hasToStringTag) {
	hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
	regexExec = Function.call.bind(RegExp.prototype.exec);
	isRegexMarker = {};

	var throwRegexMarker = function () {
		throw isRegexMarker;
	};
	badStringifier = {
		toString: throwRegexMarker,
		valueOf: throwRegexMarker
	};

	if (typeof Symbol.toPrimitive === 'symbol') {
		badStringifier[Symbol.toPrimitive] = throwRegexMarker;
	}
}

var toStr = Object.prototype.toString;
var gOPD = Object.getOwnPropertyDescriptor;
var regexClass = '[object RegExp]';

module.exports = hasToStringTag
	// eslint-disable-next-line consistent-return
	? function isRegex(value) {
		if (!value || typeof value !== 'object') {
			return false;
		}

		var descriptor = gOPD(value, 'lastIndex');
		var hasLastIndexDataProperty = descriptor && hasOwnProperty(descriptor, 'value');
		if (!hasLastIndexDataProperty) {
			return false;
		}

		try {
			regexExec(value, badStringifier);
		} catch (e) {
			return e === isRegexMarker;
		}
	}
	: function isRegex(value) {
		// In older browsers, typeof regex incorrectly returns 'function'
		if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
			return false;
		}

		return toStr.call(value) === regexClass;
	};

},{"has-symbols":59}],66:[function(require,module,exports){
'use strict';

var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = require('./isArguments'); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;

},{"./isArguments":68}],67:[function(require,module,exports){
'use strict';

var slice = Array.prototype.slice;
var isArgs = require('./isArguments');

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : require('./implementation');

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./implementation":66,"./isArguments":68}],68:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],69:[function(require,module,exports){
'use strict';

var CreateDataProperty = require('es-abstract/2019/CreateDataProperty');
var IsCallable = require('es-abstract/2019/IsCallable');
var RequireObjectCoercible = require('es-abstract/2019/RequireObjectCoercible');
var ToObject = require('es-abstract/2019/ToObject');
var callBound = require('es-abstract/helpers/callBound');

var $gOPD = Object.getOwnPropertyDescriptor;
var $getOwnNames = Object.getOwnPropertyNames;
var $getSymbols = Object.getOwnPropertySymbols;
var $concat = callBound('Array.prototype.concat');
var $reduce = callBound('Array.prototype.reduce');
var getAll = $getSymbols ? function (obj) {
	return $concat($getOwnNames(obj), $getSymbols(obj));
} : $getOwnNames;

var isES5 = IsCallable($gOPD) && IsCallable($getOwnNames);

module.exports = function getOwnPropertyDescriptors(value) {
	RequireObjectCoercible(value);
	if (!isES5) {
		throw new TypeError('getOwnPropertyDescriptors requires Object.getOwnPropertyDescriptor');
	}

	var O = ToObject(value);
	return $reduce(
		getAll(O),
		function (acc, key) {
			var descriptor = $gOPD(O, key);
			if (typeof descriptor !== 'undefined') {
				CreateDataProperty(acc, key, descriptor);
			}
			return acc;
		},
		{}
	);
};

},{"es-abstract/2019/CreateDataProperty":32,"es-abstract/2019/IsCallable":35,"es-abstract/2019/RequireObjectCoercible":41,"es-abstract/2019/ToObject":44,"es-abstract/helpers/callBound":53}],70:[function(require,module,exports){
'use strict';

var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

define(implementation, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = implementation;

},{"./implementation":69,"./polyfill":71,"./shim":72,"define-properties":31}],71:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return typeof Object.getOwnPropertyDescriptors === 'function' ? Object.getOwnPropertyDescriptors : implementation;
};

},{"./implementation":69}],72:[function(require,module,exports){
'use strict';

var getPolyfill = require('./polyfill');
var define = require('define-properties');

module.exports = function shimGetOwnPropertyDescriptors() {
	var polyfill = getPolyfill();
	define(
		Object,
		{ getOwnPropertyDescriptors: polyfill },
		{ getOwnPropertyDescriptors: function () { return Object.getOwnPropertyDescriptors !== polyfill; } }
	);
	return polyfill;
};

},{"./polyfill":71,"define-properties":31}],73:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],74:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":73,"timers":74}],75:[function(require,module,exports){
'use strict';

var isES5 = typeof Object.defineProperty === 'function'
	&& typeof Object.defineProperties === 'function';

var hasProto = [].__proto__ === Array.prototype; // eslint-disable-line no-proto

if (!isES5 || !hasProto) {
	throw new TypeError('util.promisify requires a true ES5 environment, that also supports `__proto__`');
}

var getOwnPropertyDescriptors = require('object.getownpropertydescriptors');

if (typeof Promise !== 'function') {
	throw new TypeError('`Promise` must be globally available for util.promisify to work.');
}

var callBound = require('es-abstract/helpers/callBound');

var $slice = callBound('Array.prototype.slice');
var $concat = callBound('Array.prototype.concat');
var $forEach = callBound('Array.prototype.forEach');

var hasSymbols = require('has-symbols')();

var kCustomPromisifiedSymbol = hasSymbols ? Symbol('util.promisify.custom') : null;
var kCustomPromisifyArgsSymbol = hasSymbols ? Symbol('customPromisifyArgs') : null;

module.exports = function promisify(orig) {
	if (typeof orig !== 'function') {
		var error = new TypeError('The "original" argument must be of type function');
		error.name = 'TypeError [ERR_INVALID_ARG_TYPE]';
		error.code = 'ERR_INVALID_ARG_TYPE';
		throw error;
	}

	if (hasSymbols && orig[kCustomPromisifiedSymbol]) {
		var customFunction = orig[kCustomPromisifiedSymbol];
		if (typeof customFunction !== 'function') {
			throw new TypeError('The [util.promisify.custom] property must be a function');
		}
		Object.defineProperty(customFunction, kCustomPromisifiedSymbol, {
			configurable: true,
			enumerable: false,
			value: customFunction,
			writable: false
		});
		return customFunction;
	}

	// Names to create an object from in case the callback receives multiple
	// arguments, e.g. ['stdout', 'stderr'] for child_process.exec.
	var argumentNames = orig[kCustomPromisifyArgsSymbol];

	var promisified = function fn() {
		var args = $slice(arguments);
		var self = this; // eslint-disable-line no-invalid-this
		return new Promise(function (resolve, reject) {
			orig.apply(self, $concat(args, function (err) {
				var values = arguments.length > 1 ? $slice(arguments, 1) : [];
				if (err) {
					reject(err);
				} else if (typeof argumentNames !== 'undefined' && values.length > 1) {
					var obj = {};
					$forEach(argumentNames, function (name, index) {
						obj[name] = values[index];
					});
					resolve(obj);
				} else {
					resolve(values[0]);
				}
			}));
		});
	};

	promisified.__proto__ = orig.__proto__; // eslint-disable-line no-proto

	Object.defineProperty(promisified, kCustomPromisifiedSymbol, {
		configurable: true,
		enumerable: false,
		value: promisified,
		writable: false
	});
	return Object.defineProperties(promisified, getOwnPropertyDescriptors(orig));
};

module.exports.custom = kCustomPromisifiedSymbol;
module.exports.customPromisifyArgs = kCustomPromisifyArgsSymbol;

},{"es-abstract/helpers/callBound":53,"has-symbols":59,"object.getownpropertydescriptors":70}],76:[function(require,module,exports){
'use strict';

var util = require('util');
var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (typeof util.promisify === 'function') {
		return util.promisify;
	}
	return implementation;
};

},{"./implementation":75,"util":80}],77:[function(require,module,exports){
'use strict';

var util = require('util');
var getPolyfill = require('./polyfill');

module.exports = function shimUtilPromisify() {
	var polyfill = getPolyfill();
	if (polyfill !== util.promisify) {
		Object.defineProperty(util, 'promisify', {
			configurable: true,
			enumerable: true,
			value: polyfill,
			writable: true
		});
	}
	return polyfill;
};

},{"./polyfill":76,"util":80}],78:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],79:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],80:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":79,"_process":73,"inherits":78}],81:[function(require,module,exports){
(function (process,setImmediate){
/* Copyright (c) 2016-2020 Richard Rodger, MIT License */
'use strict'

require('util.promisify/shim')()
process.memoryUsage = process.memoryUsage || function(){return {rss:0}}

var Util = require('util')

var tests = []
var print = void 0 === typeof(document) ? console.log : function(s,nl){
  var out = document.querySelector('#out') // eslint-disable-line
  out.innerHTML = out.innerHTML + s + (false===nl?' ':'<br>')
}

var Lab = require('@hapi/lab')

Lab = null != Lab.script ? Lab : {
  script: function(){
    return {
      it: web_it,
      describe: web_describe
    }
  }
}

function web_it(name,opts,fn){
  tests.push({name:name,opts:opts,fn:fn||opts})
}

function web_describe(name,testdef) {
  print(name)
  testdef()
  
  runtest(tests.shift())
}


function runtest(test) {
  if(null == test) return;
  
  print(test.name,false)
  test.fn(function(){}).then(function(err){
    if(err) {
      print('fail', err)
    }
    else {
      print('pass')
    }
    runtest(tests.shift())
  })
}


var Code = require('@hapi/code')

var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = make_it(lab)
var expect = Code.expect


var GateExecutor = require('..')

describe('gate-executor', function () {
  it('readme', function (done) {
    var ge = GateExecutor()

    var log = []

    ge.add({
      fn: function first (done) {
        log.push('first')
        done()
      }
    })

    var subge = ge.gate()

    ge.add({
      fn: function second (done) {
        log.push('second')
        done()
      }
    })

    subge.add({
      fn: function second (done) {
        log.push('third')
        done()
      }
    })

    ge.start(function () {
      log.push('done')
      expect(log).to.equal([ 'first', 'third', 'second', 'done' ])
      done()
    })
  })

  it('happy', function (done) {
    var log = []

    var ge = GateExecutor()

    ge.add({ fn: function aa (d) { log.push('aa'); d() } })
    ge.add({ fn: function bb (d) { log.push('bb'); d() } })


    var ge2 = ge.gate()
    ge2.add({ fn: function ccc (d) { log.push('ccc'); d() } })

    ge.add({ fn: function dd (d) { log.push('dd'); d() } })

    ge2.add({ fn: function ddd (d) { log.push('ddd'); d() } })

    expect(ge.state()).to.equal([
      { s: 'w', ge: 1, dn: 'aa', id: '1' },
      { s: 'w', ge: 1, dn: 'bb', id: '2' },
      [ { s: 'w', ge: 2, dn: 'ccc', id: '1' },
        { s: 'w', ge: 2, dn: 'ddd', id: '2' } ],
      { s: 'w', ge: 1, dn: 'dd', id: '4' } ])

    ge2.clear(function () {
      expect(log).to.equal(['aa', 'bb', 'ccc', 'ddd'])
      expect(ge.state()).to.equal([
        { s: 'w', ge: 1, dn: 'dd', id: '4' } ])
    })

    ge.clear(function () {
      expect(log).to.equal(['aa', 'bb', 'ccc', 'ddd', 'dd'])
      done()
    })

    ge.start()
  })


  it('desc', function (done) {
    var log = []

    var ge = GateExecutor()

    // hack to avoid an inferred function name
    ge.add({ fn: [function (d) { log.push('aa'); d() }][0] })

    ge.add({ fn: function bb (d) { log.push('bb'); d() } })
    ge.add({ dn: 'CC', fn: function cc (d) { log.push('cc'); d() } })

    var s0 = ge.state()

    s0[0].dn = ''+Math.floor(parseInt(s0[0].dn, 10) / 36e5) 
    var m0 = [
      { s: 'w', ge: 1, dn: ''+Math.floor(Date.now() / 36e5), id: '1' },
      { s: 'w', ge: 1, dn: 'bb', id: '2' },
      { s: 'w', ge: 1, dn: 'CC', id: '3' }]

    expect(s0[0]).to.equal(m0[0])
    expect(s0[1]).to.equal(m0[1])
    expect(s0[2]).to.equal(m0[2])

    done()
  })


  it('running', function (done) {
    var log = []

    var ge = GateExecutor()

    ge.add({ fn: function aa (d) { log.push('aa'); d() } })
    ge.add({ fn: function bb (d) { log.push('bb'); d() } })

    var cc = 0
    ge.clear(function () {
      ++cc
      if (1 === cc) {
        expect(log).to.equal(['aa', 'bb'])
      }
      else if (2 === cc) {
        expect(log).to.equal(['aa', 'bb', 'cc'])
        done()
      }
    })

    ge.start(function () {
      expect(log).to.equal(['aa', 'bb'])
    })

    setImmediate(function () {
      ge.add({ fn: function cc (d) { log.push('cc'); d() } })
    })
  })


  it('timeout', function (done) {
    var log = []

    var ge = GateExecutor({ timeout: 200, interval: 11 })

    ge.add({
      fn: function aa (d) {
        log.push('s-aa')
        setTimeout(function () { log.push('e-aa'); d() }, 100)
      }
    })

    ge.add({
      fn: function bb (d) {
        log.push('s-bb')
        setTimeout(function () { log.push('e-bb'); d() }, 300)
      }
    })

    ge.add({
      fn: function cc (d) {
        log.push('s-cc')
        setTimeout(function () { log.push('e-cc'); d() }, 150)
      }
    })

    ge.add({
      tm: 50,
      ontm: function (timeout, start, end) {
        log.push('t-dd:'+timeout+':'+(end-start>timeout?'P':'F'))
      },
      fn: function dd (d) {
        log.push('s-dd')
        setTimeout(function () { log.push('e-dd'); d() }, 150)
      }
    })

    ge.clear(function () {
      expect(log).to.equal(
        [ 's-aa', 's-bb', 's-cc', 's-dd', 't-dd:50:P', 'e-aa', 'e-cc', 'e-dd' ])
      done()
    })

    ge.start()

    setTimeout(function () {
      expect(ge.state()).to.equal([ { s: 'a', ge: 1, dn: 'bb', id: '2' } ])
    }, 200)
  })

  it('timeout after clear', function (done) {
    var log = []

    var ge = GateExecutor({ timeout: 200, interval: 11 })

    expect(ge.options).equal({ timeout: 200, interval: 11 })
    
    var firstTime = true

    ge.add({
      fn: function aa (d) {
        log.push('s-aa')
        log.push('e-aa')
        d()
      }
    })

    ge.clear(function () {
      if (firstTime) {
        expect(log).to.equal([ 's-aa', 'e-aa' ])
        firstTime = false

        ge.add({
          tm: 50,
          ontm: function () {
            log.push('t-bb')
          },
          fn: function bb (d) {
            log.push('s-bb')
            setTimeout(function () { log.push('e-bb'); d() }, 150)
          }
        })

        return
      }

      expect(log).to.equal([ 's-aa', 'e-aa', 's-bb', 't-bb' ])
      done()
    })

    ge.start()

  })


  it('traverse', function (done) {

    var all = descend([], 1, 0)

    var ge_all = []
    for (var i = 0; i < all.length; ++i) {
      var b = build(all[i])
      b.i = i
      ge_all[i] = b
    }

    var log_all = []
    var j = 0
    ge_all.forEach(function (b) {
      b.ge.start(function () {
        log_all[b.i] = b.log
        j++
        if (j === ge_all.length) {
          verify()
        }
      })
    })

    function verify () {
      expect(log_all).to.equal(Log_all_expected)

      // IMPORTANT: confirms memory usage is well-behaved
      expect(process.memoryUsage().rss).below(150000000)

      done()
    }

    function descend (all, gec, depth) {
      if (4 < depth) {
        return
      }

      var jump = all[all.length - 1] || []

      for (var ge = 0; ge < gec; ++ge) {
        var add_jump = jump.concat([])
        add_jump.push({ type: 'add', ge: ge })
        all.push(add_jump)
        descend(all, gec, depth + 1)
      }

      for (ge = 0; ge < gec; ++ge) {
        var gate_jump = jump.concat([])
        gate_jump.push({ type: 'gate', ge: ge })
        all.push(gate_jump)
        descend(all, gec + 1, depth + 1)
      }

      return all
    }


    function build (path) {
      var log = []
      var ge = [GateExecutor()]
      for (var i = 0; i < path.length; i++) {
        var part = path[i]
        var fn, n
        if ('add' === part.type) {
          n = 'a_p_' + i + '_g_' + part.ge
          eval("fn = function " + n + " (done) { log.push('" + n + "'); done() }")
          ge[part.ge].add({ fn: fn })
        }
        else if ('gate' === part.type) {
          var geI = ge.length
          ge[geI] = ge[part.ge].gate()
          n = 'g_p_' + i + '_g_' + part.ge
          eval("fn = function " + n + " (done) { log.push('" + n + "'); done() }")
          ge[geI].add({ fn: fn })
        }
      }

      return {
        log: log,
        ge: ge[0]
      }
    }
  })

  it('gate-timeout', function (done) {
    var log = []

    var ge = GateExecutor({ timeout: 200, interval: 11 })

    ge.add({
      id: 'aa',
      dn: 'Daa',
      fn: function (d) {
        log.push('s-aa')
        setTimeout(function () { log.push('e-aa'); d() }, 100)
      }
    })

    var ge2 = ge.gate()

    ge2.add({
      id: 'bb',
      dn: 'Dbb',
      tm: 400,
      fn: function bb (d) {
        log.push('s-bb')
        setTimeout(function () { log.push('e-bb'); d() }, 300)
      }
    })

    ge.add({
      id: 'cc',
      dn: 'Dcc',
      fn: function cc (d) {
        log.push('s-cc')
        setTimeout(function () { log.push('e-cc'); d() }, 100)
      }
    })

    ge.start(function () {
      expect(log).to.equal([ 's-aa', 's-bb', 'e-aa', 'e-bb', 's-cc', 'e-cc' ])
      done()
    })
  })


  it('start-pause', function (done) {
    var log = []
    var ge = GateExecutor({ timeout: 200, interval: 11 })

    ge.add({
      fn: function (d) {
        log.push('s-aa')
        expect(ge.isclear()).to.equal(false)
        setTimeout(function () { log.push('e-aa'); d() }, 100)
      }
    })

    expect(ge.isclear()).to.equal(false)

    ge.start()
    ge.add({
      fn: function (d) {
        log.push('s-bb')
        expect(ge.isclear()).to.equal(false)
        setTimeout(function () { log.push('e-bb'); d() }, 100)
      }
    })

    ge.start(function () {
      throw new Error('should never get here as replaced')
    })

    ge.start(function () {
      expect(log).to.equal([ 's-aa', 's-bb', 'e-aa', 'e-bb' ])
      expect(ge.isclear()).to.equal(true)
      ge.pause()

      ge.add({
        fn: function (d) {
          log.push('s-cc')
          expect(ge.isclear()).to.equal(false)
          setTimeout(function () { log.push('e-cc'); d() }, 100)
        }
      })

      setTimeout(function () {
        expect(log).to.equal([ 's-aa', 's-bb', 'e-aa', 'e-bb' ])

        ge.start(function () {
          expect(log).to.equal(
            [ 's-aa', 's-bb', 'e-aa', 'e-bb', 's-cc', 'e-cc' ])
          expect(ge.isclear()).to.equal(true)
          done()
        })
      }, 333)
    })
  })

  it('memory', function (done) {
    var ge = GateExecutor()
    var start = Date.now()

    for (var i = 0; i < 10000; ++i) {
      ge.add({
        fn: function foo (done) {
          done()
        }
      })
    }
    var added = Date.now()

    ge.start(function () {
      var end = Date.now()
      var ges = ge.state().internal

      expect(end - start).below(444)
      expect(added - start).below(222)
      expect(ges.qlen).to.equal(0)
      expect(ges.hlen).to.equal(0)
      expect(ges.klen).to.equal(0)
      expect(ges.tlen).to.equal(0)

      done()
    })
  })

  it('errors', function (done) {
    // waiting on https://github.com/hapijs/lab/issues/703
    done()

  
    // try {
    //   GateExecutor()
    //     .add({
    //       fn: function foo (done) {
    //         throw new Error('foo')
    //       }
    //     })
    //     .start()
    // }
    // catch(e) {
    //  expect(e.message).to.equal('foo')
    //   done()
    // }

  })

})


var Log_all_expected = require('./log_all_expected.js')


function make_it(lab) {
  return function it(name, opts, func) {
    if ('function' === typeof opts) {
      func = opts
      opts = {}
    }
    
    lab.it(
      name,
      opts,
      Util.promisify(function(x, fin) {
        func(fin)
      })
    )
  }
}


}).call(this,require('_process'),require("timers").setImmediate)
},{"..":1,"./log_all_expected.js":82,"@hapi/code":2,"@hapi/lab":29,"_process":73,"timers":74,"util":80,"util.promisify/shim":77}],82:[function(require,module,exports){
module.exports =
[ [ 'a_p_0_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_1' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_1' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_4_g_1', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_4_g_1', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_1' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_1', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_1', 'a_p_4_g_1' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_1', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_1', 'g_p_4_g_1' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_4_g_1', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_2' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_4_g_1', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_2' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_1' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_1', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_1', 'a_p_4_g_1' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_1', 'a_p_4_g_2' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_1', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_1', 'g_p_4_g_1' ],
  [ 'a_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_1', 'g_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_4_g_1', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_4_g_1', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_1', 'a_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_1', 'a_p_2_g_0', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_1', 'a_p_4_g_1', 'a_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_1', 'a_p_2_g_0', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_1', 'g_p_4_g_1', 'a_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_4_g_1', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_4_g_1', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_1', 'a_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_1', 'a_p_2_g_0', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_1', 'a_p_4_g_1', 'a_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_1', 'a_p_4_g_2', 'a_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_1', 'a_p_2_g_0', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_1', 'g_p_4_g_1', 'a_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_1', 'g_p_4_g_2', 'a_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'a_p_4_g_1', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'g_p_4_g_1', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'a_p_3_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'a_p_3_g_1', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'a_p_3_g_1', 'a_p_4_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'a_p_3_g_1', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'a_p_3_g_1', 'g_p_4_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'a_p_4_g_1', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'g_p_3_g_0', 'a_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'g_p_4_g_1', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'g_p_3_g_0', 'g_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'g_p_3_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_4_g_1', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_4_g_2', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_4_g_1', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_4_g_2', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_1', 'g_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_1', 'g_p_2_g_0', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_1', 'a_p_4_g_1', 'g_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_1', 'g_p_2_g_0', 'a_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_1', 'g_p_2_g_0', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_1', 'g_p_4_g_1', 'g_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_1', 'g_p_2_g_0', 'g_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_2', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_4_g_1', 'g_p_2_g_0', 'a_p_3_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_2', 'a_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_2', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_4_g_1', 'g_p_2_g_0', 'a_p_3_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_2', 'g_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_4_g_1', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_4_g_2', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_3' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_4_g_1', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_4_g_2', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_3' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_1', 'g_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_1', 'g_p_2_g_0', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_1', 'a_p_4_g_1', 'g_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_1', 'g_p_2_g_0', 'a_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_1', 'a_p_4_g_3', 'g_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_1', 'g_p_2_g_0', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_1', 'g_p_4_g_1', 'g_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_1', 'g_p_2_g_0', 'g_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_1', 'g_p_4_g_3', 'g_p_2_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_2', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'a_p_4_g_1', 'g_p_2_g_0', 'g_p_3_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_2', 'a_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_2', 'a_p_4_g_3' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_2', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_4_g_1', 'g_p_2_g_0', 'g_p_3_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_2', 'g_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_2', 'g_p_4_g_3' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_4_g_1', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_4_g_2', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_4_g_1', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_4_g_2', 'a_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_3_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_3_g_1', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_3_g_1', 'a_p_4_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_4_g_2', 'a_p_3_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_3_g_1', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_3_g_1', 'g_p_4_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_4_g_2', 'a_p_3_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_3_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_3_g_2', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_3_g_2', 'a_p_4_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_3_g_2', 'a_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_3_g_2', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_3_g_2', 'g_p_4_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_3_g_2', 'g_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_4_g_1', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_4_g_2', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_0', 'a_p_4_g_3' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_4_g_1', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_4_g_2', 'g_p_3_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_0', 'g_p_4_g_3' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'a_p_4_g_2', 'g_p_3_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_3' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_4_g_2', 'g_p_3_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_3' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_2', 'a_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_2', 'a_p_4_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_2', 'a_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_2', 'a_p_4_g_3' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_2', 'g_p_4_g_0' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_2', 'g_p_4_g_1' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_2', 'g_p_4_g_2' ],
  [ 'a_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_1', 'g_p_3_g_2', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'a_p_1_g_0', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'a_p_1_g_0', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'a_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'a_p_1_g_0', 'a_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'a_p_4_g_1', 'a_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'a_p_1_g_0', 'a_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_4_g_1', 'a_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'a_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'a_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_1_g_0', 'a_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_4_g_1', 'a_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_4_g_2', 'a_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_1_g_0', 'a_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_4_g_1', 'a_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_4_g_2', 'a_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_1_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_1_g_0', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_4_g_1', 'a_p_1_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_1_g_0', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_4_g_1', 'a_p_1_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_3_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_3_g_1', 'a_p_1_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_3_g_1', 'a_p_4_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_3_g_1', 'a_p_1_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_3_g_1', 'g_p_4_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_1_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_1_g_0', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_4_g_1', 'a_p_1_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_1_g_0', 'g_p_3_g_0', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_1_g_0', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_4_g_1', 'a_p_1_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_1_g_0', 'g_p_3_g_0', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'a_p_1_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_2', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'a_p_1_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_2', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'a_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'a_p_4_g_1', 'a_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_4_g_1', 'a_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_4_g_1', 'a_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_1_g_0', 'g_p_2_g_0', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_4_g_3', 'a_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_4_g_1', 'a_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_4_g_3', 'a_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_2', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_2', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_1_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_1_g_0', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_4_g_1', 'a_p_1_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_4_g_2', 'a_p_1_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_1_g_0', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_4_g_1', 'a_p_1_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_4_g_2', 'a_p_1_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_1', 'a_p_1_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_1', 'a_p_4_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_4_g_2', 'a_p_3_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_1', 'a_p_1_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_1', 'g_p_4_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_4_g_2', 'a_p_3_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_2', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_2', 'a_p_1_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_2', 'a_p_4_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_2', 'a_p_4_g_2', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_2', 'a_p_1_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_2', 'g_p_4_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_2', 'g_p_4_g_2', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_1_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_1_g_0', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_4_g_1', 'a_p_1_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_4_g_2', 'a_p_1_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_1_g_0', 'g_p_3_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_1_g_0', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_4_g_1', 'a_p_1_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_4_g_2', 'a_p_1_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_1_g_0', 'g_p_3_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'a_p_1_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_4_g_2', 'g_p_3_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_3', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'a_p_1_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_4_g_2', 'g_p_3_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_3', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_2', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_2', 'a_p_1_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_2', 'a_p_4_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_2', 'a_p_4_g_2', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_2', 'a_p_4_g_3', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_2', 'a_p_1_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_2', 'g_p_4_g_1', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_2', 'g_p_4_g_2', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_2', 'g_p_4_g_3', 'a_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_0', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_4_g_1', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_0', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_4_g_1', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_3_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_3_g_1', 'a_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_3_g_1', 'a_p_4_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_3_g_1', 'a_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_3_g_1', 'g_p_4_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_4_g_1', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_4_g_1', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_3_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_3_g_1', 'a_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_3_g_1', 'a_p_4_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_3_g_1', 'a_p_4_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_3_g_1', 'a_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_3_g_1', 'g_p_4_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_3_g_1', 'g_p_4_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'a_p_4_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'g_p_4_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'a_p_3_g_1', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'a_p_3_g_1', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'a_p_3_g_1', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'a_p_3_g_1', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'a_p_4_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_0', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'g_p_4_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_0', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_4_g_1', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'a_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_4_g_1', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'g_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_3_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_3_g_1', 'g_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_3_g_1', 'a_p_4_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_3_g_1', 'g_p_2_g_0', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_3_g_1', 'g_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_3_g_1', 'g_p_4_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_3_g_1', 'g_p_2_g_0', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'a_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_4_g_1', 'g_p_2_g_0', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'a_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'a_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_4_g_1', 'g_p_2_g_0', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'a_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_4_g_1', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'a_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_4_g_1', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'g_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_3_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_3_g_1', 'g_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_3_g_1', 'a_p_4_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_3_g_1', 'g_p_2_g_0', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_3_g_1', 'a_p_4_g_3', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_3_g_1', 'g_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_3_g_1', 'g_p_4_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_3_g_1', 'g_p_2_g_0', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_3_g_1', 'g_p_4_g_3', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'a_p_4_g_1', 'g_p_2_g_0', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_2', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_4_g_1', 'g_p_2_g_0', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_2', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_4_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_4_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_1', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_1', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_4_g_2', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_1', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_1', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_4_g_2', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_2', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_2', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_4_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_4_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'a_p_4_g_2', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_4_g_2', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_2', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_2', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_2', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_2', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_4_g_2', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_4_g_2', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'a_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'a_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'a_p_4_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'a_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_4_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_2', 'a_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'a_p_3_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_2', 'a_p_4_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_2', 'a_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'a_p_3_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_2', 'g_p_4_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_4_g_2', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_4_g_2', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'a_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'a_p_4_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_4_g_3', 'g_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'a_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_4_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_4_g_3', 'g_p_1_g_0', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_2', 'a_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_3_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_2', 'a_p_4_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_2', 'a_p_4_g_3', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_2', 'a_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_3_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_2', 'g_p_4_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_2', 'g_p_4_g_3', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_4_g_1', 'g_p_1_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'a_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_4_g_1', 'g_p_1_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'g_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_3_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_3_g_1', 'g_p_1_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_3_g_1', 'a_p_4_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_3_g_1', 'g_p_1_g_0', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_3_g_1', 'g_p_4_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'a_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_4_g_1', 'g_p_1_g_0', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'a_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'a_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_4_g_1', 'g_p_1_g_0', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'a_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'a_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'g_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_1_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_1_g_0', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_3', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_3', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_2', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_2', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'a_p_2_g_2' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'a_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_2' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_2' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_3_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_3_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'a_p_2_g_2' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_2' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'a_p_2_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_4_g_3', 'g_p_1_g_0', 'a_p_2_g_2' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_2' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_4_g_3', 'g_p_1_g_0', 'a_p_2_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_3_g_2', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_2_g_2', 'g_p_3_g_2', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_4_g_2', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_4_g_3', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_4_g_2', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_4_g_3', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'a_p_4_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_4_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_2', 'g_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'a_p_3_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_2', 'a_p_4_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_2', 'g_p_2_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_2', 'g_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'a_p_3_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_2', 'g_p_4_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_3_g_2', 'g_p_2_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_3', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_4_g_2', 'g_p_2_g_0', 'a_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_3', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_3', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_4_g_2', 'g_p_2_g_0', 'a_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_3_g_3', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_4_g_2', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_4_g_3', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_4_g_2', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_4_g_3', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'a_p_4_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_4_g_4', 'g_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_4_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_4_g_4', 'g_p_1_g_0', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_2', 'g_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_3_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_2', 'a_p_4_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_2', 'g_p_2_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_2', 'a_p_4_g_4', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_2', 'g_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_3_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_2', 'g_p_4_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_2', 'g_p_2_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_3_g_2', 'g_p_4_g_4', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_3', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'a_p_4_g_2', 'g_p_2_g_0', 'g_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_3', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_3', 'a_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_3', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_4_g_2', 'g_p_2_g_0', 'g_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_3', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_0', 'g_p_3_g_3', 'g_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_4_g_1', 'g_p_1_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'a_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_4_g_3', 'g_p_1_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_4_g_1', 'g_p_1_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'g_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_4_g_3', 'g_p_1_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_1', 'g_p_1_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_1', 'a_p_4_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_1', 'g_p_1_g_0', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_4_g_3', 'a_p_3_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_1', 'g_p_4_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_4_g_3', 'a_p_3_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'a_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_4_g_1', 'g_p_1_g_0', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'a_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_4_g_3', 'g_p_1_g_0', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'a_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_4_g_1', 'g_p_1_g_0', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'a_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_4_g_3', 'g_p_1_g_0', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_3', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_3', 'g_p_1_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_3', 'a_p_4_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_3', 'g_p_1_g_0', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_3', 'a_p_4_g_3', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_3', 'g_p_1_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_3', 'g_p_4_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_3', 'g_p_1_g_0', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_3_g_3', 'g_p_4_g_3', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'a_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_4_g_3', 'g_p_1_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_0', 'a_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'g_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_4_g_3', 'g_p_1_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_0', 'g_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_1_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_1_g_0', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_4_g_3', 'g_p_3_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_4', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_4_g_3', 'g_p_3_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_4', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'a_p_4_g_3', 'g_p_1_g_0', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_2', 'a_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_4_g_3', 'g_p_1_g_0', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_1_g_0', 'g_p_3_g_2', 'g_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_3', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_3', 'g_p_1_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_3', 'a_p_4_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_3', 'g_p_1_g_0', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_3', 'a_p_4_g_3', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_3', 'a_p_4_g_4', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_3', 'g_p_1_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_3', 'g_p_4_g_1', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_3', 'g_p_1_g_0', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_3', 'g_p_4_g_3', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_2_g_1', 'g_p_3_g_3', 'g_p_4_g_4', 'g_p_1_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_4_g_3', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_4_g_3', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_2' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_2' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_2' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'a_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_4_g_3', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_4_g_3', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_3', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_3', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_3', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_3', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_3', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_3_g_3', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_4_g_3', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_0', 'a_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_4_g_3', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_0', 'g_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_2' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_2' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'a_p_4_g_4', 'g_p_1_g_0', 'g_p_2_g_2' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_2' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_3_g_1', 'g_p_4_g_4', 'g_p_1_g_0', 'g_p_2_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'a_p_4_g_3', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_2', 'a_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_4_g_3', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_2', 'g_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_3', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'a_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_3', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_3', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_3', 'a_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_3', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_4_g_1', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_3', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_3', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_0', 'g_p_2_g_2', 'g_p_3_g_3', 'g_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_0', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_1', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_0', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_1', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'a_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_1', 'a_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_1', 'a_p_4_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'a_p_3_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_1', 'a_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_1', 'g_p_4_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'a_p_3_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'a_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'a_p_4_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'a_p_4_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'a_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_4_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_4_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_1', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_1', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'a_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_1', 'a_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_1', 'a_p_4_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'g_p_3_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_1', 'a_p_4_g_3', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_1', 'a_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_1', 'g_p_4_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'g_p_3_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_1', 'g_p_4_g_3', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_4_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_4_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_4_g_3', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_4_g_1', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_4_g_2', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_4_g_3', 'a_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'a_p_4_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'a_p_2_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'g_p_4_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'a_p_2_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'a_p_3_g_1', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'a_p_3_g_1', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'a_p_2_g_1', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'a_p_3_g_1', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'a_p_3_g_1', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'a_p_2_g_1', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'a_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'a_p_2_g_1', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'a_p_2_g_1', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'a_p_4_g_2', 'a_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'a_p_2_g_1', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'a_p_2_g_1', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_4_g_2', 'a_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'a_p_4_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'a_p_2_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'g_p_4_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'a_p_2_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'a_p_2_g_1', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'a_p_2_g_1', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_2_g_1', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_2_g_1', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_4_g_2', 'a_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_4_g_3', 'a_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_2_g_1', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_2_g_1', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_4_g_2', 'a_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_4_g_3', 'a_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_4_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_4_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_3_g_1', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_3_g_1', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_4_g_2', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_3_g_1', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_3_g_1', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_4_g_2', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_3_g_2', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_3_g_2', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_4_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_4_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_1', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_1', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'a_p_4_g_2', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_1', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_1', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_1', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_4_g_2', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_1', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_2', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_2', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_2', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_2_g_2', 'g_p_3_g_2', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_1', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'a_p_4_g_3', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_1', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'g_p_2_g_0', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'g_p_4_g_3', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_1', 'g_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_1', 'a_p_4_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'a_p_3_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_1', 'g_p_2_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_1', 'g_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_1', 'g_p_4_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'a_p_3_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_1', 'g_p_2_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'a_p_4_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'a_p_4_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_2_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_4_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_4_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_2_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'a_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'a_p_3_g_3', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_1', 'g_p_2_g_0', 'a_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'g_p_2_g_0', 'a_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'a_p_3_g_3', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'a_p_3_g_3', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_1', 'g_p_2_g_0', 'a_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'g_p_2_g_0', 'a_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'a_p_3_g_3', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_1', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'a_p_4_g_3', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_0', 'a_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_1', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'g_p_2_g_0', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'g_p_4_g_3', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_0', 'g_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_1', 'g_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_1', 'a_p_4_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'g_p_3_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_1', 'g_p_2_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_1', 'a_p_4_g_4', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_1', 'g_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_1', 'g_p_4_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'g_p_3_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_1', 'g_p_2_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_1', 'g_p_4_g_4', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_2_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_4_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_4_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_2_g_0', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_4_g_4', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_2_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_4_g_1', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_4_g_2', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_2_g_0', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_4_g_4', 'g_p_2_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_3', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_1', 'g_p_2_g_0', 'g_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'g_p_2_g_0', 'g_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_3', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_3', 'a_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_3', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_1', 'g_p_2_g_0', 'g_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'g_p_2_g_0', 'g_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_3', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_0', 'g_p_3_g_3', 'g_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_4_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'g_p_2_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_4_g_3', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_4_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'g_p_2_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_4_g_3', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_1', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_1', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'g_p_2_g_1', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_4_g_3', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_1', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_1', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'g_p_2_g_1', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_4_g_3', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_2_g_1', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_2_g_1', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'a_p_4_g_2', 'g_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_2_g_1', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_2_g_1', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_2_g_1', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_4_g_2', 'g_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_3_g_2', 'g_p_2_g_1', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_3', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_3', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'g_p_2_g_1', 'a_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_3', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_3', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_3', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'g_p_2_g_1', 'a_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_3_g_3', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_4_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'g_p_2_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_4_g_3', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_0', 'a_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_4_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'g_p_2_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_4_g_3', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_0', 'g_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'g_p_2_g_1', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'a_p_4_g_3', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_1', 'a_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'g_p_2_g_1', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_4_g_3', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_1', 'g_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_2_g_1', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_2_g_1', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_4_g_2', 'g_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_2_g_1', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'a_p_4_g_4', 'g_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_2_g_1', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_2_g_1', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_4_g_2', 'g_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_2_g_1', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_3_g_2', 'g_p_4_g_4', 'g_p_2_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_3', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_3', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'a_p_4_g_2', 'g_p_2_g_1', 'g_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_3', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_3', 'a_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_3', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_3', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_4_g_2', 'g_p_2_g_1', 'g_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_3', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_1', 'g_p_3_g_3', 'g_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_4_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_4_g_3', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_4_g_1', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_4_g_2', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_4_g_3', 'a_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_1', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_1', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_4_g_2', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_4_g_3', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_1', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_1', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_4_g_2', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_4_g_3', 'a_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_2', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_4_g_3', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_2', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_4_g_3', 'a_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_3', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_3', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_3', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_3', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_3', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_3', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_3', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_3_g_3', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_0', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_4_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_4_g_3', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_0', 'a_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_0', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_4_g_1', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_4_g_2', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_4_g_3', 'g_p_3_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_0', 'g_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_1', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_1', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_4_g_2', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_4_g_3', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_1', 'a_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_1', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_1', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_4_g_2', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_4_g_3', 'g_p_3_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_1', 'g_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_2', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_2', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_2', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'a_p_4_g_3', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_2', 'a_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_2', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_2', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_2', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_4_g_3', 'g_p_3_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_2', 'g_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_3', 'a_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_3', 'a_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_3', 'a_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_3', 'a_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_3', 'a_p_4_g_4' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_3', 'g_p_4_g_0' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_3', 'g_p_4_g_1' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_3', 'g_p_4_g_2' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_3', 'g_p_4_g_3' ],
  [ 'g_p_0_g_0', 'g_p_1_g_1', 'g_p_2_g_2', 'g_p_3_g_3', 'g_p_4_g_4' ] ]

},{}]},{},[81])(81)
});
