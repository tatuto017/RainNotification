function notice() {
}
function createTrigger() {
}
function setTrigger() {
}/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/functions.ts":
/*!**************************!*\
  !*** ./src/functions.ts ***!
  \**************************/
/*! exports provided: notice, setTrigger, createTrigger, getProp, setProp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notice", function() { return notice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTrigger", function() { return setTrigger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTrigger", function() { return createTrigger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProp", function() { return getProp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setProp", function() { return setProp; });
const weather_url = 'https://www.mm-s.biz/weather/forecast.php';
const line_notify_url = 'https://notify-api.line.me/api/notify';
const notice = () => {
    try {
        let json_url = weather_url + '?' + 'area=' + getProp('area');
        let json = UrlFetchApp.fetch(json_url).getContentText();
        let jsonData = JSON.parse(json);
        let result = jsonData.data[0].today[2];
        if (result.indexOf('雨') != -1 || result.indexOf("雪") != -1) {
            lineNotify("雨予報です、傘を忘れずに！");
        }
        deleteTrigger();
    }
    catch (_a) {
        lineNotify("エラー");
    }
};
const setTrigger = () => {
    let triggers = ScriptApp.getProjectTriggers().filter(trigger => trigger.getHandlerFunction() == 'createTrigger');
    if (triggers.length == 0) {
        ScriptApp.newTrigger("createTrigger").timeBased().atHour(1).everyDays(1).create();
    }
};
const createTrigger = () => {
    let h, m;
    [h, m] = getProp('NoticeTime').split(':');
    let triggerDay = new Date();
    triggerDay.setHours(Number(h));
    triggerDay.setMinutes(Number(m));
    ScriptApp.newTrigger("notice").timeBased().at(triggerDay).create();
};
const getProp = (key) => {
    return (PropertiesService.getScriptProperties().getProperty(key) || '');
};
const setProp = (key, value) => {
    PropertiesService.getScriptProperties().setProperty(key, value);
};
const deleteTrigger = () => {
    ScriptApp.getProjectTriggers().forEach(trigger => {
        if (trigger.getHandlerFunction() == "notice") {
            ScriptApp.deleteTrigger(trigger);
        }
    });
};
const lineNotify = (message) => {
    UrlFetchApp.fetch(line_notify_url, {
        "method": "post",
        "payload": "message=" + message,
        "headers": { "Authorization": "Bearer " + getProp('LineToken') }
    });
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.ts");



global.notice = () => Object(_functions__WEBPACK_IMPORTED_MODULE_0__["notice"])();
global.createTrigger = () => Object(_functions__WEBPACK_IMPORTED_MODULE_0__["createTrigger"])();
global.setTrigger = () => Object(_functions__WEBPACK_IMPORTED_MODULE_0__["setTrigger"])();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZnVuY3Rpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0NBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxJQUEwRTtRQUMxRTtRQUNBLGlDQUErRDtRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLFVBQWlDO1FBQzFFLDZCQUFxSTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLElBQXVEO1FBQ1A7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0EsOENBQXFIOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQU0sV0FBVyxHQUFnQiwyQ0FBMkMsQ0FBQztBQUM3RSxNQUFNLGVBQWUsR0FBWSx1Q0FBdUMsQ0FBQztBQUVsRSxNQUFNLE1BQU0sR0FBRyxHQUFHLEVBQUU7SUFDekIsSUFBSTtRQUNGLElBQUksUUFBUSxHQUFZLFdBQVcsR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RSxJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxNQUFNLEdBQVksQ0FBMEI7UUFFaEQsQ0FBOEQ7WUFDNUQsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQzdCO1FBQ0QsYUFBYSxFQUFFLENBQUM7S0FDakI7SUFBQyxXQUFNO1FBQ04sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ25CO0FBQ0gsQ0FBQztBQUVNLEtBQXdCO0lBQzdCLElBQUksUUFBNkc7SUFDakgsSUFBSyxRQUFRLENBQUMsTUFBTSxHQUFRO0tBQ3dEO0VBQ25GO0FBQ0gsQ0FBQztBQUVNLE1BQU0sYUFBYSxHQUFHLEdBQUcsRUFBRTtJQUNoQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDUixDQUFFLENBQUMsRUFBQyxDQUFDLENBQUUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLENBQTRCO0VBQ0c7SUFDL0IsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFXO0lBQ2pDLFNBQW1FO0FBQ3JFLENBQUM7QUFFTSxNQUFNLE9BQU8sR0FBRyxDQUFDLEdBQVksRUFBRSxFQUFFO0lBQ3RDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxLQUE4QztBQUMxRSxDQUFDO0FBRU0sTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFZLEVBQUUsS0FBYyxFQUFFLEVBQUU7RUFDVTtBQUNsRSxDQUFDO0FBQ0QsTUFBTSxhQUFhLEdBQUcsR0FBRyxFQUFFO0VBQ3dCO1FBQy9DLElBQUksT0FBTyxDQUFDLGFBQWtDO1lBQzVDLFNBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7RUFDbEM7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxNQUFNLFVBQVUsR0FBRyxDQUFDLE9BQWdCLEVBQUUsRUFBRTtJQUN0QyxXQUFXLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRTtRQUMvQixDQUFrQjtPQUNjO0VBQytCO0tBQ2hFLENBQ0Y7QUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7O0FDekREO0FBQUE7QUFBNEM7QUFDQTtBQUNBO0FBTTVDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMscUJBQVM7QUFFL0IsTUFBTSxDQUFDLGFBQWEsR0FBRyxHQUFHLEVBQUUsQ0FBQyxnRUFBYSxFQUFFLENBQUM7QUFFTiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiY29uc3Qgd2VhdGhlcl91cmwgICAgIDogc3RyaW5nID0gJ2h0dHBzOi8vd3d3Lm1tLXMuYml6L3dlYXRoZXIvZm9yZWNhc3QucGhwJztcbmNvbnN0IGxpbmVfbm90aWZ5X3VybCA6IHN0cmluZyA9ICdodHRwczovL25vdGlmeS1hcGkubGluZS5tZS9hcGkvbm90aWZ5JztcblxuZXhwb3J0IGNvbnN0IG5vdGljZSA9ICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsZXQganNvbl91cmwgOiBzdHJpbmcgPSB3ZWF0aGVyX3VybCArICc/JyArICdhcmVhPScgKyBnZXRQcm9wKCdhcmVhJyk7XG4gICAgbGV0IGpzb24gPSBVcmxGZXRjaEFwcC5mZXRjaChqc29uX3VybCkuZ2V0Q29udGVudFRleHQoKTtcbiAgICBsZXQganNvbkRhdGEgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgIGxldCByZXN1bHQgOiBzdHJpbmcgPSBqc29uRGF0YS5kYXRhWzBdLnRvZGF5WzJdO1xuXG4gICAgaWYgKCByZXN1bHQuaW5kZXhPZign6ZuoJykgIT0gLTEgfHwgcmVzdWx0LmluZGV4T2YoXCLpm6pcIikgIT0gLTEgKSB7XG4gICAgICBsaW5lTm90aWZ5KFwi6Zuo5LqI5aCx44Gn44GZ44CB5YKY44KS5b+Y44KM44Ga44Gr77yBXCIpO1xuICAgIH1cbiAgICBkZWxldGVUcmlnZ2VyKCk7XG4gIH0gY2F0Y2gge1xuICAgIGxpbmVOb3RpZnkoXCLjgqjjg6njg7xcIik7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHNldFRyaWdnZXIgPSAoKSA9PiB7XG4gIGxldCB0cmlnZ2VycyA9IFNjcmlwdEFwcC5nZXRQcm9qZWN0VHJpZ2dlcnMoKS5maWx0ZXIodHJpZ2dlciA9PiB0cmlnZ2VyLmdldEhhbmRsZXJGdW5jdGlvbigpID09ICdjcmVhdGVUcmlnZ2VyJyk7XG4gIGlmICggdHJpZ2dlcnMubGVuZ3RoID09IDAgKSB7XG4gICAgU2NyaXB0QXBwLm5ld1RyaWdnZXIoXCJjcmVhdGVUcmlnZ2VyXCIpLnRpbWVCYXNlZCgpLmF0SG91cigxKS5ldmVyeURheXMoMSkuY3JlYXRlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyaWdnZXIgPSAoKSA9PiB7XG4gIGxldCBoLG07XG4gIFsgaCxtIF0gPSBnZXRQcm9wKCdOb3RpY2VUaW1lJykuc3BsaXQoJzonKTtcbiAgbGV0IHRyaWdnZXJEYXkgPSBuZXcgRGF0ZSgpO1xuICB0cmlnZ2VyRGF5LnNldEhvdXJzKE51bWJlcihoKSk7XG4gIHRyaWdnZXJEYXkuc2V0TWludXRlcyhOdW1iZXIobSkpO1xuICBTY3JpcHRBcHAubmV3VHJpZ2dlcihcIm5vdGljZVwiKS50aW1lQmFzZWQoKS5hdCh0cmlnZ2VyRGF5KS5jcmVhdGUoKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldFByb3AgPSAoa2V5IDogc3RyaW5nKSA9PiB7XG4gIHJldHVybiAoUHJvcGVydGllc1NlcnZpY2UuZ2V0U2NyaXB0UHJvcGVydGllcygpLmdldFByb3BlcnR5KGtleSkgfHwgJycpO1xufVxuXG5leHBvcnQgY29uc3Qgc2V0UHJvcCA9IChrZXkgOiBzdHJpbmcsIHZhbHVlIDogc3RyaW5nKSA9PiB7XG4gIFByb3BlcnRpZXNTZXJ2aWNlLmdldFNjcmlwdFByb3BlcnRpZXMoKS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlKTtcbn1cbmNvbnN0IGRlbGV0ZVRyaWdnZXIgPSAoKSA9PiB7XG4gIFNjcmlwdEFwcC5nZXRQcm9qZWN0VHJpZ2dlcnMoKS5mb3JFYWNoKHRyaWdnZXIgPT4ge1xuICAgIGlmICh0cmlnZ2VyLmdldEhhbmRsZXJGdW5jdGlvbigpID09IFwibm90aWNlXCIpIHtcbiAgICAgIFNjcmlwdEFwcC5kZWxldGVUcmlnZ2VyKHRyaWdnZXIpO1xuICAgIH1cbiAgfSk7XG59XG5cbmNvbnN0IGxpbmVOb3RpZnkgPSAobWVzc2FnZSA6IHN0cmluZykgPT4ge1xuICBVcmxGZXRjaEFwcC5mZXRjaChsaW5lX25vdGlmeV91cmwsIHtcbiAgICAgIFwibWV0aG9kXCIgIDogXCJwb3N0XCIsXG4gICAgICBcInBheWxvYWRcIiA6IFwibWVzc2FnZT1cIiArIG1lc3NhZ2UsXG4gICAgICBcImhlYWRlcnNcIiA6IHtcIkF1dGhvcml6YXRpb25cIiA6IFwiQmVhcmVyIFwiKyBnZXRQcm9wKCdMaW5lVG9rZW4nKX1cbiAgICB9XG4gIClcbn1cblxuIiwiaW1wb3J0IHsgbm90aWNlICAgICAgICB9IGZyb20gJy4vZnVuY3Rpb25zJztcclxuaW1wb3J0IHsgc2V0VHJpZ2dlciAgICB9IGZyb20gJy4vZnVuY3Rpb25zJztcclxuaW1wb3J0IHsgY3JlYXRlVHJpZ2dlciB9IGZyb20gJy4vZnVuY3Rpb25zJztcclxuXHJcbmRlY2xhcmUgY29uc3QgZ2xvYmFsOiB7XHJcbiAgW3g6IHN0cmluZ106IGFueTtcclxufVxyXG5cclxuZ2xvYmFsLm5vdGljZSA9ICgpID0+IG5vdGljZSgpO1xyXG5cclxuZ2xvYmFsLmNyZWF0ZVRyaWdnZXIgPSAoKSA9PiBjcmVhdGVUcmlnZ2VyKCk7XHJcblxyXG5nbG9iYWwuc2V0VHJpZ2dlciA9ICgpID0+IHNldFRyaWdnZXIoKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==