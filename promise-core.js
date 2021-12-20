// MDN/Promise: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise
// Promise/A+ : https://promisesaplus.com/

// 1、术语

// 1.1 promise 是一个对象或函数，其then方法的行为符合本规范
// 1.2 thenable 是定义then方法的对象或函数
// 1.3 value 是任何合法的JavaScript值 （包括 undefined, thenable 或 promise);
// 1.4 exception 是使用throw语句抛出的值。
// 1.5 reason 是一个值，表示promise was rejected

// 2、要求

// 2.1 Promise States
// promise必须处于以下三种状态之一：pending, fulfilled, rejected

// 2.1.1 当 pending 时， promise ：
// 2.1.1.1 可以转发为fulfilled或rejected

// 2.1.2 当 fulfilled 时， promise ：
// 2.1.2.1 不得再转化为任何其他状态
// 2.1.2.2 必须有一个不能改变的值

// 2.1.3 当 rejected 时， promise ：
// 2.1.3.1 不得再转化为任何其他状态
// 2.1.3.2 必须有一个不能改变的值

// 2.2 then方法
// promise 必须提供一个then方法接受当前的或最终的 value or reason
// promise 的 then 方法必须接受2个参数
// promise.then(onFulfilled, onRejected);

// 2.2.1 onFulfilled 和 onRejected 都是可选参数：
// 2.2.1.1 如果 onFulfilled 不是函数，那么必须被忽略
// 2.2.1.2 如果 onRejected 不是函数，那么必须被忽略

// 2.2.2 如果 onFulfilled 是函数：
// 2.2.2.1 在 promise 状态为 fulfilled 之后被调用，并且 promise 的 value 作为 onFulfilled 的第一个参数
// 2.2.2.2 不能在 promise 状态为 fulfilled 之前被调用
// 2.2.2.3 不能被多次调用

// 2.2.3 如果 onRejected 是函数：
// 2.2.3.1 在 promise 状态为 rejected 之后被调用，并且 promise 的 reason 作为 onRejected 的第一个参数
// 2.2.3.2 不能在 promise 状态为 rejected 之前被调用
// 2.2.3.3 不能被多次调用

// 2.2.4 在执行上下文堆栈仅包含平台代码之前，onFulfilled 或者 onRejected 都不能被调用

// 2.2.5 onFulfilled 和 onRejected 必须作为函数被调用

// 2.2.6 then 在同个 promise 上被多次调用
// 2.2.6.1 如果/当 promise 的状态为 fulfilled ，
// 所有相应的 onFulfilled 回调必须按照它们对应的 then 的原始调用顺序执行

// 2.2.6.2 如果/当 promise 的状态为rejected ，
// 所有相应的 onRejected 回到必须按照它们对应的 then 的原始调用顺序执行

// 2.2.7 then 必须返回新的promise
// promise2 = promise1.then(onFulfilled, onRejected);

// 2.2.7.1 如果 onFulfilled 或者 onRejected 返回值 x ，
// 则运行 The Promise Resolution Procedure
// [[Resolve]](promise2, x);

// 2.2.7.2 如果 onFulfilled 或者 on Rejected 抛出异常 e ，
// promise2 必须以 e 作为 reason 为 rejected 的值

// 2.2.7.3 如果 onFulfilled 不是函数并且 promise1 的状态为 fulfilled ，
// promise2 必须实现和 promise1 的 value 相同的值为 fulfilled 的值

// 2.2.7.4 如果 onRejected 不是函数并且 promise1 的状态为 rejected ，
// promise2 必须实现和promise1 的 reason 相同的值为 rejected 的值

// 2.3 The Promise Resolution Procedure
// 是一个抽象的操作：输入一个 promise 和 value ，表示为 [[Resolve]](promise, x)
// 如果 x 的值是 thenable ，并在假设 x 有那么一点像 promise 情况下，试图 promise 采用 x 的状态，
// 否则以 x 的值 作为 promise

// 对 thenables 的这种处理允许 promise 实现互操作，
// 只要它们公开一个 Promises/A+ 兼容的then方法。它还允许 Promises/A+ 实现用合理的then方法“兼容”不一致的实现。

// 要运行 [[Resolve]](promise, x) ,请执行以下步骤：
// 2.3.1 如果 promise 和 x 引用同一个对象， promise 以 TypeError 为 reason 为 rejected 的值

