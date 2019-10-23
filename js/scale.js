'use strict';

(function () {

  var imgPreview = window.form.formImgEditing.querySelector('.img-upload__preview');
  var scaleControlSmaller = window.form.formImgEditing.querySelector('.scale__control--smaller');
  var scaleControlBigger = window.form.formImgEditing.querySelector('.scale__control--bigger');
  var scaleControlValue = window.form.formImgEditing.querySelector('.scale__control--value');
  var MAX_SCALE = 100;
  var MOVE = 25;

  scaleControlValue.setAttribute('value', '100%');

  var resetScaleControlValue = function () {
    scaleControlValue.setAttribute('value', MAX_SCALE + '%');
    resizeImage(100);
  };

  var changeScaleControlValue = parseInt(scaleControlValue.getAttribute('value'), 10);

  var resizeImage = function (value) {
    imgPreview.style.transform = 'scale' + '(' + value / 100 + ')';
  };

  var changeValue = function (value, step) {

    if (step && value < MAX_SCALE) {
      value += MOVE;
    } else
    if (!step && value > MOVE) {
      value -= MOVE;
    }

    resizeImage(value);
    changeScaleControlValue = value;
    scaleControlValue.setAttribute('value', value + '%');
  };

  scaleControlBigger.addEventListener('click', function () {
    changeValue(changeScaleControlValue, true);
  });

  scaleControlSmaller.addEventListener('click', function () {
    changeValue(changeScaleControlValue, false);
  });

  window.scale = {
    imgPreview: imgPreview,
    resetScaleControlValue: resetScaleControlValue
  };
})();
