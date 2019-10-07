'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var getRandom = function (min, max) {
    var result = Math.random() * (max - min) + min;
    return Number(result.toFixed(0));
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    getRandom: getRandom,
  };
})();
