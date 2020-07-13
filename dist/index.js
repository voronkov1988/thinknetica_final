/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./loadIssues.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./loadIssues.js":
/*!***********************!*\
  !*** ./loadIssues.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./style.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst statusDiv = document.querySelector('.status-div');\r\nconst resultDiv = document.querySelector('.result-div');\r\nconst modalPage = document.querySelector('.modal-page');\r\nconst form = document.querySelector('form.issues-form');\r\n\r\nfunction getIssues(user, repository){\r\n    fetch(`https://api.github.com/repos/${user}/${repository}/issues`)\r\n        .then(result =>{\r\n            if(result.status !== 200){\r\n                return Promise.reject(new Error(result.status));\r\n            }\r\n            return Promise.resolve(result);\r\n        })\r\n        .then(res =>{\r\n            statusDiv.innerHTML = 'Готово...';\r\n            setTimeout(()=>{\r\n                statusDiv.innerHTML = '';\r\n            }, 3000);\r\n\r\n            return res.json();\r\n        })\r\n        .then(response =>{\r\n            renderIssues(response)\r\n        })\r\n        .catch(function(error) {\r\n            statusDiv.innerHTML = `Ошибка ${error}`;\r\n            console.log('Request failed', error)\r\n        });\r\n}\r\n\r\nfunction renderIssues(issues){\r\n    issues.forEach(item =>{\r\n        let element = document.createElement('div');\r\n        element.innerHTML = `\r\n        <div class=\"result-div\">\r\n            <div data-closed=\"${item.closed_at}\" class=\"issues\">\r\n                <div class=\"profile\">\r\n                    <img data-number=\"${item.number}\"\r\n                         data-created=\"${item.created_at}\"\r\n                         data-title=\"${item.title}\"\r\n                         data-description=\"${item.body}\"\r\n                         data-image=\"${item.user.avatar_url}\"\r\n                         data-link=\"${item.user.html_url}\"\r\n                         data-closed=\"${item.closed_at}\"\r\n                         data-updated=\"${item.updated_at}\"\r\n                     src=\"${item.user.avatar_url}\" alt=\"image\">\r\n                    <p><a href=\"${item.user.html_url}\">Профиль</a></p>\r\n                </div>\r\n                <div class=\"info\">\r\n                    <div class=\"info-title\">\r\n                        <div class=\"title\">${item.title}</div>\r\n                        <div class=\"number\">номер issue: ${item.number}</div>\r\n                    </div>\r\n                    <div class=\"description\">${item.body.slice(0, 100)}</div>\r\n                    <div class=\"data-created\">${item.created_at}</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    `;\r\n        resultDiv.append(element)\r\n    });\r\n    takeModal()\r\n}\r\n\r\nfunction takeModal(){\r\n    let imgDiv = document.querySelectorAll('.profile img');\r\n    imgDiv.forEach(item=>{\r\n        item.addEventListener('click', (e)=>{\r\n            renderModal(e.target)\r\n        })\r\n    })\r\n}\r\n\r\nfunction renderModal(data){\r\n    modalPage.innerHTML = '';\r\n    let element = document.createElement('div');\r\n    element.classList = 'wrapper';\r\n    element.innerHTML = `\r\n        <div class=\"modal-info\">\r\n            <div class=\"modal-contacts\">\r\n                <img src=\"${data.dataset.image}\" alt=\"\">\r\n                <p><a href=\"${data.dataset.link}\">Issue link</a></p>\r\n            </div>\r\n            <div class=\"modal-title\">\r\n                <div class=\"modal-h2\">${data.dataset.title}</div>\r\n                <div class=\"modal-description\">${data.dataset.description}</div>\r\n            </div>\r\n        </div>\r\n        <button>Закрыть</button>\r\n        <div class=\"modal-meta\">\r\n            <div class=\"modal-created\">Дата создания: ${data.dataset.created}</div>\r\n            <div class=\"modal-updated\">Дата обновления: ${data.dataset.updated}</div>\r\n            <div class=\"modal-number\">Номер issues: ${data.dataset.number}</div>\r\n        </div>\r\n        \r\n    `;\r\n    modalPage.append(element);\r\n    modalPage.style.display = 'block';\r\n    const button = document.querySelector('.modal-page button');\r\n    button.addEventListener('click',()=>{\r\n        modalPage.innerHTML = ''\r\n    })\r\n}\r\n\r\nform.addEventListener('submit', (e)=>{\r\n    e.preventDefault();\r\n    const inputUser = document.querySelector('input#user').value,\r\n        inputRepos = document.querySelector('input#repos').value;\r\n    resultDiv.innerHTML = '';\r\n    usersDiv.innerHTML = '';\r\n    reposDiv.innerHTML = '';\r\n    statusDiv.innerHTML = 'Загрузка...';\r\n    getIssues(inputUser, inputRepos);\r\n    console.log(inputRepos, inputUser)\r\n});\r\n'use strict';\r\nconst inputUser = document.querySelector('input#user');\r\nconst inputRepos = document.querySelector('input#repos');\r\nconst reposDiv = document.querySelector('.repos');\r\nconst status = document.querySelector('.status-div');\r\nconst usersDiv = document.querySelector('.users');\r\n\r\nasync function getUsers(value){\r\n    fetch(`https://api.github.com/search/users?q=${value}`)\r\n        .then(response =>{\r\n            if(response.status !== 200){\r\n                return Promise.reject(new Error(response.status));\r\n            }\r\n            return Promise.resolve(response);\r\n        })\r\n        .then(res =>{\r\n            return res.json();\r\n        })\r\n        .then(result =>{\r\n            renderUsers(result.items)\r\n        })\r\n        .catch(function(error) {\r\n            status.innerHTML = `Ошибка ${error}`;\r\n        });\r\n}\r\n\r\nfunction renderUsers(users=null){\r\n    let arrayUsers = [];\r\n    users.forEach(user=>{\r\n        let element = document.createElement('div');\r\n        element.classList = 'one-user';\r\n        element.innerHTML = user.login;\r\n        usersDiv.append(element);\r\n        arrayUsers.push(element);\r\n    });\r\n    writeIntoInput(arrayUsers)\r\n}\r\n\r\nfunction writeIntoInput(el){\r\n    let user = '';\r\n    el.forEach(item =>{\r\n        item.addEventListener('click', (e)=>{\r\n            inputUser.value = e.target.textContent;\r\n            usersDiv.innerHTML = '';\r\n            user = inputUser.value;\r\n            loadRepository(user)\r\n        })\r\n    });\r\n\r\n}\r\n\r\nfunction loadRepository(user){\r\n    fetch(`https://api.github.com/users/${user}/repos`)\r\n        .then(res=>{\r\n            return res.json();\r\n        })\r\n        .then(result =>{\r\n            renderRepository(result)\r\n        })\r\n}\r\n\r\nfunction renderRepository(repos){\r\n    let reposArray = [];\r\n    repos.forEach(item=>{\r\n        let element = document.createElement('div');\r\n        element.classList = 'one-repos';\r\n        element.innerHTML = item.name;\r\n        reposDiv.append(element);\r\n        reposArray.push(element);\r\n    });\r\n    writeIntoRepos(reposArray)\r\n}\r\n\r\nfunction writeIntoRepos(perosArray) {\r\n    perosArray.forEach(oneRepos =>{\r\n        oneRepos.addEventListener('click', (e)=>{\r\n            inputRepos.value = e.target.textContent;\r\n            reposDiv.innerHTML = '';\r\n            getIssues(inputUser.value, inputRepos.value);\r\n        })\r\n    });\r\n}\r\n\r\nfunction debounce(f, ms) {\r\n    let isCooldown = false;\r\n    return function() {\r\n        if (isCooldown) {\r\n            return;\r\n        }\r\n        f.apply(this, arguments);\r\n        isCooldown = true;\r\n        setTimeout(() => isCooldown = false, ms);\r\n    };\r\n}\r\n\r\ninputUser.addEventListener('input', (e)=>{\r\n    usersDiv.innerHTML = '';\r\n    inputRepos.value = '';\r\n    setTimeout(()=> delayUser(e.target.value),1000);\r\n});\r\nconst delayUser = debounce(getUsers, 1000);\r\n\n\n//# sourceURL=webpack:///./loadIssues.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./style.css":
/*!*********************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".inp{\\r\\n    border: none;\\r\\n    border-bottom: 2px solid black;\\r\\n    text-align: center;\\r\\n    font-size: 1.4em;\\r\\n    width: 26%;\\r\\n}\\r\\n.submit{\\r\\n    width: 10em;\\r\\n    height: 4em;\\r\\n    margin-left: 50px;\\r\\n}\\r\\n.main{\\r\\n    width: 100%;\\r\\n}\\r\\n.input-div{\\r\\n    font-size: 1.4em;\\r\\n}\\r\\n.status-div{\\r\\n    font-size: 1.2em;\\r\\n    color: red;\\r\\n    padding: 20px;\\r\\n    margin-left: 10em;\\r\\n}\\r\\n.result-div{\\r\\n    width: 100%;\\r\\n    height: auto;\\r\\n}\\r\\n.issues{\\r\\n    display: flex;\\r\\n    justify-content: space-between;\\r\\n    width: 100%;\\r\\n    height: auto;\\r\\n    border: 1px solid black;\\r\\n}\\r\\n.profile img{\\r\\n    max-width: 150px;\\r\\n}\\r\\n.profile p{\\r\\n    background-color: black;\\r\\n    width: 150px;\\r\\n    height: 50px;\\r\\n    text-align: center;\\r\\n}\\r\\n.profile a{\\r\\n    color: whitesmoke;\\r\\n    font-size: 2em;\\r\\n    text-decoration: none;\\r\\n}\\r\\n.info-title{\\r\\n    display: flex;\\r\\n    justify-content: space-between;\\r\\n}\\r\\n.info{\\r\\n    flex-grow: 2;\\r\\n}\\r\\n.title{\\r\\n    font-size: 2em;\\r\\n    color: darkred;\\r\\n    text-align: center;\\r\\n    margin-top: 1em;\\r\\n}\\r\\n.description{\\r\\n    font-size: 1.4em;\\r\\n    padding: 10px;\\r\\n    color: darkblue;\\r\\n}\\r\\n.data-created{\\r\\n    font-size: 1.8em;\\r\\n    color: blueviolet;\\r\\n    margin-top: 10px;\\r\\n}\\r\\n.number{\\r\\n    font-weight: bold;\\r\\n    font-size: 1.2em;\\r\\n    margin-top: 1em;\\r\\n}\\r\\n.one-user, .one-repos{\\r\\n    display: inline-block;\\r\\n    width: auto;\\r\\n    margin-left: 20px;\\r\\n    height: 25px;\\r\\n    background-color: black;\\r\\n    color: white;\\r\\n    padding: 2px;\\r\\n    margin-top: 5px;\\r\\n    cursor: pointer;\\r\\n}\\r\\n.modal-page{\\r\\n    display: none;\\r\\n    position: fixed;\\r\\n    height: auto;\\r\\n    width: 90%;\\r\\n    margin-left: 5%;\\r\\n    background-color: lightgoldenrodyellow;\\r\\n}\\r\\n.modal-info{\\r\\n    display: flex;\\r\\n    justify-content: space-between;\\r\\n}\\r\\n.modal-page button{\\r\\n    width: 500px;\\r\\n    height: 3em;\\r\\n    background-color: black;\\r\\n    color: lightgoldenrodyellow;\\r\\n    text-shadow: cornflowerblue 1px 1px;\\r\\n    font-size: 1.4em;\\r\\n    font-weight: bold;\\r\\n    cursor: pointer;\\r\\n    margin-left: 30%;\\r\\n    padding: 1em 1em;\\r\\n}\\r\\n.modal-title{\\r\\n    flex-grow: 2;\\r\\n}\\r\\n.modal-meta{\\r\\n    display: flex;\\r\\n    padding-top: 1em;\\r\\n    justify-content: space-around;\\r\\n}\\r\\n.modal-h2{\\r\\n    font-size: 3em;\\r\\n    color: darkred;\\r\\n    text-align: center;\\r\\n    font-weight: bold;\\r\\n}\\r\\n.modal-description{\\r\\n    color: darkblue;\\r\\n    font-size: 1.2em;\\r\\n    line-height: 1.6em;\\r\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./style.css":
/*!*******************!*\
  !*** ./style.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !./node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./style.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./style.css?");

/***/ })

/******/ });