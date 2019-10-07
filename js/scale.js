'use strict';

(function () {
  // Изменение масштаба изображения
  var imgPreview = window.form.formImgEditing.querySelector('.img-upload__preview');// Предварительный просмотр изображения
  var scaleControlSmaller = window.form.formImgEditing.querySelector('.scale__control--smaller');// Уменьшение размера изображения
  var scaleControlBigger = window.form.formImgEditing.querySelector('.scale__control--bigger');// Увеличение размера изображения
  var scaleControlValue = window.form.formImgEditing.querySelector('.scale__control--value');// value 55 пр.
  var MAX_SIZE = 100;
  var MIN_SIZE = 25;

  scaleControlValue.value = '100%';

  scaleControlBigger.addEventListener('click', function () {
    scaleControlValue.value = parseInt(scaleControlValue.value, 10) + 25;
    scaleControlValue.value = scaleControlValue.value <= MAX_SIZE ? scaleControlValue.value + '%' : MAX_SIZE + '%';
    imgPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / 100 + ')';
  });

  scaleControlSmaller.addEventListener('click', function () {
    scaleControlValue.value = parseInt(scaleControlValue.value, 10) - 25;

    if (scaleControlValue.value >= MIN_SIZE) {
      scaleControlValue.value = scaleControlValue.value + '%';
    } else {
      scaleControlValue.value = 25 + '%';
    }

    imgPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / 100 + ')';
  });

  window.scale = {
    imgPreview: imgPreview
  };
})();
