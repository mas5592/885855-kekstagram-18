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

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    getRandom: getRandom,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    addEventHandler: addEventHandler
  };
})();
