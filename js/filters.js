'use strict';

(function () {
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var FILTER_DEFAULT_VALUE = 100;
  var imgUploadPreview = document.querySelector('.img-upload__preview ');
  var currentFilter = null;
  var filterRange = document.querySelector('.img-upload__effect-level');

  var editorFormOnDefault = function () {
    imgUploadPreview.style = '';
    imgUploadPreview.className = 'img-upload__effect-level';
    filterRange.classList.add('hidden');
  };

  var resetEffectLevelValue = function () {
    effectLevelValue.setAttribute('value', FILTER_DEFAULT_VALUE);
  };

  var resetImageClassList = function () {
    imgUploadPreview.classList = 'img-upload__preview';
  };

  var switcher = function (prop) {
    switch (currentFilter) {
      case 'chrome':
        imgUploadPreview.style.filter = 'grayscale(' + prop + ')';
        break;
      case 'sepia':
        imgUploadPreview.style.filter = 'sepia(' + prop + ')';
        break;
      case 'marvin':
        imgUploadPreview.style.filter = 'invert(' + prop * 100 + '%)';
        break;
      case 'phobos':
        imgUploadPreview.style.filter = 'blur(' + (3 * prop).toFixed(2) + 'px)';
        break;
      case 'heat':
        imgUploadPreview.style.filter = 'brightness(' + (1 + 2 * prop) + ')';
        break;
      default:
        resetImageClassList();
        imgUploadPreview.style.filter = '';
    }
  };

  var rebootFilter = function () {
    resetEffectLevelValue();
    resetImageClassList();
    effectLevelPin.style.left = effectLevelPin.parentNode.offsetWidth + 'px';
    effectLevelDepth.style.width = effectLevelPin.parentNode.offsetWidth + 'px';
  };

  var filterHandler = function (evt) {
    if (window.util.isEnterEvent(evt)) {
      evt.preventDefault();
    }
    var value = evt.target.value;
    if (value === 'none') {
      filterRange.classList.add('hidden');
    } else {
      filterRange.classList.remove('hidden');
    }
    rebootFilter();

    var className = 'effects__preview--' + value;
    imgUploadPreview.classList.add(className);
    currentFilter = value;

    var prop = FILTER_DEFAULT_VALUE / 100;
    switcher(prop);
  };


  var effectLevelPinMouseDownHandler = function (downEvt) {
    downEvt.preventDefault();

    var startPosition = downEvt.clientX;

    var filterLineWidth = effectLevelPin.parentNode.offsetWidth;

    var value = (effectLevelPin.offsetLeft / filterLineWidth).toFixed(2) * 100;
    effectLevelValue.setAttribute('value', value);
    var prop = value / 100;
    switcher(prop);

    var effectLevelPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var valueAtMoveMoment = (effectLevelPin.offsetLeft / filterLineWidth).toFixed(2) * 100;
      effectLevelValue.setAttribute('value', valueAtMoveMoment);
      var propAtMoveMoment = valueAtMoveMoment / 100;
      switcher(propAtMoveMoment);

      var shift = startPosition - moveEvt.clientX;

      startPosition = moveEvt.clientX;

      var newPinPosition = effectLevelPin.offsetLeft - shift;

      var isInvalidNewPinPosition = newPinPosition < 0 || newPinPosition > filterLineWidth;
      if (isInvalidNewPinPosition) {
        effectLevelPin.style.left = effectLevelPin.style.left + 'px';
        effectLevelDepth.style.width = effectLevelDepth.style.width + 'px';
      } else {
        effectLevelPin.style.left = newPinPosition + 'px';
        effectLevelDepth.style.width = newPinPosition + 'px';
      }
      effectLevelPin.addEventListener('mouseout', effectLevelPinMouseUpHandler);
    };

    var effectLevelPinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      var valueAtUpMoment = (effectLevelPin.offsetLeft / filterLineWidth).toFixed(2) * 100;
      effectLevelValue.setAttribute('value', valueAtUpMoment);
      var propAtUpMoment = valueAtUpMoment / 100;
      switcher(propAtUpMoment);
      effectLevelPin.removeEventListener('mousemove', effectLevelPinMouseMoveHandler);
      effectLevelPin.removeEventListener('mouseup', effectLevelPinMouseUpHandler);
      effectLevelPin.removeEventListener('mouseout', effectLevelPinMouseUpHandler);
    };
    effectLevelPin.addEventListener('mousemove', effectLevelPinMouseMoveHandler);
    effectLevelPin.addEventListener('mouseup', effectLevelPinMouseUpHandler);
  };

  var inputKeydownHandler = new Event('change', {bubbles: true});
  var filterListKeydownHandler = function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      evt.preventDefault();
      var inputName = evt.target.getAttribute('for');
      var selector = '#' + inputName;
      var input = document.querySelector(selector);
      input.checked = true;
      input.dispatchEvent(inputKeydownHandler);
    }
  };

  window.filters = {
    effectLevelPin: effectLevelPin,
    effectLevelPinMouseDownHandler: effectLevelPinMouseDownHandler,
    rebootFilter: rebootFilter,
    filterHandler: filterHandler,
    filterRange: filterRange,
    filterListKeydownHandler: filterListKeydownHandler,
    editorFormOnDefault: editorFormOnDefault
  };
})();
