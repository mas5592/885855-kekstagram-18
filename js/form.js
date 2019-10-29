'use strict';

(function () {
  var formImgEditing = document.querySelector('.img-upload__overlay');
  var imgUploadInput = document.querySelector('.img-upload__input');
  var btnCloseImgEditing = formImgEditing.querySelector('.img-upload__cancel');
  var textDescription = document.querySelector('.text_description');
  var filterList = document.querySelector('.effects__list');

  var openPopup = function () {
    formImgEditing.classList.remove('hidden');
    filterList.addEventListener('change', window.filters.onEffectChange);
    document.addEventListener('keydown', onEscPress);
    window.filters.editorFormOnDefault();
    window.validation.hashtagsInput.addEventListener('change', window.validation.onValidateFormHashtag);
  };

  var closePopup = function () {
    formImgEditing.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
    filterList.removeEventListener('click', window.filters.onEffectChange);
    window.validation.hashtagsInput.removeEventListener('change', window.validation.onValidateFormHashtag);
    window.scale.resetScaleControlValue();
  };

  var getActiveElement = function () {
    var activeElement;
    if (document.activeElement === textDescription) {
      activeElement = textDescription;
    }
    if (document.activeElement === window.validation.hashtagsInput) {
      activeElement = window.validation.hashtagsInput;
    }
    return activeElement;
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE && document.activeElement !== getActiveElement()) {
      closePopup();
    }
  };

  imgUploadInput.addEventListener('change', function () {
    openPopup();
  });

  btnCloseImgEditing.addEventListener('click', function () {
    closePopup();
  });

  window.form = {
    formImgEditing: formImgEditing
  };
})();
