'use strict';

(function () {
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var FILTER_DEFAULT_VALUE = 100;
  var imgUploadPreview = document.querySelector('.img-upload__preview ');

  var filterRange = document.querySelector('.img-upload__effect-level');
  var effectLevel = document.querySelector('[name="effect-level"]');


  var switcher = function (value, percent) {
    switch (value) {
      case 'chrome':
        imgUploadPreview.style.filter = 'grayscale(' + 1 / 100 * percent + ')';
        break;
      case 'sepia':
        imgUploadPreview.style.filter = 'sepia(' + 1 / 100 * percent + ')';
        break;
      case 'marvin':
        imgUploadPreview.style.filter = 'invert(' + 1 * percent + '%)';
        break;
      case 'phobos':
        imgUploadPreview.style.filter = 'blur(' + 3 / 100 * percent + 'px)';
        break;
      case 'heat':
        imgUploadPreview.style.filter = 'brightness(' + 3 / 100 * percent + ')';
        break;
    }
  };

  var editorFormOnDefault = function () {
    imgUploadPreview.style = '';
    imgUploadPreview.className = 'img-upload__effect-level';
    filterRange.classList.add('hidden');
  };

  var filterHandler = function (evt) {
    if (evt) {
      filterRange.classList.remove('hidden');
    } else {
      filterRange.classList.add('hidden');
    }
  };

  var onEffectChange = function (evt) {
    if (evt.target.name === 'effect') {
      imgUploadPreview.className = 'img-upload__effect-lavel effects__preview--' + evt.target.value;
      switcher(evt.target.value, FILTER_DEFAULT_VALUE);
      filterHandler(evt.target.value !== 'none');
      effectLevel.value = FILTER_DEFAULT_VALUE;
      effectLevelDepth.style.width = FILTER_DEFAULT_VALUE + '%';
      effectLevelPin.style.left = FILTER_DEFAULT_VALUE + '%';
    }
  };

  var getX = function (elem) {
    return elem.getBoundingClientRect().left;
  };

  var FILTER_PERCENT = 100;
  var FILTER_WIDTH = effectLevelPin.offsetWidth;


  var onEffectPinMouseMove = function (moveEvt) {
    var move = moveEvt.pageX + (FILTER_WIDTH / 2) - getX(effectLevelLine);
    var newPinPosition = Math.floor(move / effectLevelLine.offsetWidth * FILTER_PERCENT);
    if (newPinPosition < 0) {
      newPinPosition = 0;
    }
    if (newPinPosition > FILTER_PERCENT) {
      newPinPosition = FILTER_PERCENT;
    }

    effectLevelPin.style.left = newPinPosition + '%';
    effectLevel.value = newPinPosition;
    effectLevelDepth.style.width = newPinPosition + '%';
    switcher(document.querySelector('.effects__radio:checked').value, newPinPosition);
    document.addEventListener('mouseup', onEffectPinMouseUp);
  };

  effectLevelPin.addEventListener('mousedown', function () {
    document.addEventListener('mousemove', onEffectPinMouseMove);
  });

  var onEffectPinMouseUp = function () {
    document.removeEventListener('mousemove', onEffectPinMouseMove);
    document.removeEventListener('mouseup', onEffectPinMouseUp);
  };

  window.filters = {
    onEffectChange: onEffectChange,
    editorFormOnDefault: editorFormOnDefault,

  };
})();