// 2.3.2 如果 x 是 promise , 则根据其状态：
// 2.3.2.1 如果 x 值为 pending , 则 promise 必须保持 pending 状态直到为 fulfilled 或 rejected
// 2.3.2.2 如果/当 x 的值为 fulfilled , fulfill promise 的 value 为 x
// 2.3.2.3 如果/当 x 的值为 rejected , reject promise 的 reason 为 x

// 2.3.3 否则如果 x 是一个对象或者函数
// 2.3.3.1 让 x.then 作为 then
// 2.3.3.2 如果检测到 x.then 的结果抛出异常 e ， reject promise 的 reason 为 e

// 2.3.3.3 如果 then 是函数， 调用 x 并 this 指向 x ，第一个参数为 resolvePromise ，第二个参数为 rejectPromise
// 2.3.3.3.1 如果/当 以 y 为 value 调用 resolvePromise ,运行 [[Resolve]](promise, y)
// 2.3.3.3.2 如果/当 以 reason 为 r 调用 rejectPromise , reject promise 值 r
// 2.3.3.3.3 如果同时调用 resolvePromise 和 rejectPromise ，或者对同一个参数进行多次调用，
// 则第一个调用优先，任何进一步的调用都将被忽略

// 2.3.3.3.4 如果调用 then 抛出异常 e：
// 2.3.3.3.4.1 如果 resolvePromise 或者 rejectPromise 被调用了，都将被忽略
// 2.3.3.3.4.2 否则， reject promise 的 reason 为 e

// 2.3.3.4 如果 then 不是函数， fulfill promise 值 x

// 2.3.4 如果 x 不是一个函数或者对象， fulfill promise 值 x

// 3. Notes

// 3.1 "platform code" 是指引擎、环境和promise实现代码。在实践中，这要求确保 onFulfilled 和 onRejected
// 异步地执行，在调用 then 的事件循环之后，并使用新的堆栈（promise2）。
// 这可以通过“宏任务”机制（例如 setTimeout 或 setImmediate)
// 或“微任务”机制（例如 MutationObserver 或 queueMicrotask 等）
// 来实现 process.nextTick。
// 由于 promise 实现被认为是 "platform code" ，本身可能包含一个任务调度队列或 "trampoline" ，在其中调用处理程序。

// 3.2 在 strict 模式下 this 将会是 undefined ；在 sloppy 模式下，this 是全局对象

// 3.3 promise2 === promise1 如果实现满足所有要求，则实现可能允许。
// 每个实现都应该记录它是否可以产生 promise2 === promise1 以及在什么条件产生。

// 3.4 只有 x 当它来自当前的实现时，才会知道这是一个真正的 promise 。
// 该条款允许使用特定于实现手段来采用已知符合 promise 的状态。

// 3.5 首先存储对的引用 x.then, 然后测试该引用，然后调用该引用的过程避免了对该 x.then 属性的对此访问。
// 这些预防错误对于确保访问器属性的一致性很重要，访问器属性的值可能会在检索之间发生变化。

// 3.6 实现不设置 thenable 链的深度任何限制，并假设超出任何限制递归将是无限的。
// 只有真正的循环才会导致 TypeError; 如果遇到无限的不同的 thenable 链，则永远递归是正确的行为。

"use strict";

