'use strict';

(function () {
  // Изменение масштаба изображения
  var imgPreview = window.form.formImgEditing.querySelector('.img-upload__preview');
  var scaleControlSmaller = window.form.formImgEditing.querySelector('.scale__control--smaller');
  var scaleControlBigger = window.form.formImgEditing.querySelector('.scale__control--bigger');
  var scaleControlValue = window.form.formImgEditing.querySelector('.scale__control--value');
  var MAX_SCALE = 100;
  var MOVE = 25;

  scaleControlValue.setAttribute('value', '100%');// Изменяем значение атрибута с помощью элемента setAttribute

  var changeScaleControlValue = parseInt(scaleControlValue.getAttribute('value'), 10); // parseInt принимает строку в качестве аргумента, getAttribute возвращает значение указанному атрибуту

  function resizeImage(value) {
    imgPreview.style.transform = 'scale(' + value / 100 + ')';
  }

  function changeValue(value, step) {
    if (step && value < MAX_SCALE) {
      value += MOVE;
    } else
    if (!step && value > MOVE) {
      value -= MOVE;
    }
    resizeImage(value);
    changeScaleControlValue = value;
    scaleControlValue.setAttribute('value', value + '%');
  }

  scaleControlBigger.addEventListener('click', function () {
    // evt.preventDefault(); // Метод сообщет, что если событие не обрабатывается явно, его действие по умолчанию не должно выполняться так, как обычно.
    changeValue(changeScaleControlValue, true);
  });

  scaleControlSmaller.addEventListener('click', function () {
    // evt.preventDefault();
    changeValue(changeScaleControlValue, false);
  });

  window.scale = {
    imgPreview: imgPreview
  };
})();
