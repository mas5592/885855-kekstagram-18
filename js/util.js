'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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
    for (var i = 0; i <= elements.length - 1; i++) {
      elements[i].addEventListener(event, handler);
    }
  };

  var removeChildElements = function (elements, block) {
    for (var i = 0; i < elements.length; i++) {
      block.removeChild(elements[i]);
    }
  };

  var mixArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  var removeClassBlockArray = function (elements, cssClass) {
    elements.forEach(function (element) {
      element.classList.remove(cssClass);
    });
  };
  var DEBOUNCE_INTERVAL = 500;

  var debounce = function (cb) {
    var lastTimeout = null;

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
    var randomIndex = getRandomDigitalRange(data.length - 1, number);
    var result = [];
    for (var i = 0; i <= randomIndex.length - 1; i++) {
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
    mixArray: mixArray,
    debounce: debounce,
    getRandomElements: getRandomElements
  };
})();
