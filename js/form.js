'use strict';

(function () {
  var formImgEditing = document.querySelector('.img-upload__overlay');
  var imgUploadInput = document.querySelector('.img-upload__input');
  var btnCloseImgEditing = formImgEditing.querySelector('.img-upload__cancel');
  var textDescription = document.querySelector('.text_description');
  var filterList = document.querySelector('.effects__list');


  var openPopup = function () {
    formImgEditing.classList.remove('hidden');
    filterList.addEventListener('change', window.filters.filterHandler);
    filterList.addEventListener('keydown', window.filters.filterListKeydownHandler);
    window.filters.filterRange.classList.add('hidden');
    window.filters.effectLevelPin.addEventListener('mousedown', window.filters.effectLevelPinMouseDownHandler);
    document.addEventListener('keydown', onEscPress);
    window.validation.hashtagsInput.addEventListener('change', window.validation.onValidateFormHashtag);
    window.filters.editorFormOnDefault();
  };


  var closePopup = function () {
    formImgEditing.classList.add('hidden');
    imgUploadInput.value = null;
    filterList.removeEventListener('change', window.filters.filterHandler);

    window.filters.effectLevelPin.removeEventListener('mousedown', window.filters.effectLevelPinMouseDownHandler);

    document.removeEventListener('keydown', onEscPress);

  };

  var onEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE && document.activeElement !== textDescription && document.activeElement !== window.validation.hashtagsInput) {
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
