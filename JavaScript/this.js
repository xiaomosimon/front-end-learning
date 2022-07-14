// 1. bind
// When the bind method is called with argument thisArg and zero or more args, it performs the following steps:

// 1. Let Target be the this value.
// 2. If IsCallable(Target) is false, throw a TypeError exception.
// 3. Let F be ? BoundFunctionCreate(Target, thisArg, args).
// 4. Let L be 0.
// 5. Let targetHasLength be ? HasOwnProperty(Target, "length").
// 6. If targetHasLength is true, then
// a. Let targetLen be ? Get(Target, "length").
// b. If Type(targetLen) is Number, then
// i. If targetLen is +∞𝔽, set L to +∞.
// ii. Else if targetLen is -∞𝔽, set L to 0.
// iii. Else,
// 1. Let targetLenAsInt be ! ToIntegerOrInfinity(targetLen).
// 2. Assert: targetLenAsInt is finite.
// 3. Let argCount be the number of elements in args.
// 4. Set L to max(targetLenAsInt - argCount, 0).
// 7. Perform ! SetFunctionLength(F, L).
// 8. Let targetName be ? Get(Target, "name").
// 9. If Type(targetName) is not String, set targetName to the empty String.
// 10. Perform SetFunctionName(F, targetName, "bound").
// 11. Return F.
// xx.bind(xx, x, x, x, x);
Function.prototype.bindCore = function (thisArg) {
  if (typeof this !== "function") {
    throw new TypeError("thisArg is not callable");
  }
  var argArray = Array.prototype.slice.call(arguments, 1);
  var argArrayLength = argArray.length;
  var _this = this;
  var Fn = function () {};
  var FnBound = function () {
    argArray.length = argArrayLength;
    argArray.push.apply(argArray, arguments);
    // 如果为 【new a.bind(b)】 bind改变this指向无效
    return _this.apply(
      Fn.prototype.isPrototypeOf(this) ? this : thisArg,
      argArray
    );
  };
  // 为了实现原型继承
  if (this.prototype) {
    // 让中间函数原型指向调用者的构造
    Fn.prototype = this.prototype;
  }
  FnBound.prototype = new Fn();
  return FnBound;
};
// 2. apply
// When the apply method is called with arguments thisArg and argArray, the following steps are taken:

// 1. Let func be the this value.
// 2. If IsCallable(func) is false, throw a TypeError exception.
// 3. If argArray is undefined or null, then
// a. Perform PrepareForTailCall().
// b. Return ? Call(func, thisArg).
// 4. Let argList be ? CreateListFromArrayLike(argArray).
// 5. Perform PrepareForTailCall().
// 6. Return ? Call(func, thisArg, argList).
// xx.apply(xx, [x, x, x]);
Function.prototype.applyCore = function (thisArg, argArray) {
  if (typeof this !== "function") {
    throw new TypeError("thisArg is not callable");
  }
  var target = thisArg == null ? window || global : thisArg;
  target._FN_ = this;

  var result;

  if (!argArray) {
    result = target._FN_();
  } else {
    if (!Array.isArray(argArray)) {
      throw new TypeError("argArray must be an array");
    }
    // 1
    // let arr = [];
    // for (var i = 0; i < argArray.length; i++) {
    //   arr.push("arguments[" + i + "]");
    // }
    // result = eval("target._FN_(" + arr + ")");
    // 2
    result = target._FN_(...argArray);
  }
  delete target._FN_;
  return result;
};
// 3 call
// When the call method is called with argument thisArg and zero or more args, the following steps are taken:

// 1. Let func be the this value.
// 2. If IsCallable(func) is false, throw a TypeError exception.
// 3. Perform PrepareForTailCall().
// 4. Return ? Call(func, thisArg, args).
// xx.call(xx, x, x, x, x);
Function.prototype.callCore = function (thisArg) {
  if (typeof this !== "function") {
    throw new TypeError("thisArg is not callable");
  }

  var target = thisArg == null ? window || global : thisArg;
  target._FN_ = this;

  var argArray = [];
  // 1
  // for (var i = 1; i < arguments.length; i++) {
  //   argArray.push("arguments[" + i + "]");
  // }
  // var result = eval("target._FN_(" + argArray + ")");
  // 2
  // for (var i = 1; i < arguments.length; i++) {
  //   argArray.push(arguments[i]);
  // }
  // var result = target._FN_(...argArray);
  // 3
  argArray = Array.from(arguments).slice(1);
  var result = target._FN_(...argArray);

  delete target._FN_;
  return result;
};

function abc() {
  console.log(this, arguments);
}
let a = { x: 1 };
console.log(abc.bindCore(a, [1, 3], 1)());
console.log(abc.bind(a, [1, 3], 1)());
console.log(abc.applyCore(a, [1, 3], 1));
console.log(abc.apply(a, [1, 3], 1));
console.log(abc.callCore(a, 1, 3));
console.log(abc.call(a, 1, 3));
console.log(a);