const PromiseCore = (function () {
  // 状态值
  const PENDING = "pending";
  const FULFILLED = "fulfilled";
  const REJECTED = "rejected";
  // promise状态和结果
  const PromiseState = Symbol("PromiseState");
  const PromiseResult = Symbol("PromiseResult");
  // 队列
  const thenables = Symbol("thenables");
  const catchables = Symbol("catchables");
  // 实例方法
  const changePromiseState = Symbol("changePromiseState");
  const resolvePromise = Symbol("resolvePromise");
  // 判断类型
  const isFunction = (value) => typeof value === "function";
  const isObject = (value) =>
    Object.prototype.toString.call(value) === "[object Object]";
  const isIterable = (obj) =>
    obj != null && typeof obj[Symbol.iterator] === "function";
  
  // 类 
  return class {
    constructor(fn) {
      if (!isFunction(fn)) {
        throw new TypeError("Promise resolver undefined is not a function");
      }
      this[thenables] = [];
      this[catchables] = [];
      this[PromiseState] = PENDING;

      const resolve = (value) => {
        this[changePromiseState](FULFILLED, value, thenables);
      };

      const reject = (reason) => {
        this[changePromiseState](REJECTED, reason, catchables);
      };
      fn(resolve, reject);
    }

    [changePromiseState](promiseState, promiseResult, queueName) {
      if (this[PromiseState] !== PENDING) return;
      this[PromiseState] = promiseState;
      this[PromiseResult] = promiseResult;
      this[queueName].forEach((callback) => callback(promiseResult));
    }

    [resolvePromise](x, resolve, reject) {
      if (x instanceof PromiseCore) {
        x.then(resolve, reject);
      } else if (isFunction(x) || isObject(x)) {
        let then = null;
        try {
          if (isFunction(x.then)) {
            let called = false;
            then = x.then;
            then.call(
              x,
              (y) => {
                if (called) return;
                called = true;
                this[resolvePromise](y, resolve, reject);
              },
              (r) => {
                if (called) return;
                called = true;
                reject(r);
              }
            );
          } else {
            resolve(x);
          }
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(x);
      }
    }

    then(onFulfilled, onRejected) {
      const thenable = (value, resolve, reject) => {
        queueMicrotask(() => {
          if (!isFunction(onFulfilled)) {
            resolve(value);
            return;
          }
          try {
            const x = onFulfilled(value);
            this[resolvePromise](x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };
      const catchable = (reason, resolve, reject) => {
        queueMicrotask(() => {
          if (!isFunction(onRejected)) {
            reject(reason);
            return;
          }
          try {
            const x = onRejected(reason);
            this[resolvePromise](x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };
      switch (this[PromiseState]) {
        case FULFILLED: {
          return new PromiseCore((resolve, reject) => {
            thenable(this[PromiseResult], resolve, reject);
          });
        }
        case REJECTED: {
          return new PromiseCore((resolve, reject) => {
            catchable(this[PromiseResult], resolve, reject);
          });
        }
        case PENDING: {
          return new PromiseCore((resolve, reject) => {
            this[thenables].push((value) => {
              thenable(value, resolve, reject);
            });
            this[catchables].push((reason) => {
              catchable(reason, resolve, reject);
            });
          });
        }
      }
    }

    catch(reason) {
      return this.then(undefined, reason);
    }

    finally(onFinally) {
      return this.then(
        (value) => {
          return PromiseCore.resolve(onFinally()).then(() => value);
        },
        (error) => {
          return PromiseCore.resolve(onFinally()).then(() => {
            throw error;
          });
        }
      );
    }

    static all(iterable) {
      if (!isIterable(iterable))
        throw new TypeError("the value is not an Array or String");
      return new PromiseCore((resolve, reject) => {
        let newArr = [];
        for (let i of iterable) {
          if (i instanceof PromiseCore) {
            newArr.push(i);
          } else {
            newArr.push(i);
          }
        }
        const count = newArr.length;
        if (count === 0) {
          return resolve([]);
        }
        let isEnd = false;
        let resolvedCount = 0;
        let valueList = [];
        newArr.forEach((item) => {
          if (item instanceof PromiseCore) {
            item.then(
              (value) => {
                if (!isEnd) {
                  valueList.push(value);
                  ++resolvedCount === count && resolve(valueList);
                }
              },
              (reason) => {
                if (!isEnd) {
                  isEnd = true;
                  reject(reason);
                }
              }
            );
          } else {
            setTimeout(() => {
              if (!isEnd) {
                valueList.push(item);
                ++resolvedCount === count && resolve(valueList);
              }
            });
          }
        });
      });
    }

    static allSettled(iterable) {
      if (!isIterable(iterable))
        throw new TypeError("the value is not an array or string");
      return new PromiseCore((resolve, reject) => {
        let newArr = [];
        let hasPromiseCore = false;
        for (let i of iterable) {
          if (i instanceof PromiseCore) {
            if (!hasPromiseCore) {
              hasPromiseCore = true;
            }
            newArr.push(i);
          } else {
            newArr.push({
              status: "fulfilled",
              value: i,
            });
          }
        }
        if (!hasPromiseCore) {
          return resolve(newArr);
        }
        let count = newArr.length;
        let settledCount = 0;
        let resultList = [];
        newArr.forEach((item) => {
          if (item instanceof PromiseCore) {
            item.then(
              (value) => {
                resultList.push({
                  status: "fulfilled",
                  value,
                });
                ++settledCount === count && resolve(resultList);
              },
              (reason) => {
                resultList.push({
                  status: "rejected",
                  reason,
                });
                ++settledCount === count && resolve(resultList);
              }
            );
          } else {
            resultList.push(item);
            ++settledCount === count && resolve(resultList);
          }
        });
      });
    }

    static any(iterable) {
      if (!isIterable(iterable))
        throw new TypeError("the value is not an array or string");
      return new PromiseCore((resolve, reject) => {
        let isEnd = false;
        let promiseCoreList = [];
        for (let i of iterable) {
          if (i instanceof PromiseCore) {
            !isEnd && promiseCoreList.push(i);
          } else {
            if (!isEnd) {
              isEnd = true;
              resolve(i);
            }
          }
        }
        if (isEnd) {
          return;
        }
        let count = promiseCoreList.length;
        if (count === 0) {
          return reject("AggregateError: All promises were rejected");
        }
        let rejectedCount = 0;
        promiseCoreList.forEach((item) => {
          item.then(
            (value) => {
              if (!isEnd) {
                isEnd = true;
                resolve(value);
              }
            },
            () => {
              if (!isEnd && ++rejectedCount === count) {
                isEnd = true;
                reject("AggregateError: All promises were rejected");
                F;
              }
            }
          );
        });
      });
    }

    static race(iterable) {
      if (!isIterable(iterable))
        throw new TypeError("the value is not an iterable");
      return new PromiseCore((resolve, reject) => {
        let isEnd = false;
        for (let i of iterable) {
          if (i instanceof PromiseCore) {
            i.then(
              (value) => {
                if (!isEnd) {
                  isEnd = true;
                  resolve(value);
                }
              },
              (reason) => {
                if (!isEnd) {
                  isEnd = true;
                  reject(reason);
                }
              }
            );
          } else {
            if (!isEnd) {
              isEnd = true;
              resolve(i);
            }
          }
        }
      });
    }

    static resolve(value) {
      if (value instanceof PromiseCore) {
        return value;
      }
      return new PromiseCore((resolve, reject) => {
        resolve(value);
      });
    }

    static reject(error) {
      return new PromiseCore((resolve, reject) => {
        reject(error);
      });
    }
  };
})();

// const test = new PromiseCore((resolve, reject) => {
//   setTimeout(() => {
//     resolve("error");
//   }, 1000);
// })
//   .then(
//     (value1) => {
//       console.log("resolve1", value1);
//       return function () {};
//     },
//     (reason1) => {
//       console.log("reject1", reason1);
//       return new PromiseCore((resolve, reject) => {
//         setTimeout(() => {
//           reject("reject reject1");
//         }, 3000);
//       });
//     }
//   )
//   .then(
//     (value2) => {
//       console.log("resolve2", value2);
//       return null;
//     },
//     (reason2) => {
//       console.log("reject2", reason2);
//       return PromiseCore.reject("reject reject2");
//     }
//   )
//   .then(
//     (value3) => {
//       console.log("resolve3", value3);
//       return PromiseCore.reject("reject resolve3");
//     },
//     (reason3) => {
//       console.log("reject3", reason3);
//       return PromiseCore.reject("reject reject3");
//     }
//   )
//   .catch((e) => {
//     console.log("catch", e);
//   });

// any
// const pErr = new PromiseCore((resolve, reject) => {
//   reject("总是失败");
// });

// let a = PromiseCore.any([pErr]).then(console.log, console.log);
// setTimeout(() => {
//   console.log(a);
// });

// all
// const promise1 = PromiseCore.reject(3);
// const promise2 = 42;
// const promise3 = new PromiseCore((resolve, reject) => {
//   setTimeout(resolve, 100, "foo");
// });

// let a = PromiseCore.all([promise1]).then(console.log,console.log);
// // expected output: Array [3, 42, "foo"]
// setTimeout(()=>console.log(a))

// allSettled
// const promise1 = PromiseCore.resolve(3);
// const promise2 = new PromiseCore((resolve, reject) =>
//   setTimeout(reject, 100, "foo")
// );
// const promises = [1, promise1, promise2];

// const a = PromiseCore.allSettled(promises).then(
//   (results) => {
//     console.log(results);
//     results.forEach((result) => console.log(result))
//   },
//   console.log
// );
// setTimeout(() => {
//   console.log(a);
// }, 4000);

// race
// const promise1 = new PromiseCore((resolve, reject) => {
//   setTimeout(resolve, 200, 'one');
// });

// const promise2 = new PromiseCore((resolve, reject) => {
//   setTimeout(reject, 100, 'two');
// });

// const a = PromiseCore.race([promise1, promise2]).then((value) => {
//   console.log(value);
//   // Both resolve, but promise2 is faster
// }, console.log);

// setTimeout(() => {
//   console.log(a);
// }, 3000);

// let a = new PromiseCore((resolve, reject) => {
//   setTimeout(()=> {
//     reject(1);
//   }, 1000);
// }).finally(() => {
//   console.log(2);
// });

// setTimeout(() => {
//   console.log(a);
// }, 4000);
