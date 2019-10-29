'use strict';

(function () {

  var imgPreview = window.form.formImgEditing.querySelector('.img-upload__preview');
  var scaleControlValue = window.form.formImgEditing.querySelector('.scale__control--value');
  var scale = document.querySelector('.scale');
  var MOVE = 25;
  var MIN__SCALE = 25;
  var MAX_SCALE = 100;

  var resetScaleControlValue = function () {
    scaleControlValue.value = '100%';
    resizeImage(100);
  };

  var resizeImage = function (value) {
    imgPreview.style.transform = 'scale' + '(' + value / 100 + ')';
  };

  var onScaleControlValue = function (evt) {
    var changeScaleControlValue = parseInt(scaleControlValue.value, 10);


    if (evt.target.classList.contains('scale__control--bigger')) {
      if (changeScaleControlValue >= MIN__SCALE && changeScaleControlValue < MAX_SCALE) {
        changeScaleControlValue += MOVE;
      }
    } else if (evt.target.classList.contains('scale__control--smaller')) {
      if (changeScaleControlValue > MIN__SCALE && changeScaleControlValue <= MAX_SCALE) {
        changeScaleControlValue -= MOVE;
      }
    }

    scaleControlValue.value = changeScaleControlValue + '%';
    imgPreview.style.transform = 'scale(' + changeScaleControlValue / 100 + ')';
  };

  scale.addEventListener('click', onScaleControlValue);

  window.scale = {
    imgPreview: imgPreview,
    resetScaleControlValue: resetScaleControlValue,
  };
})();
