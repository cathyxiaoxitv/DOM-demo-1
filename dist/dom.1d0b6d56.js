// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"dom.js":[function(require,module,exports) {
window.cathy = {
  create: function create(string) {
    var container = document.createElement("template"); //用template来做一个容器来容纳各种标签

    container.innerHTML = string.trim(); //去除开头空格

    return container.content.firstChild; //返回容器的内容的第一个孩子
  },
  after: function after(node, node2) {
    //把node2插入到node的后面
    node.parentNode.insertBefore(node2, node.nextSibling); //node2插入到node的下一个兄弟的前面
  },
  before: function before(node, node2) {
    //把node2插入到node的前面
    node.parentNode.insertBefore(node2, node); //x插入到y的前面
  },
  append: function append(parent, node) {
    parent.appendChild(node);
  },
  wrap: function wrap(node, parent) {
    cathy.before(node, parent); //爸爸先作为哥哥来到儿子前面,是我写的，所以要加cathy

    cathy.append(parent, node); //然后爸爸再把弟弟收为儿子😂,是我写的，所以要加cathy
  },
  //=================以上为增====================
  remove: function remove(node) {
    node.parentNode.removeChild(node); //删除爸爸节点中的这个孩子节点

    return node; //返回的话外面就还可以保留对这个节点的引用
  },
  empty: function empty(node) {
    var array = [];
    var x = node.firstChild;

    while (x) {
      //只要还有孩子，就继续
      array.push(cathy.remove(x)); //用刚刚写的remove删除第一个孩子，push进array里备份

      x = node.firstChild; //之前的第二个孩子晋级成了第一个孩子，把它赋给x，继续搞它
    }

    return array;
  },
  //=================以上为删====================
  attr: function attr(node, name, value) {
    if (arguments.length === 3) {
      //看来这人想要改写
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      //看来这人只是想要读取
      // else if用来写设想的第二种情况！！！
      return node.getAttribute(name); // 因为是读取，返回值就好
    }
  },
  text: function text(node, string) {
    if (arguments.length === 2) {
      if ('innerText' in node) {
        //IE
        node.innerText = string;
      } else {
        // 考虑不同浏览器的说法不同，这叫适配！
        node.textContent = string; //firefox/chrome
      }
    } else if (arguments.length === 1) {
      return node.innerText || node.textContent;
    }
  },
  html: function html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style: function style(node, name, value) {
    if (arguments.length === 3) {
      // 可以想象dom.style(div, 'color', 'red')以判断用户想要改颜色
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === 'string') {
        // 可以想象dom.style(div, 'color')，判断用户想要读取color的内容
        return node.style[name];
      } else if (name instanceof Object) {
        //如果name是Object的格式展现出来， dom.style(div, {color: 'red'})，也可以知道用户想要改颜色
        var object = name;

        for (var k in object) {
          //相当于把'color'之类的key赋值给了k k= 'color' 然后搜寻此object里的key
          // console.log(k)
          // console.log(object[k])
          node.style[k] = object[k]; //style[key]要用[]扩起来!!如果直接用style.k === style[`k`] 然后用object[k]取到value
        }
      }
    }
  },
  class: {
    add: function add(node, className) {
      node.classList.add(className);
    },
    remove: function remove(node, className) {
      node.classList.remove(className);
    },
    has: function has(node, className) {
      return node.classList.contains(className);
    }
  },
  on: function on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off: function off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find: function find(selector, scope) {
    return (scope || document).querySelectorAll(selector); //这也是重载的思想！or的短路逻辑是前者如果为假，还会看后者，所以我们可以把设想的备用情况放在前面～有则执行，无也无妨。
  },
  siblings: function siblings(node) {
    return Array.from(node.parentNode.children).filter(function (item) {
      return item !== node;
    });
  },
  //children本身是一个伪数组！需要转化成数组!然后要注意filter的用法
  parent: function parent(node) {
    return node.parentNode;
  },
  children: function children(node) {
    return node.children;
  },
  next: function next(node) {
    var x = node.nextSibling;

    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }

    return x;
  },
  previous: function previous(node) {
    var x = node.previousSibling;

    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }

    return x;
  },
  each: function each(nodeList, fn) {
    //必须得是nodelist，才可以获得长度，进行遍历
    for (var i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index: function index(node) {
    var list = cathy.children(node.parentNode); //伪数组

    var i;

    for (i = 0; i < list.length; i++) {
      //但伪数组是有length和index的！！
      if (node === list[i]) {
        break;
      }
    }

    return i + 1; //我觉得加1更加直观～
  }
};
},{}],"../../../.config/yarn/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59484" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel/src/builtins/hmr-runtime.js","dom.js"], null)
//# sourceMappingURL=/dom.1d0b6d56.js.map