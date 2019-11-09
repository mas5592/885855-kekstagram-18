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
    var result = [];
    for (var i = 0; result.length <= number - 1; i++) {
      var randomItem = getRandom(0, rangeMax);
      if (result.indexOf(randomItem) < 0) {
        result.push(randomItem);
      }
      if (i > rangeMax) {
        break;
      }
    }
    return result;
  };

  var getRandomElements = function (data, number) {
    var randomIndex = getRandomDigitalRange(data.length, number);
    var result = [];
    for (var i = 0; i < randomIndex.length; i++) {
      result.push(data[randomIndex[i]]);
    }
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
