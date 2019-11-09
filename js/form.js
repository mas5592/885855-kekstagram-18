'use strict';

(function () {
  var formImgEditing = document.querySelector('.img-upload__overlay');
  var btnCloseImgEditing = formImgEditing.querySelector('.img-upload__cancel');
  var textDescription = document.querySelector('.text__description');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var filterList = document.querySelector('.effects__list');
  var uploadFile = document.querySelector('#upload-file');
  var form = document.querySelector('.img-upload__form');

  var openPopup = function () {
    formImgEditing.classList.remove('hidden');
    filterList.addEventListener('change', window.filters.onEffectChange);
    document.addEventListener('keydown', onEscPress);
    window.filters.returnFormOnDefault();
    hashtagsInput.addEventListener('change', window.validation.onValidateFormHashtag);
  };

  var closePopup = function () {
    formImgEditing.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
    resetUploadFileValue();
    filterList.removeEventListener('click', window.filters.onEffectChange);
    hashtagsInput.removeEventListener('change', window.validation.onValidateFormHashtag);
    window.scale.resetScaleControlValue();
    form.reset();
  };

  var getActiveElement = function () {
    var activeElement;
    if (document.activeElement === textDescription) {
      activeElement = textDescription;
    }
    if (document.activeElement === hashtagsInput) {
      activeElement = hashtagsInput;
    }
    return activeElement;
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE && document.activeElement !== getActiveElement()) {
      closePopup();
    }
  };

  btnCloseImgEditing.addEventListener('click', function () {
    closePopup();
  });

  uploadFile.addEventListener('change', function () {
    openPopup();
    window.imgUpload.onFileChooserChange();
  });

  var resetUploadFileValue = function () {
    uploadFile.value = null;
  };

  window.form = {
    formImgEditing: formImgEditing,
    closePopup: closePopup
  };
})();
