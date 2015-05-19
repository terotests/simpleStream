var simpleStream_prototype = function() {
  'use strict';
  var _promise_prototype = function() {
    'use strict';
    var later_prototype = function() {;
      (function(_myTrait_) {
        var _initDone;
        var _callers;
        var _oneTimers;
        var _everies;
        var _framers;
        _myTrait_.add = function(fn, thisObj, args) {
          if (thisObj || args) {
            var tArgs;
            if (Object.prototype.toString.call(args) === '[object Array]') {
              tArgs = args;
            } else {
              tArgs = Array.prototype.slice.call(arguments, 2);
              if (!tArgs) tArgs = [];
            }
            _callers.push([thisObj, fn, tArgs]);
          } else {
            _callers.push(fn);
          }
        }
        _myTrait_.after = function(seconds, fn, name) {

          if (!name) {
            name = "time" + (new Date()).getTime() + Math.random(10000000);
          }

          _everies[name] = {
            step: Math.floor(seconds * 1000),
            fn: fn,
            nextTime: 0,
            remove: true
          };
        }
        _myTrait_.asap = function(fn) {
          this.add(fn);

        }
        _myTrait_.every = function(seconds, fn, name) {

          if (!name) {
            name = "time" + (new Date()).getTime() + Math.random(10000000);
          }

          _everies[name] = {
            step: Math.floor(seconds * 1000),
            fn: fn,
            nextTime: 0
          };
        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(interval, fn) {
          if (!_initDone) {

            this.polyfill();

            var frame, cancelFrame;
            if (typeof(window) != "undefined") {
              var frame = window['requestAnimationFrame'],
                cancelFrame = window['cancelRequestAnimationFrame'];
              ['', 'ms', 'moz', 'webkit', 'o'].forEach(function(x) {
                if (!frame) {
                  frame = window[x + 'RequestAnimationFrame'];
                  cancelFrame = window[x + 'CancelAnimationFrame'] || window[x + 'CancelRequestAnimationFrame'];
                }
              });
            }

            if (!frame)
              frame = function(cb) {
                return setTimeout(cb, 16);
              };

            if (!cancelFrame)
              cancelFrame = function(id) {
                clearTimeout(id);
              };

            _callers = [];
            _oneTimers = {};
            _everies = {};
            _framers = [];
            var lastMs = 0;

            var _callQueQue = function() {
              var ms = (new Date()).getTime();
              var fn;
              while (fn = _callers.shift()) {
                if (Object.prototype.toString.call(fn) === '[object Array]') {
                  fn[1].apply(fn[0], fn[2]);
                } else {
                  fn();
                }

              }

              for (var i = 0; i < _framers.length; i++) {
                var fFn = _framers[i];
                fFn();
              }

              for (var n in _oneTimers) {
                if (_oneTimers.hasOwnProperty(n)) {
                  var v = _oneTimers[n];
                  v[0](v[1]);
                  delete _oneTimers[n];
                }
              }

              for (var n in _everies) {
                if (_everies.hasOwnProperty(n)) {
                  var v = _everies[n];
                  if (v.nextTime < ms) {
                    if (v.remove) {
                      if (v.nextTime > 0) {
                        v.fn();
                        delete _everies[n];
                      } else {
                        v.nextTime = ms + v.step;
                      }
                    } else {
                      v.fn();
                      v.nextTime = ms + v.step;
                    }
                  }
                  if (v.until) {
                    if (v.until < ms) {
                      delete _everies[n];
                    }
                  }
                }
              }

              frame(_callQueQue);
              lastMs = ms;
            };
            _callQueQue();
            _initDone = true;
          }
        });
        _myTrait_.once = function(key, fn, value) {
          // _oneTimers

          _oneTimers[key] = [fn, value];
        }
        _myTrait_.onFrame = function(fn) {

          _framers.push(fn);
        }
        _myTrait_.polyfill = function(t) {
          // --- let's not ---
        }
        _myTrait_.removeFrameFn = function(fn) {

          var i = _framers.indexOf(fn);
          if (i >= 0) {
            if (fn._onRemove) {
              fn._onRemove();
            }
            _framers.splice(i, 1);
            return true;
          } else {
            return false;
          }
        }
      }(this));
    }
    var later = function(a, b, c, d, e, f, g, h) {
      if (this instanceof later) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != later._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (this.__traitInit) {
          var m = this;
          this.__traitInit.forEach(function(initF) {
            initF.apply(m, args);
          })
        } else {
          if (typeof this.init == 'function')
            this.init.apply(this, args);
        }
      } else return new later(a, b, c, d, e, f, g, h);
    };
    later._classInfo = {
      name: 'later'
    };
    if (typeof(ocNamespaces) != "undefined") ocNamespaces("").registerComponent("later", later)
    later.prototype = new later_prototype();
    if (typeof(window) != 'undefined') window['later'] = later;
    if (typeof(window) != 'undefined') window['later_prototype'] = later_prototype;;
    (function(_myTrait_) {
      _myTrait_.isArray = function(someVar) {
        return Object.prototype.toString.call(someVar) === '[object Array]';
      }
      _myTrait_.isFunction = function(fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      }
      _myTrait_.isObject = function(obj) {
        return obj === Object(obj);
      }
    }(this));;
    (function(_myTrait_) {
      _myTrait_.all = function(firstArg) {

        var args;
        if (this.isArray(firstArg)) {
          args = firstArg;
        } else {
          args = Array.prototype.slice.call(arguments, 0);
        }
        // console.log(args);
        var targetLen = args.length,
          rCnt = 0,
          myPromises = [],
          myResults = new Array(targetLen);

        return this.then(
          function() {

            var allPromise = _promise();
            if (args.length == 0) {
              allPromise.resolve([]);
            }
            args.forEach(function(b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function(v) {
                  myResults[index] = v;
                  // console.log("Got a promise...",b, " cnt = ", rCnt);
                  rCnt++;
                  if (rCnt == targetLen) {
                    allPromise.resolve(myResults);
                  }
                }, function(v) {
                  allPromise.reject(v);
                });

              } else {
                allPromise.reject("Not list of promises");
              }
            })

            return allPromise;

          });





      }
      _myTrait_.collect = function(collectFn, promiseList, results) {

        var args;
        if (this.isArray(promiseList)) {
          args = promiseList;
        } else {
          args = [promiseList];
        }

        // console.log(args);
        var targetLen = args.length,
          isReady = false,
          noMore = false,
          rCnt = 0,
          myPromises = [],
          myResults = results || {};

        return this.then(
          function() {

            var allPromise = _promise();
            args.forEach(function(b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function(v) {
                  rCnt++;
                  isReady = collectFn(v, myResults);
                  if ((isReady && !noMore) || (noMore == false && targetLen == rCnt)) {
                    allPromise.resolve(myResults);
                    noMore = true;
                  }
                }, function(v) {
                  allPromise.reject(v);
                });

              } else {
                allPromise.reject("Not list of promises");
              }
            })

            return allPromise;

          });

      }
      _myTrait_.fail = function(fn) {
        return this.then(null, fn);
      }
      _myTrait_.fulfill = function(withValue) {
        // if(this._fulfilled || this._rejected) return;

        if (this._rejected) return;
        if (this._fulfilled && withValue != this._stateValue) {
          return;
        }

        var me = this;
        this._fulfilled = true;
        this._stateValue = withValue;

        var chCnt = this._childPromises.length;

        while (chCnt--) {
          var p = this._childPromises.shift();
          if (p._onFulfill) {
            try {
              var x = p._onFulfill(withValue);
              // console.log("Returned ",x);
              if (typeof(x) != "undefined") {
                p.resolve(x);
              } else {
                p.fulfill(withValue);
              }
            } catch (e) {
              // console.error(e);
              /*
                           If either onFulfilled or onRejected throws an exception e, promise2 
                           must be rejected with e as the reason.            
                       */
              p.reject(e);
            }
          } else {
            /*
                       If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
                       fulfilled with the same value as promise1        
                   */
            p.fulfill(withValue);
          }
        };
        // this._childPromises.length = 0;
        this._state = 1;
        this.triggerStateChange();

      }
      _myTrait_.genPlugin = function(fname, fn) {
        var me = this;
        this.plugin(fname,
          function() {
            var args = Array.prototype.slice.call(arguments, 0);
            console.log("Plugin args", args);
            var myPromise = _promise();
            this.then(function(v) {
              var args2 = Array.prototype.slice.call(arguments, 0);
              var z = args.concat(args2);
              var res = fn.apply(this, z);
              myPromise.resolve(res);
            }, function(r) {
              myPromise.reject(r);
            });
            return myPromise;

          }
        );
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(onFulfilled, onRejected) {
        // 0 = pending
        // 1 = fullfilled
        // 2 = error

        this._state = 0;
        this._stateValue = null;
        this._isAPromise = true;
        this._childPromises = [];

        if (this.isFunction(onFulfilled))
          this._onFulfill = onFulfilled;
        if (this.isFunction(onRejected))
          this._onReject = onRejected;

        if (!onRejected && this.isFunction(onFulfilled)) {



          var me = this;
          later().asap(
            function() {
              console.log("--- calling the onFulfilled ");
              onFulfilled(function(v) {
                me.resolve(v)
              }, function(v) {
                me.resolve(v);
              });
            });

        }
      });
      _myTrait_.isFulfilled = function(t) {
        return this._state == 1;
      }
      _myTrait_.isPending = function(t) {
        return this._state == 0;
      }
      _myTrait_.isRejected = function(v) {
        return this._state == 2;
      }
      _myTrait_.nodeStyle = function(fname, fn) {
        var me = this;
        this.plugin(fname,
          function() {
            var args = Array.prototype.slice.call(arguments, 0);
            var last, userCb, cbIndex = 0;
            if (args.length >= 0) {
              last = args[args.length - 1];
              if (Object.prototype.toString.call(last) == '[object Function]') {
                userCb = last;
                cbIndex = args.length - 1;
              }
            }

            var mainPromise = wishes().pending();
            this.then(function() {
              var nodePromise = wishes().pending();
              var args2 = Array.prototype.slice.call(arguments, 0);
              console.log("Orig args", args);
              console.log("Then args", args2);
              var z;
              if (args.length == 0)
                z = args2;
              if (args2.length == 0)
                z = args;
              if (!z) z = args2.concat(args);
              cbIndex = z.length; // 0,fn... 2
              if (userCb) cbIndex--;
              z[cbIndex] = function(err) {
                if (err) {
                  console.log("Got error ", err);
                  nodePromise.reject(err);
                  mainPromise.reject(err);
                  return;
                }
                if (userCb) {
                  var args = Array.prototype.slice.call(arguments);
                  var res = userCb.apply(this, args);
                  mainPromise.resolve(res);
                } else {
                  var args = Array.prototype.slice.call(arguments, 1);
                  mainPromise.resolve.apply(mainPromise, args);
                }
              }
              nodePromise.then(function(v) {
                mainPromise.resolve(v);
              });

              console.log("nodeStyle after concat", z);
              var res = fn.apply(this, z);
              // myPromise.resolve(res);
              // return nodePromise;
              return nodePromise;
            }, function(v) {
              mainPromise.reject(v);
            });
            return mainPromise;
            /*
                      log("..... now waiting "+ms);
                      var p = waitFor(ms);
                      p.then( function(v) {
                          myPromise.resolve(v);
                      });
                  */
          }
        );
      }
      _myTrait_.onStateChange = function(fn) {

        if (!this._listeners)
          this._listeners = [];

        this._listeners.push(fn);
      }
      _myTrait_.plugin = function(n, fn) {

        _myTrait_[n] = fn;

        return this;
      }
      _myTrait_.props = function(obj) {
        var args = [];

        for (var n in obj) {
          if (obj.hasOwnProperty(n)) {
            args.push({
              name: n,
              promise: obj[n]
            });
          }
        }


        // console.log(args);
        var targetLen = args.length,
          rCnt = 0,
          myPromises = [],
          myResults = {};

        return this.then(
          function() {

            var allPromise = wishes().pending();
            args.forEach(function(def) {
              var b = def.promise,
                name = def.name;
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function(v) {
                  myResults[name] = v;
                  rCnt++;
                  if (rCnt == targetLen) {
                    allPromise.resolve(myResults);
                  }
                }, function(v) {
                  allPromise.reject(v);
                });

              } else {
                allPromise.reject("Not list of promises");
              }
            })

            return allPromise;

          });

      }
      _myTrait_.reject = function(withReason) {

        // if(this._rejected || this._fulfilled) return;

        // conso

        if (this._fulfilled) return;
        if (this._rejected && withReason != this._rejectReason) return;


        this._state = 2;
        this._rejected = true;
        this._rejectReason = withReason;
        var me = this;

        var chCnt = this._childPromises.length;
        while (chCnt--) {
          var p = this._childPromises.shift();

          if (p._onReject) {
            try {
              p._onReject(withReason);
              p.reject(withReason);
            } catch (e) {
              /*
                           If either onFulfilled or onRejected throws an exception e, promise2 
                           must be rejected with e as the reason.            
                       */
              p.reject(e);
            }
          } else {
            /*
                       If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
                       fulfilled with the same value as promise1        
                   */
            p.reject(withReason);
          }
        };

        // this._childPromises.length = 0;
        this.triggerStateChange();

      }
      _myTrait_.rejectReason = function(reason) {
        if (reason) {
          this._rejectReason = reason;
          return;
        }
        return this._rejectReason;
      }
      _myTrait_.resolve = function(x) {

        // console.log("Resolving ", x);

        // can not do this many times...
        if (this._state > 0) return;

        if (x == this) {
          // error
          this._rejectReason = "TypeError";
          this.reject(this._rejectReason);
          return;
        }

        if (this.isObject(x) && x._isAPromise) {

          // 
          this._state = x._state;
          this._stateValue = x._stateValue;
          this._rejectReason = x._rejectReason;
          // ... 
          if (this._state === 0) {
            var me = this;
            x.onStateChange(function() {
              if (x._state == 1) {
                // console.log("State change");
                me.resolve(x.value());
              }
              if (x._state == 2) {
                me.reject(x.rejectReason());
              }
            });
          }
          if (this._state == 1) {
            // console.log("Resolved to be Promise was fulfilled ", x._stateValue);
            this.fulfill(this._stateValue);
          }
          if (this._state == 2) {
            // console.log("Relved to be Promise was rejected ", x._rejectReason);
            this.reject(this._rejectReason);
          }
          return;
        }
        if (this.isObject(x) && x.then && this.isFunction(x.then)) {
          // console.log("Thenable ", x);
          var didCall = false;
          try {
            // Call the x.then
            var me = this;
            x.then.call(x,
              function(y) {
                if (didCall) return;
                // we have now value for the promise...
                // console.log("Got value from Thenable ", y);
                me.resolve(y);
                didCall = true;
              },
              function(r) {
                if (didCall) return;
                // console.log("Got reject from Thenable ", r);
                me.reject(r);
                didCall = true;
              });
          } catch (e) {
            if (!didCall) this.reject(e);
          }
          return;
        }
        this._state = 1;
        this._stateValue = x;

        // fulfill the promise...
        this.fulfill(x);

      }
      _myTrait_.state = function(newState) {
        if (typeof(newState) != "undefined") {
          this._state = newState;
        }
        return this._state;
      }
      _myTrait_.then = function(onFulfilled, onRejected) {

        if (!onRejected) onRejected = function() {};

        var p = new _promise(onFulfilled, onRejected);
        var me = this;

        if (this._state == 1) {
          later().asap(function() {
            me.fulfill(me.value());
          });
        }
        if (this._state == 2) {
          ater().asap(function() {
            me.reject(me.rejectReason());
          });
        }
        this._childPromises.push(p);
        return p;



      }
      _myTrait_.triggerStateChange = function(t) {
        var me = this;
        if (!this._listeners) return;
        this._listeners.forEach(function(fn) {
          fn(me);
        });
        // one-timer
        this._listeners.length = 0;
      }
      _myTrait_.value = function(v) {
        if (typeof(v) != "undefined") {
          this._stateValue = v;
          return this;
        }
        return this._stateValue;
      }
    }(this));
  }
  var _promise = function(a, b, c, d, e, f, g, h) {
    if (this instanceof _promise) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != _promise._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new _promise(a, b, c, d, e, f, g, h);
  };
  _promise._classInfo = {
    name: '_promise'
  };
  if (typeof(ocNamespaces) != "undefined") ocNamespaces("").registerComponent("_promise", _promise)
  _promise.prototype = new _promise_prototype();
  if (typeof(window) != 'undefined') window['_promise'] = _promise;
  if (typeof(window) != 'undefined') window['_promise_prototype'] = _promise_prototype;
  var later_prototype = function() {;
    (function(_myTrait_) {
      var _initDone;
      var _callers;
      var _oneTimers;
      var _everies;
      var _framers;
      _myTrait_.add = function(fn, thisObj, args) {
        if (thisObj || args) {
          var tArgs;
          if (Object.prototype.toString.call(args) === '[object Array]') {
            tArgs = args;
          } else {
            tArgs = Array.prototype.slice.call(arguments, 2);
            if (!tArgs) tArgs = [];
          }
          _callers.push([thisObj, fn, tArgs]);
        } else {
          _callers.push(fn);
        }
      }
      _myTrait_.after = function(seconds, fn, name) {

        if (!name) {
          name = "time" + (new Date()).getTime() + Math.random(10000000);
        }

        _everies[name] = {
          step: Math.floor(seconds * 1000),
          fn: fn,
          nextTime: 0,
          remove: true
        };
      }
      _myTrait_.asap = function(fn) {
        this.add(fn);

      }
      _myTrait_.every = function(seconds, fn, name) {

        if (!name) {
          name = "time" + (new Date()).getTime() + Math.random(10000000);
        }

        _everies[name] = {
          step: Math.floor(seconds * 1000),
          fn: fn,
          nextTime: 0
        };
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(interval, fn) {
        if (!_initDone) {

          this.polyfill();

          var frame, cancelFrame;
          if (typeof(window) != "undefined") {
            var frame = window['requestAnimationFrame'],
              cancelFrame = window['cancelRequestAnimationFrame'];
            ['', 'ms', 'moz', 'webkit', 'o'].forEach(function(x) {
              if (!frame) {
                frame = window[x + 'RequestAnimationFrame'];
                cancelFrame = window[x + 'CancelAnimationFrame'] || window[x + 'CancelRequestAnimationFrame'];
              }
            });
          }

          if (!frame)
            frame = function(cb) {
              return setTimeout(cb, 16);
            };

          if (!cancelFrame)
            cancelFrame = function(id) {
              clearTimeout(id);
            };

          _callers = [];
          _oneTimers = {};
          _everies = {};
          _framers = [];
          var lastMs = 0;

          var _callQueQue = function() {
            var ms = (new Date()).getTime();
            var fn;
            while (fn = _callers.shift()) {
              if (Object.prototype.toString.call(fn) === '[object Array]') {
                fn[1].apply(fn[0], fn[2]);
              } else {
                fn();
              }

            }

            for (var i = 0; i < _framers.length; i++) {
              var fFn = _framers[i];
              fFn();
            }

            for (var n in _oneTimers) {
              if (_oneTimers.hasOwnProperty(n)) {
                var v = _oneTimers[n];
                v[0](v[1]);
                delete _oneTimers[n];
              }
            }

            for (var n in _everies) {
              if (_everies.hasOwnProperty(n)) {
                var v = _everies[n];
                if (v.nextTime < ms) {
                  if (v.remove) {
                    if (v.nextTime > 0) {
                      v.fn();
                      delete _everies[n];
                    } else {
                      v.nextTime = ms + v.step;
                    }
                  } else {
                    v.fn();
                    v.nextTime = ms + v.step;
                  }
                }
                if (v.until) {
                  if (v.until < ms) {
                    delete _everies[n];
                  }
                }
              }
            }

            frame(_callQueQue);
            lastMs = ms;
          };
          _callQueQue();
          _initDone = true;
        }
      });
      _myTrait_.once = function(key, fn, value) {
        // _oneTimers

        _oneTimers[key] = [fn, value];
      }
      _myTrait_.onFrame = function(fn) {

        _framers.push(fn);
      }
      _myTrait_.polyfill = function(t) {
        // --- let's not ---
      }
      _myTrait_.removeFrameFn = function(fn) {

        var i = _framers.indexOf(fn);
        if (i >= 0) {
          if (fn._onRemove) {
            fn._onRemove();
          }
          _framers.splice(i, 1);
          return true;
        } else {
          return false;
        }
      }
    }(this));
  }
  var later = function(a, b, c, d, e, f, g, h) {
    if (this instanceof later) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != later._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new later(a, b, c, d, e, f, g, h);
  };
  later._classInfo = {
    name: 'later'
  };
  if (typeof(ocNamespaces) != "undefined") ocNamespaces("").registerComponent("later", later)
  later.prototype = new later_prototype();
  if (typeof(window) != 'undefined') window['later'] = later;
  if (typeof(window) != 'undefined') window['later_prototype'] = later_prototype;
  var sequenceStepper_prototype = function() {;
    (function(_myTrait_) {
      var _eventOn;
      var _commands;
      _myTrait_.guid = function(t) {

        return Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);

        //return Math.random();
        // return Math.random().toString(36);

        /*    
           return Math.random().toString(36).substring(2, 15) +
                   Math.random().toString(36).substring(2, 15);
           */
        /*        
           function s4() {
               return Math.floor((1 + Math.random()) * 0x10000)
                          .toString(16)
                          .substring(1);
             }
           
           return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                  s4() + '-' + s4() + s4() + s4();*/
      }
      _myTrait_.isArray = function(t) {

        if (typeof(t) == "undefined") return this.__isA;

        return Object.prototype.toString.call(t) === '[object Array]';
      }
      _myTrait_.isFunction = function(fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      }
      _myTrait_.isObject = function(t) {

        if (typeof(t) == "undefined") return this.__isO;

        return t === Object(t);
      }
    }(this));;
    (function(_myTrait_) {
      var _instances;
      if (!_myTrait_.hasOwnProperty('__factoryClass')) _myTrait_.__factoryClass = []
      _myTrait_.__factoryClass.push(function(id, manual) {

        if (id === false && manual) return;

        if (!_instances) {
          _instances = {};
        }

        if (_instances[id]) {
          return _instances[id];
        } else {
          _instances[id] = this;
        }
      });
      _myTrait_.addCommands = function(cmdFunction, failure) {

        if (this.isArray(cmdFunction)) {
          var me = this;
          cmdFunction.forEach(function(c) {
            me.addCommands(c);
          });
          return this;
        }

        this._commands.push({
          fnCmd: cmdFunction,
          fnFail: failure,
          async: true
        });
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(myId, manual) {

        if (!this._commands) {
          this._commands = [];
          this.waitingList = [];
          this._index = 0;
        }

        var me = this;
        if (!manual) {
          later().every(1 / 30, function() {
            me.step();
          });
        }

      });
      _myTrait_.step = function(t) {
        var i = this._index,
          len = this._commands.length;

        if (i == len) return;

        var first = _promise(),
          currentProm = first,
          myPromise = _promise(),
          me = this;

        while (i < len) {
          var fn = this._commands[i];
          (function(fn) {
            currentProm = currentProm.then(function() {

              var p = _promise();

              // if(fn.async) {

              fn.fnCmd(function(res) {
                p.resolve(true);
              }, function(failReason) {
                p.resolve(true);
                if (fn.fnFail) fn.fnFail(failReason);
              });

              return p;
            }).fail(function(reason) {
              if (fn.fnFail) fn.fnFail(reason);
            });
          }(fn));
          this._index++;
          i++;
        }

        currentProm.then(function() {
          me.waitingList.shift(); // remvoe this promise from the queque
          myPromise.resolve(true);
          if (me.waitingList.length) {
            var newP = me.waitingList[0];
            newP.resolve(true);
          }
        }).fail(function(m) {

        });


        this.waitingList.push(first);
        if (this.waitingList.length == 1) {
          first.resolve(true);
        }
        return myPromise;

      }
    }(this));
  }
  var sequenceStepper = function(a, b, c, d, e, f, g, h) {
    if (this instanceof sequenceStepper) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != sequenceStepper._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new sequenceStepper(a, b, c, d, e, f, g, h);
  };
  sequenceStepper._classInfo = {
    name: 'sequenceStepper'
  };
  if (typeof(ocNamespaces) != "undefined") ocNamespaces("").registerComponent("sequenceStepper", sequenceStepper)
  sequenceStepper.prototype = new sequenceStepper_prototype();
  if (typeof(window) != 'undefined') window['sequenceStepper'] = sequenceStepper;
  if (typeof(window) != 'undefined') window['sequenceStepper_prototype'] = sequenceStepper_prototype;
  var streamProcessor_prototype = function() {
    'use strict';;
    (function(_myTrait_) {
      _myTrait_.guid = function(t) {

        return Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);

      }
      _myTrait_.isArray = function(t) {

        if (typeof(t) == "undefined") return this.__isA;

        return Object.prototype.toString.call(t) === '[object Array]';
      }
      _myTrait_.isFunction = function(fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      }
      _myTrait_.isObject = function(t) {

        if (typeof(t) == "undefined") return this.__isO;

        return t === Object(t);
      }
    }(this));;
    (function(_myTrait_) {
      _myTrait_.cont = function(withValue) {

        if (this.isArray(withValue)) {

          var me = this;
          var newList = this._list.slice(this._index + 1);

          if (newList.length == 0) {
            this.step();
            return;
          }

          var all = [];
          withValue.forEach(
            function(v) {
              var newList = me._list.slice(me._index + 1);
              var stream = simpleStream(me);
              stream.addObserver(newList);
              all.push(stream.pushValue(v));
            });

          var wait = _promise();
          wait.all(all).then(function() {
            var r = [];
            all.forEach(function(p) {
              r.push(p.value());
            });
            me.resolve(r);
          });
          wait.resolve(true);


        } else {

          if (typeof(withValue) != "undefined") {
            this._context.value = withValue;
          }

          this.step();

        }

      }
      _myTrait_.ctxVar = function(name, value) {

        if (typeof(value) == "undefined") {
          var v = this._contextVars[name];
          if (typeof(v) == "undefined") {
            if (this._parent) {
              return this._parent.ctxVar(name);
            }
          }
          return v;
        }

        this._contextVars[name] = value;


      }
      _myTrait_.get = function(name) {

        if (this._closure) {
          var v = this._contextVars[name];
          if (typeof(v) == "undefined") {
            return this._parent.get(name);
          }
          return v;
        }

        var v = this._contextVars[name];
        if (typeof(v) == "undefined") {
          if (this._parent) {
            return this._parent.get(name);
          }
        }
        return v;
      }
      _myTrait_.getRest = function(t) {

      }
      _myTrait_.getState = function(t) {


        return this._stopState;
      }
      _myTrait_.getValue = function(t) {

        // simple value processor

        if (!this._context && this._parent) {
          return this._parent.getValue();
        }

        if (this._context && !this._context.value && !this._context.initWith && this._parent) {
          return this._parent.getValue();
        }

        return this._context.value || this._context.initWith;
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(parentProcessor, isClosure) {

        // The context of the processor
        this._context = {};
        this._contextVars = {};

        this._stopState = 0;

        if (parentProcessor) {
          this._parent = parentProcessor;
        }

        if (isClosure) this._closure = true;



      });
      _myTrait_.run = function(withValue) {

        if (this._closure) {
          if (this._parent) {
            this._parent.run(withValue);
            return;
          } else {
            console.error("No parent for closure");
            console.trace();
          }
        }
        this._stopState = 1;
        this.cont(withValue);
        return;

      }
      _myTrait_.set = function(name, value) {
        if (typeof(value) != "undefined") {

          if (this._closure) {
            if (typeof(this._contextVars[name]) != "undefined") {
              this._contextVars[name] = value;
            } else {
              if (this._parent) {
                this._parent.set(name, value);
                return this;
              }
            }
          }

          if (typeof(this._contextVars[name]) == "undefined") {
            if (this._parent) {
              this._parent.set(name, value);
              return this;
            }
          }

          this._contextVars[name] = value;
          return this;
        }

      }
      _myTrait_.setContext = function(ctx) {
        this._context = ctx;
      }
      _myTrait_.setParent = function(newParent) {
        this._parent = newParent;
      }
      _myTrait_.start = function(list) {

        this._list = list;
        this._index = -1;

        this.step();

      }
      _myTrait_.step = function(t) {

        this._index++;
        var i = this._index,
          me = this;

        if (this._list[i]) {

          var obs = this._list[i];
          // Call the observer

          if (this.isObject(obs) && !this.isFunction(obs)) {

            if (obs.closure) {
              obs.closure.setParent(this);
              obs.fn(obs.closure);
            } else {
              // var ctx = streamProcessor()
              obs.fn(this);
            }
          } else {
            obs(this);
          }

        } else {
          if (!this._context.value) {
            this._context.value = this._context.initWith;
          }
          if (this._stopState < 2) {
            this._stopState = 7;
          }
          this.resolve(this._context.value);
        }


      }
      _myTrait_.stopStream = function(t) {
        if (!this._context.value) {
          this._context.value = this._context.initWith;
        }
        this._stopState = 3;
        this.resolve(this._context.value);
      }
    }(this));
  }
  streamProcessor_prototype.prototype = _promise.prototype
  var streamProcessor = function(a, b, c, d, e, f, g, h) {
    if (this instanceof streamProcessor) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != streamProcessor._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new streamProcessor(a, b, c, d, e, f, g, h);
  };
  streamProcessor._classInfo = {
    name: 'streamProcessor'
  };
  if (typeof(ocNamespaces) != "undefined") ocNamespaces("").registerComponent("streamProcessor", streamProcessor)
  streamProcessor.prototype = new streamProcessor_prototype();
  if (typeof(window) != 'undefined') window['streamProcessor'] = streamProcessor;
  if (typeof(window) != 'undefined') window['streamProcessor_prototype'] = streamProcessor_prototype;;
  (function(_myTrait_) {
    _myTrait_.guid = function(t) {

      return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

    }
    _myTrait_.isArray = function(t) {

      if (typeof(t) == "undefined") return this.__isA;

      return Object.prototype.toString.call(t) === '[object Array]';
    }
    _myTrait_.isFunction = function(fn) {
      return Object.prototype.toString.call(fn) == '[object Function]';
    }
    _myTrait_.isObject = function(t) {

      if (typeof(t) == "undefined") return this.__isO;

      return t === Object(t);
    }
  }(this));;
  (function(_myTrait_) {
    var _streams;
    _myTrait_.addObserver = function(obs, closure) {

      if (this.isArray(obs)) {
        var m = this;
        obs.forEach(function(o) {
          m.addObserver(o, closure);
        })
        return;
      }

      if (this.isObject(obs) && !this.isFunction(obs)) {
        this._observers.push(obs);
        return;
      }

      // marching through the stream...
      // this._observers.push(obs);

      this._observers.push({
        fn: obs,
        closure: closure
      });
    }
    _myTrait_.branch = function(fn, ms) {

      var me = this;
      var lastMs = (new Date()).getTime();

      me._lastBranch = lastMs;

      this.addObserver(function(m) {
        var nowTime = (new Date()).getTime(),
          value = m.getValue();
        setTimeout(function() {

          var currTime = (new Date()).getTime();
          if (currTime - lastMs < ms) return;

          var cnt = 0;
          if (cnt = me.isActiveRunning()) {
            return;
          }

          m = me.getLastProcess();
          if (m.getState() == 3) {
            me._lastBranch = currTime;
            lastMs = currTime;
            fn(value);
          }
        }, ms);
        m.run();
      });

    }
    _myTrait_.branchIfOk = function(fn, ms) {

      var me = this;
      var lastMs = (new Date()).getTime();

      me._lastBranch = lastMs;

      this.addObserver(function(m) {
        var nowTime = (new Date()).getTime(),
          value = m.getValue();
        setTimeout(function() {
          var currTime = (new Date()).getTime();
          if (currTime - lastMs < ms) return;
          var cnt = 0;
          if (cnt = me.isActiveRunning()) {
            return;
          }
          m = me.getLastProcess();
          if (m.getState() == 7) {
            me._lastBranch = currTime;
            lastMs = currTime;
            fn(value);
          }
        }, ms);
        m.run();
      });

    }
    _myTrait_.collectValuesFor = function(ms) {
      var me = this;
      var lastMs = (new Date()).getTime();

      me._lastBranch = lastMs;

      this.addObserver(function(m) {
        var nowTime = (new Date()).getTime(),
          value = m.getValue();

        setTimeout(function() {
          var currTime = (new Date()).getTime();

          if (currTime - lastMs < ms) return;

          var cnt = me.isActiveRunning();
          var lastProcess = me.getLastProcess();
          // stop if there is something in there...
          if (cnt > 1 && m != lastProcess) {
            m.stopStream(m.getValue()); // don't allow to go any further...
            return;
          }
          lastProcess.run(); // continue the process...
        }, ms);
        // m.run();
      });
    }
    _myTrait_.combineLatest = function(streams, fn) {
      var me = this;

      var myRes = [],
        cnt = streams.length;

      var allHasValue = function() {
        var b = true;
        for (var i = 0; i < cnt; i++) {
          if (typeof(myRes[i]) == "undefined") b = false;
        }
        return b;
      }

      streams.forEach(function(s, index) {
        s.addObserver(function(myProcess) {
          myRes[index] = myProcess.getValue();
          if (allHasValue()) {
            me.pushValue(myRes);
          }
          myProcess.run();
        });
      });

      return this;

    }
    _myTrait_.filter = function(fn) {

      var me = this;

      this.addObserver(function(m) {
        var arr = m.getValue();
        var res = [];

        if (me.isArray(arr)) {
          arr.forEach(function(v) {
            if (fn(v)) res.push(v);
          });
        } else {
          if (fn(arr)) {
            m.run(arr);
            return;
          } else {
            m.stopStream();
          }
          return;
        }

        if (res.length) {
          m.run(res);
        } else {
          m.stopStream();
        }
      });
    }
    _myTrait_.forContext = function(fn) {
      var me = this;
      me.addObserver(function(m) {
        var arr = m.getValue();
        var res = [];

        if (me.isArray(arr)) {
          arr.forEach(function(v, i) {
            res.push(fn(v, i, m));
          });
        } else {
          res.push(fn(arr, 0, m));
        }
        m.run(arr);
      });
    }
    _myTrait_.forEach = function(fn) {
      var me = this;
      me.addObserver(function(m) {
        var arr = m.getValue();
        var res = [];

        if (me.isArray(arr)) {
          arr.forEach(function(v) {
            res.push(fn(v));
          });
        } else {
          res.push(fn(arr));
        }
        m.run(arr);
      });
    }
    _myTrait_.getLastProcess = function(t) {

      var i = this._active.length;
      if (i > 0) return this._active[i - 1];

      return this._lastProcess;
    }
    if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
      _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
    if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
    _myTrait_.__traitInit.push(function(parentProcessor) {
      this._childIndex = 0;
      this._childStreams = [];
      this._values = [];
      this._active = [];

      this._lastProcess;

      // start these observers when a value arrives...
      this._observers = [];

      this._id = this.guid();
      if (!_streams) {
        _streams = {};
      }

      _streams[this._id] = this;

      if (parentProcessor) {
        this._parentProcessor = parentProcessor;
      }

    });
    _myTrait_.isActiveRunning = function(t) {
      return this._active.length;
    }
    _myTrait_.map = function(fn) {
      var me = this;
      me.addObserver(function(m) {
        var arr = m.getValue();
        var res = [];

        if (me.isArray(arr)) {
          arr.forEach(function(v) {
            res.push(fn(v));
          });
        } else {
          res.push(fn(arr));
        }
        m.run(res);
      });
    }
    _myTrait_.pushValue = function(val) {


      var myProm = _promise();
      this.startProcess({
        initWith: val
      }, myProm);
      return myProm;
    }
    _myTrait_.reduce = function(fn, initWith) {
      var me = this;
      me.addObserver(function(m) {
        var arr = m.getValue();
        var res = [];

        if (me.isArray(arr)) {
          res = arr.reduce(fn, initWith);
        } else {
          res = [arr].reduce(fn, initWith);
        }
        m.run(res);
      });
    }
    _myTrait_.startProcess = function(context, myProm) {


      // create copy of the observers...
      var list = this._observers.slice();

      var process = streamProcessor(this._parentProcessor);
      process.setContext(context);
      process.start(list);

      this._active.push(process);

      var me = this;
      // The process exits, all done...
      process.then(function(v) {
        // Should remove the process    
        var i = me._active.indexOf(process);
        me._active.splice(i, 1);
        myProm.resolve(v);
        me._lastProcess = process;
      });



    }
    _myTrait_.step = function(t) {

    }
  }(this));
}
var simpleStream = function(a, b, c, d, e, f, g, h) {
  if (this instanceof simpleStream) {
    var args = [a, b, c, d, e, f, g, h];
    if (this.__factoryClass) {
      var m = this;
      var res;
      this.__factoryClass.forEach(function(initF) {
        res = initF.apply(m, args);
      });
      if (Object.prototype.toString.call(res) == '[object Function]') {
        if (res._classInfo.name != simpleStream._classInfo.name) return new res(a, b, c, d, e, f, g, h);
      } else {
        if (res) return res;
      }
    }
    if (this.__traitInit) {
      var m = this;
      this.__traitInit.forEach(function(initF) {
        initF.apply(m, args);
      })
    } else {
      if (typeof this.init == 'function')
        this.init.apply(this, args);
    }
  } else return new simpleStream(a, b, c, d, e, f, g, h);
};
simpleStream._classInfo = {
  name: 'simpleStream'
};
if (typeof(ocNamespaces) != "undefined") ocNamespaces("").registerComponent("simpleStream", simpleStream)
simpleStream.prototype = new simpleStream_prototype();
if (typeof(window) != 'undefined') window['simpleStream'] = simpleStream;
if (typeof(window) != 'undefined') window['simpleStream_prototype'] = simpleStream_prototype;