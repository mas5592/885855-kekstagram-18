'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = null;

  var getRandom = function (min, max) {
    var result = Math.random() * (max - min) + min;
    return Number(result.toFixed(0));
  };

  var isEscEvent = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  var isEnterEvent = function (evt) {
    return evt.keyCode === ENTER_KEYCODE;
  };

  var addEventHandler = function (elements, event, handler) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener(event, handler);
    }
  };

  var removeChildElements = function (elements, block) {
    for (var i = 0; i < elements.length; i++) {
      block.removeChild(elements[i]);
    }
  };

  var removeClassBlockArray = function (elements, cssClass) {
    elements.forEach(function (element) {
      element.classList.remove(cssClass);
    });
  };

  var debounce = function (cb) {
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var getRandomDigitalRange = function (rangeMax, number) {
    var results = [];
    for (var i = 0; results.length < number; i++) {
      var randomItem = getRandom(0, rangeMax - 1);
      if (results.indexOf(randomItem) === -1) {
        results.push(randomItem);
      }
      if (i > rangeMax - 1) {
        break;
      }
    }
    return results;
  };

  var getRandomElements = function (data, number) {
    var randomIndex = getRandomDigitalRange(data.length, number);
    var result = [];
    randomIndex.forEach(function (el) {
      result.push(data[el]);
    });
    return result;
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    getRandom: getRandom,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    addEventHandler: addEventHandler,
    removeChildElements: removeChildElements,
    removeClassBlockArray: removeClassBlockArray,
    debounce: debounce,
    getRandomElements: getRandomElements
  };
})();
