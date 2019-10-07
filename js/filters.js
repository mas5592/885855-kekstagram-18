'use strict';

(function () {
  // Применение эффектов
  var effectNames = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];// Название эффектов
  var effectRadio = document.querySelectorAll('.effects__radio');// input наложения эффекта на изображение
  var effectLevelPin = document.querySelector('.effect-level__pin');// Кнопка изменения глубины эффекта фотографии
  var effectLevel = document.querySelector('.effect-level');// Изменение глубины эффекта
  var currentFilter;// текущий фильтр
  var effectsСatalogFilter;// фильтр каталога эффектов
  var FILTER_ORIGINAL = 'none';
  var FILTER_PERCENT = 100;
  var FILTER_PHOBOS_BLUR = 3;
  var FILTER_HEAT_BRIGHTNESS = 2;
  var MAX_LEVEL = 1;
  // Задаем функции для эффектов
  var settingNone = function () {
    window.scale.imgPreview.style.filter = FILTER_ORIGINAL;
    effectRadio[0].checked = true;
  };
  var settingChrome = function (grayScale) {
    window.scale.imgPreview.style.filter = 'grayscale(' + grayScale + ')';
  };
  var settingSepia = function (sepia) {
    window.scale.imgPreview.style.filter = 'sepia(' + sepia + ')';
  };
  var settingMarvin = function (invert) {
    window.scale.imgPreview.style.filter = 'invert(' + invert * FILTER_PERCENT + '%)';
  };
  var settingPhobos = function (blur) {
    window.scale.imgPreview.style.filter = 'blur(' + blur * FILTER_PHOBOS_BLUR + 'px)';
  };
  var settingHeat = function (brightness) {
    window.scale.imgPreview.style.filter = 'brightness(' + (brightness * FILTER_HEAT_BRIGHTNESS + 1) + ')';
  };
  // Задаем объект с функциями эффектов
  var effectsСatalog = {
    none: settingNone,
    chrome: settingChrome,
    sepia: settingSepia,
    marvin: settingMarvin,
    phobos: settingPhobos,
    heat: settingHeat
  };
  // Применяем эффекты для изображений
  var getSliderValue = function (value) {
    effectLevelPin.style.left = value + '%';
    effectLevelDepth.style.width = value + '%';
    effectLevelValue.value = Math.round(value);
  };

  var addClickHandler = function (effects, effectName) {
    effects.addEventListener('click', function () {
      getSliderValue(FILTER_PERCENT);
      window.scale.imgPreview.classList.remove(currentFilter);
      currentFilter = 'effects__preview--' + effectName;
      window.scale.imgPreview.classList.add(currentFilter);
      effectsСatalogFilter = effectName;
      effectLevel.classList.toggle('hidden', effectsСatalogFilter === FILTER_ORIGINAL);
      effectsСatalog[effectsСatalogFilter](MAX_LEVEL);
    });
  };

  for (var j = 0; j < effectRadio.length; j++) {
    addClickHandler(effectRadio[j], effectNames[j]);
  }

  // Оживление ползунка
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var WIDTH_SCALE = 450;

  var getEffectLevl = function (level) {
    effectsСatalog[effectsСatalogFilter](level / 100);
  };

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var movePin = effectLevelPin.offsetLeft - shift.x;

      if (movePin >= 0 && movePin <= WIDTH_SCALE) {
        var coordsPercent = movePin / WIDTH_SCALE;
        var valuePin = coordsPercent * FILTER_PERCENT;

        getSliderValue(valuePin);
        getEffectLevl(valuePin);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.filters = {
    effectLevel: effectLevel,
    settingNone: settingNone
  };
})();
