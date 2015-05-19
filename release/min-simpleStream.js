var simpleStream_prototype=function(){"use strict";var t=function(){var t=function(){!function(t){var e,i,n,r,s;t.add=function(t,e,n){if(e||n){var r;"[object Array]"===Object.prototype.toString.call(n)?r=n:(r=Array.prototype.slice.call(arguments,2),r||(r=[])),i.push([e,t,r])}else i.push(t)},t.after=function(t,e,i){i||(i="time"+(new Date).getTime()+Math.random(1e7)),r[i]={step:Math.floor(1e3*t),fn:e,nextTime:0,remove:!0}},t.asap=function(t){this.add(t)},t.every=function(t,e,i){i||(i="time"+(new Date).getTime()+Math.random(1e7)),r[i]={step:Math.floor(1e3*t),fn:e,nextTime:0}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){if(!e){this.polyfill();var t,o;if("undefined"!=typeof window){var t=window.requestAnimationFrame,o=window.cancelRequestAnimationFrame;["","ms","moz","webkit","o"].forEach(function(e){t||(t=window[e+"RequestAnimationFrame"],o=window[e+"CancelAnimationFrame"]||window[e+"CancelRequestAnimationFrame"])})}t||(t=function(t){return setTimeout(t,16)}),o||(o=function(t){clearTimeout(t)}),i=[],n={},r={},s=[];var a=0,c=function(){for(var e,o=(new Date).getTime();e=i.shift();)"[object Array]"===Object.prototype.toString.call(e)?e[1].apply(e[0],e[2]):e();for(var u=0;u<s.length;u++){var f=s[u];f()}for(var h in n)if(n.hasOwnProperty(h)){var l=n[h];l[0](l[1]),delete n[h]}for(var h in r)if(r.hasOwnProperty(h)){var l=r[h];l.nextTime<o&&(l.remove?l.nextTime>0?(l.fn(),delete r[h]):l.nextTime=o+l.step:(l.fn(),l.nextTime=o+l.step)),l.until&&l.until<o&&delete r[h]}t(c),a=o};c(),e=!0}}),t.once=function(t,e,i){n[t]=[e,i]},t.onFrame=function(t){s.push(t)},t.polyfill=function(){},t.removeFrameFn=function(t){var e=s.indexOf(t);return e>=0?(t._onRemove&&t._onRemove(),s.splice(e,1),!0):!1}}(this)},i=function(t,e,n,r,s,o,a,c){if(!(this instanceof i))return new i(t,e,n,r,s,o,a,c);var u=[t,e,n,r,s,o,a,c];if(this.__factoryClass){var f,h=this;if(this.__factoryClass.forEach(function(t){f=t.apply(h,u)}),"[object Function]"==Object.prototype.toString.call(f)){if(f._classInfo.name!=i._classInfo.name)return new f(t,e,n,r,s,o,a,c)}else if(f)return f}if(this.__traitInit){var h=this;this.__traitInit.forEach(function(t){t.apply(h,u)})}else"function"==typeof this.init&&this.init.apply(this,u)};i._classInfo={name:"later"},"undefined"!=typeof ocNamespaces&&ocNamespaces("").registerComponent("later",i),i.prototype=new t,"undefined"!=typeof window&&(window.later=i),"undefined"!=typeof window&&(window.later_prototype=t),function(t){t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this),function(t){t.all=function(t){var i;i=this.isArray(t)?t:Array.prototype.slice.call(arguments,0);var n=i.length,r=0,s=[],o=new Array(n);return this.then(function(){var t=e();return 0==i.length&&t.resolve([]),i.forEach(function(e,i){e.then?(s.push(e),e.then(function(e){o[i]=e,r++,r==n&&t.resolve(o)},function(e){t.reject(e)})):t.reject("Not list of promises")}),t})},t.collect=function(t,i,n){var r;r=this.isArray(i)?i:[i];var s=r.length,o=!1,a=!1,c=0,u=[],f=n||{};return this.then(function(){var i=e();return r.forEach(function(e){e.then?(u.push(e),e.then(function(e){c++,o=t(e,f),(o&&!a||0==a&&s==c)&&(i.resolve(f),a=!0)},function(t){i.reject(t)})):i.reject("Not list of promises")}),i})},t.fail=function(t){return this.then(null,t)},t.fulfill=function(t){if(!(this._rejected||this._fulfilled&&t!=this._stateValue)){this._fulfilled=!0,this._stateValue=t;for(var e=this._childPromises.length;e--;){var i=this._childPromises.shift();if(i._onFulfill)try{var n=i._onFulfill(t);"undefined"!=typeof n?i.resolve(n):i.fulfill(t)}catch(r){i.reject(r)}else i.fulfill(t)}this._state=1,this.triggerStateChange()}},t.genPlugin=function(t,i){this.plugin(t,function(){var t=Array.prototype.slice.call(arguments,0);console.log("Plugin args",t);var n=e();return this.then(function(){var e=Array.prototype.slice.call(arguments,0),r=t.concat(e),s=i.apply(this,r);n.resolve(s)},function(t){n.reject(t)}),n})},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,e){if(this._state=0,this._stateValue=null,this._isAPromise=!0,this._childPromises=[],this.isFunction(t)&&(this._onFulfill=t),this.isFunction(e)&&(this._onReject=e),!e&&this.isFunction(t)){var n=this;i().asap(function(){console.log("--- calling the onFulfilled "),t(function(t){n.resolve(t)},function(t){n.resolve(t)})})}}),t.isFulfilled=function(){return 1==this._state},t.isPending=function(){return 0==this._state},t.isRejected=function(){return 2==this._state},t.nodeStyle=function(t,e){this.plugin(t,function(){var t,i,n=Array.prototype.slice.call(arguments,0),r=0;n.length>=0&&(t=n[n.length-1],"[object Function]"==Object.prototype.toString.call(t)&&(i=t,r=n.length-1));var s=wishes().pending();return this.then(function(){var t=wishes().pending(),o=Array.prototype.slice.call(arguments,0);console.log("Orig args",n),console.log("Then args",o);var a;0==n.length&&(a=o),0==o.length&&(a=n),a||(a=o.concat(n)),r=a.length,i&&r--,a[r]=function(e){if(e)return console.log("Got error ",e),t.reject(e),void s.reject(e);if(i){var n=Array.prototype.slice.call(arguments),r=i.apply(this,n);s.resolve(r)}else{var n=Array.prototype.slice.call(arguments,1);s.resolve.apply(s,n)}},t.then(function(t){s.resolve(t)}),console.log("nodeStyle after concat",a);e.apply(this,a);return t},function(t){s.reject(t)}),s})},t.onStateChange=function(t){this._listeners||(this._listeners=[]),this._listeners.push(t)},t.plugin=function(e,i){return t[e]=i,this},t.props=function(t){var e=[];for(var i in t)t.hasOwnProperty(i)&&e.push({name:i,promise:t[i]});var n=e.length,r=0,s=[],o={};return this.then(function(){var t=wishes().pending();return e.forEach(function(e){var i=e.promise,a=e.name;i.then?(s.push(i),i.then(function(e){o[a]=e,r++,r==n&&t.resolve(o)},function(e){t.reject(e)})):t.reject("Not list of promises")}),t})},t.reject=function(t){if(!(this._fulfilled||this._rejected&&t!=this._rejectReason)){this._state=2,this._rejected=!0,this._rejectReason=t;for(var e=this._childPromises.length;e--;){var i=this._childPromises.shift();if(i._onReject)try{i._onReject(t),i.reject(t)}catch(n){i.reject(n)}else i.reject(t)}this.triggerStateChange()}},t.rejectReason=function(t){return t?void(this._rejectReason=t):this._rejectReason},t.resolve=function(t){if(!(this._state>0)){if(t==this)return this._rejectReason="TypeError",void this.reject(this._rejectReason);if(this.isObject(t)&&t._isAPromise){if(this._state=t._state,this._stateValue=t._stateValue,this._rejectReason=t._rejectReason,0===this._state){var e=this;t.onStateChange(function(){1==t._state&&e.resolve(t.value()),2==t._state&&e.reject(t.rejectReason())})}return 1==this._state&&this.fulfill(this._stateValue),void(2==this._state&&this.reject(this._rejectReason))}if(this.isObject(t)&&t.then&&this.isFunction(t.then)){var i=!1;try{var e=this;t.then.call(t,function(t){i||(e.resolve(t),i=!0)},function(t){i||(e.reject(t),i=!0)})}catch(n){i||this.reject(n)}}else this._state=1,this._stateValue=t,this.fulfill(t)}},t.state=function(t){return"undefined"!=typeof t&&(this._state=t),this._state},t.then=function(t,n){n||(n=function(){});var r=new e(t,n),s=this;return 1==this._state&&i().asap(function(){s.fulfill(s.value())}),2==this._state&&ater().asap(function(){s.reject(s.rejectReason())}),this._childPromises.push(r),r},t.triggerStateChange=function(){var t=this;this._listeners&&(this._listeners.forEach(function(e){e(t)}),this._listeners.length=0)},t.value=function(t){return"undefined"!=typeof t?(this._stateValue=t,this):this._stateValue}}(this)},e=function(t,i,n,r,s,o,a,c){if(!(this instanceof e))return new e(t,i,n,r,s,o,a,c);var u=[t,i,n,r,s,o,a,c];if(this.__factoryClass){var f,h=this;if(this.__factoryClass.forEach(function(t){f=t.apply(h,u)}),"[object Function]"==Object.prototype.toString.call(f)){if(f._classInfo.name!=e._classInfo.name)return new f(t,i,n,r,s,o,a,c)}else if(f)return f}if(this.__traitInit){var h=this;this.__traitInit.forEach(function(t){t.apply(h,u)})}else"function"==typeof this.init&&this.init.apply(this,u)};e._classInfo={name:"_promise"},"undefined"!=typeof ocNamespaces&&ocNamespaces("").registerComponent("_promise",e),e.prototype=new t,"undefined"!=typeof window&&(window._promise=e),"undefined"!=typeof window&&(window._promise_prototype=t);var i=function(){!function(t){var e,i,n,r,s;t.add=function(t,e,n){if(e||n){var r;"[object Array]"===Object.prototype.toString.call(n)?r=n:(r=Array.prototype.slice.call(arguments,2),r||(r=[])),i.push([e,t,r])}else i.push(t)},t.after=function(t,e,i){i||(i="time"+(new Date).getTime()+Math.random(1e7)),r[i]={step:Math.floor(1e3*t),fn:e,nextTime:0,remove:!0}},t.asap=function(t){this.add(t)},t.every=function(t,e,i){i||(i="time"+(new Date).getTime()+Math.random(1e7)),r[i]={step:Math.floor(1e3*t),fn:e,nextTime:0}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){if(!e){this.polyfill();var t,o;if("undefined"!=typeof window){var t=window.requestAnimationFrame,o=window.cancelRequestAnimationFrame;["","ms","moz","webkit","o"].forEach(function(e){t||(t=window[e+"RequestAnimationFrame"],o=window[e+"CancelAnimationFrame"]||window[e+"CancelRequestAnimationFrame"])})}t||(t=function(t){return setTimeout(t,16)}),o||(o=function(t){clearTimeout(t)}),i=[],n={},r={},s=[];var a=0,c=function(){for(var e,o=(new Date).getTime();e=i.shift();)"[object Array]"===Object.prototype.toString.call(e)?e[1].apply(e[0],e[2]):e();for(var u=0;u<s.length;u++){var f=s[u];f()}for(var h in n)if(n.hasOwnProperty(h)){var l=n[h];l[0](l[1]),delete n[h]}for(var h in r)if(r.hasOwnProperty(h)){var l=r[h];l.nextTime<o&&(l.remove?l.nextTime>0?(l.fn(),delete r[h]):l.nextTime=o+l.step:(l.fn(),l.nextTime=o+l.step)),l.until&&l.until<o&&delete r[h]}t(c),a=o};c(),e=!0}}),t.once=function(t,e,i){n[t]=[e,i]},t.onFrame=function(t){s.push(t)},t.polyfill=function(){},t.removeFrameFn=function(t){var e=s.indexOf(t);return e>=0?(t._onRemove&&t._onRemove(),s.splice(e,1),!0):!1}}(this)},n=function(t,e,i,r,s,o,a,c){if(!(this instanceof n))return new n(t,e,i,r,s,o,a,c);var u=[t,e,i,r,s,o,a,c];if(this.__factoryClass){var f,h=this;if(this.__factoryClass.forEach(function(t){f=t.apply(h,u)}),"[object Function]"==Object.prototype.toString.call(f)){if(f._classInfo.name!=n._classInfo.name)return new f(t,e,i,r,s,o,a,c)}else if(f)return f}if(this.__traitInit){var h=this;this.__traitInit.forEach(function(t){t.apply(h,u)})}else"function"==typeof this.init&&this.init.apply(this,u)};n._classInfo={name:"later"},"undefined"!=typeof ocNamespaces&&ocNamespaces("").registerComponent("later",n),n.prototype=new i,"undefined"!=typeof window&&(window.later=n),"undefined"!=typeof window&&(window.later_prototype=i);var r=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"undefined"==typeof t?this.__isA:"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return"undefined"==typeof t?this.__isO:t===Object(t)}}(this),function(t){var i;t.hasOwnProperty("__factoryClass")||(t.__factoryClass=[]),t.__factoryClass.push(function(t,e){return t===!1&&e?void 0:(i||(i={}),i[t]?i[t]:void(i[t]=this))}),t.addCommands=function(t,e){if(this.isArray(t)){var i=this;return t.forEach(function(t){i.addCommands(t)}),this}this._commands.push({fnCmd:t,fnFail:e,async:!0})},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,e){this._commands||(this._commands=[],this.waitingList=[],this._index=0);var i=this;e||n().every(1/30,function(){i.step()})}),t.step=function(){var t=this._index,i=this._commands.length;if(t!=i){for(var n=e(),r=n,s=e(),o=this;i>t;){var a=this._commands[t];!function(t){r=r.then(function(){var i=e();return t.fnCmd(function(){i.resolve(!0)},function(e){i.resolve(!0),t.fnFail&&t.fnFail(e)}),i}).fail(function(e){t.fnFail&&t.fnFail(e)})}(a),this._index++,t++}return r.then(function(){if(o.waitingList.shift(),s.resolve(!0),o.waitingList.length){var t=o.waitingList[0];t.resolve(!0)}}).fail(function(){}),this.waitingList.push(n),1==this.waitingList.length&&n.resolve(!0),s}}}(this)},s=function(t,e,i,n,r,o,a,c){if(!(this instanceof s))return new s(t,e,i,n,r,o,a,c);var u=[t,e,i,n,r,o,a,c];if(this.__factoryClass){var f,h=this;if(this.__factoryClass.forEach(function(t){f=t.apply(h,u)}),"[object Function]"==Object.prototype.toString.call(f)){if(f._classInfo.name!=s._classInfo.name)return new f(t,e,i,n,r,o,a,c)}else if(f)return f}if(this.__traitInit){var h=this;this.__traitInit.forEach(function(t){t.apply(h,u)})}else"function"==typeof this.init&&this.init.apply(this,u)};s._classInfo={name:"sequenceStepper"},"undefined"!=typeof ocNamespaces&&ocNamespaces("").registerComponent("sequenceStepper",s),s.prototype=new r,"undefined"!=typeof window&&(window.sequenceStepper=s),"undefined"!=typeof window&&(window.sequenceStepper_prototype=r);var o=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"undefined"==typeof t?this.__isA:"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return"undefined"==typeof t?this.__isO:t===Object(t)}}(this),function(t){t.cont=function(t){if(this.isArray(t)){var i=this,n=this._list.slice(this._index+1);if(0==n.length)return void this.step();var r=[];t.forEach(function(t){var e=i._list.slice(i._index+1),n=simpleStream(i);n.addObserver(e),r.push(n.pushValue(t))});var s=e();s.all(r).then(function(){var t=[];r.forEach(function(e){t.push(e.value())}),i.resolve(t)}),s.resolve(!0)}else"undefined"!=typeof t&&(this._context.value=t),this.step()},t.ctxVar=function(t,e){if("undefined"==typeof e){var i=this._contextVars[t];return"undefined"==typeof i&&this._parent?this._parent.ctxVar(t):i}this._contextVars[t]=e},t.get=function(t){if(this._closure){var e=this._contextVars[t];return"undefined"==typeof e?this._parent.get(t):e}var e=this._contextVars[t];return"undefined"==typeof e&&this._parent?this._parent.get(t):e},t.getRest=function(){},t.getState=function(){return this._stopState},t.getValue=function(){return!this._context&&this._parent?this._parent.getValue():this._context&&!this._context.value&&!this._context.initWith&&this._parent?this._parent.getValue():this._context.value||this._context.initWith},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,e){this._context={},this._contextVars={},this._stopState=0,t&&(this._parent=t),e&&(this._closure=!0)}),t.run=function(t){if(this._closure){if(this._parent)return void this._parent.run(t);console.error("No parent for closure"),console.trace()}this._stopState=1,this.cont(t)},t.set=function(t,e){if("undefined"!=typeof e){if(this._closure)if("undefined"!=typeof this._contextVars[t])this._contextVars[t]=e;else if(this._parent)return this._parent.set(t,e),this;return"undefined"==typeof this._contextVars[t]&&this._parent?(this._parent.set(t,e),this):(this._contextVars[t]=e,this)}},t.setContext=function(t){this._context=t},t.setParent=function(t){this._parent=t},t.start=function(t){this._list=t,this._index=-1,this.step()},t.step=function(){this._index++;var t=this._index;if(this._list[t]){var e=this._list[t];this.isObject(e)&&!this.isFunction(e)?e.closure?(e.closure.setParent(this),e.fn(e.closure)):e.fn(this):e(this)}else"undefined"==typeof this._context.value&&(this._context.value=this._context.initWith),this._stopState<2&&(this._stopState=7),this.resolve(this._context.value)},t.stopStream=function(){this._context.value||(this._context.value=this._context.initWith),this._stopState=3,this.resolve(this._context.value)}}(this)};o.prototype=e.prototype;var a=function(t,e,i,n,r,s,o,c){if(!(this instanceof a))return new a(t,e,i,n,r,s,o,c);var u=[t,e,i,n,r,s,o,c];if(this.__factoryClass){var f,h=this;if(this.__factoryClass.forEach(function(t){f=t.apply(h,u)}),"[object Function]"==Object.prototype.toString.call(f)){if(f._classInfo.name!=a._classInfo.name)return new f(t,e,i,n,r,s,o,c)}else if(f)return f}if(this.__traitInit){var h=this;this.__traitInit.forEach(function(t){t.apply(h,u)})}else"function"==typeof this.init&&this.init.apply(this,u)};a._classInfo={name:"streamProcessor"},"undefined"!=typeof ocNamespaces&&ocNamespaces("").registerComponent("streamProcessor",a),a.prototype=new o,"undefined"!=typeof window&&(window.streamProcessor=a),"undefined"!=typeof window&&(window.streamProcessor_prototype=o),function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"undefined"==typeof t?this.__isA:"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return"undefined"==typeof t?this.__isO:t===Object(t)}}(this),function(t){var i;t.addObserver=function(t,e){if(this.isArray(t)){var i=this;return void t.forEach(function(t){i.addObserver(t,e)})}return this.isObject(t)&&!this.isFunction(t)?void this._observers.push(t):(this._observers.push({fn:t,closure:e}),this)},t.branch=function(t,e){var i=this,n=(new Date).getTime();return i._lastBranch=n,this.addObserver(function(r){var s=((new Date).getTime(),r.getValue());setTimeout(function(){var o=(new Date).getTime();if(!(e>o-n)){var a=0;(a=i.isActiveRunning())||(r=i.getLastProcess(),3==r.getState()&&(i._lastBranch=o,n=o,t(s)))}},e),r.run()}),this},t.branchIfOk=function(t,e){var i=this,n=(new Date).getTime();return i._lastBranch=n,this.addObserver(function(r){var s=((new Date).getTime(),r.getValue());setTimeout(function(){var o=(new Date).getTime();if(!(e>o-n)){var a=0;(a=i.isActiveRunning())||(r=i.getLastProcess(),7==r.getState()&&(i._lastBranch=o,n=o,t(s)))}},e),r.run()}),this},t.collectValuesFor=function(t){var e=this,i=(new Date).getTime();return e._lastBranch=i,this.addObserver(function(n){(new Date).getTime(),n.getValue();setTimeout(function(){var r=(new Date).getTime();if(!(t>r-i)){var s=e.isActiveRunning(),o=e.getLastProcess();return s>1&&n!=o?void n.stopStream(n.getValue()):void o.run()}},t)}),this},t.combineLatest=function(t){var e=this,i=[],n=t.length,r=function(){for(var t=!0,e=0;n>e;e++)"undefined"==typeof i[e]&&(t=!1);return t};return t.forEach(function(t,n){t.addObserver(function(t){i[n]=t.getValue(),r()&&e.pushValue(i),t.run()})}),this},t.filter=function(t){var e=this;return this.addObserver(function(i){var n=i.getValue(),r=[];return e.isArray(n)?(n.forEach(function(e){t(e)&&r.push(e)}),void(r.length?i.run(r):i.stopStream())):t(n)?void i.run(n):void i.stopStream()}),this},t.forContext=function(t){var e=this;e.addObserver(function(i){var n=i.getValue(),r=[];e.isArray(n)?n.forEach(function(e,n){r.push(t(e,n,i))}):r.push(t(n,0,i)),i.run(n)})},t.forEach=function(t){var e=this;return e.addObserver(function(i){var n=i.getValue(),r=[];e.isArray(n)?n.forEach(function(e){r.push(t(e))}):r.push(t(n)),i.run(n)}),this},t.getLastProcess=function(){var t=this._active.length;return t>0?this._active[t-1]:this._lastProcess},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t){this._childIndex=0,this._childStreams=[],this._values=[],this._active=[],this._lastProcess,this._observers=[],this._id=this.guid(),i||(i={}),i[this._id]=this,t&&(this._parentProcessor=t)}),t.isActiveRunning=function(){return this._active.length},t.map=function(t){var e=this;return e.addObserver(function(i){var n=i.getValue(),r=[];e.isArray(n)?n.forEach(function(e){r.push(t(e))}):r.push(t(n)),i.run(r)}),this},t.pushValue=function(t){var i=e();return this.startProcess({initWith:t},i),i},t.reduce=function(t,e){var i=this;return i.addObserver(function(n){var r=n.getValue(),s=[];s=i.isArray(r)?r.reduce(t,e):[r].reduce(t,e),n.run(s)}),this},t.startProcess=function(t,e){var i=this._observers.slice(),n=a(this._parentProcessor);n.setContext(t),n.start(i),this._active.push(n);var r=this;n.then(function(t){var i=r._active.indexOf(n);r._active.splice(i,1),e.resolve(t),r._lastProcess=n})},t.step=function(){}}(this)},simpleStream=function(t,e,i,n,r,s,o,a){if(!(this instanceof simpleStream))return new simpleStream(t,e,i,n,r,s,o,a);var c=[t,e,i,n,r,s,o,a];if(this.__factoryClass){var u,f=this;if(this.__factoryClass.forEach(function(t){u=t.apply(f,c)}),"[object Function]"==Object.prototype.toString.call(u)){if(u._classInfo.name!=simpleStream._classInfo.name)return new u(t,e,i,n,r,s,o,a)}else if(u)return u}if(this.__traitInit){var f=this;this.__traitInit.forEach(function(t){t.apply(f,c)})}else"function"==typeof this.init&&this.init.apply(this,c)};simpleStream._classInfo={name:"simpleStream"},"undefined"!=typeof ocNamespaces&&ocNamespaces("").registerComponent("simpleStream",simpleStream),simpleStream.prototype=new simpleStream_prototype,"undefined"!=typeof window&&(window.simpleStream=simpleStream),"undefined"!=typeof window&&(window.simpleStream_prototype=simpleStream_prototype);