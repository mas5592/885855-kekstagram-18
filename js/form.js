'use strict';

(function () {
  var formImgEditing = document.querySelector('.img-upload__overlay');// Форма редактирования изображения
  var imgUploadInput = document.querySelector('.img-upload__input');// input изначальное состояние поля для загрузки изображения
  var btnCloseImgEditing = formImgEditing.querySelector('.img-upload__cancel');// Кнопка для закрытия формы редактирования изображения
  var textDescription = document.querySelector('.text_description');
  // Открытие окна с загруженным фото
  var openPopup = function () {
    formImgEditing.classList.remove('hidden');
    window.filters.effectLevel.classList.add('hidden');
    window.filters.settingNone(); // Сбрасывает эффект значения при вторичном открытии изображения
    document.addEventListener('keydown', onEscPress);
    window.validation.hashtagsInput.addEventListener('change', window.validation.onValidateFormHashtag);
  };
  // Закрытие окна с загруженным фото
  var closePopup = function () {
    formImgEditing.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
  };
  // Закрытие с помощью esc
  var onEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE && document.activeElement !== textDescription && document.activeElement !== window.validation.hashtagsInput) {
      closePopup();
    }
  };
  // Открытие
  imgUploadInput.addEventListener('change', function () {
    openPopup();
  });
  // Закрытие с помощью кнопки
  btnCloseImgEditing.addEventListener('click', function () {
    closePopup();
  });

  window.form = {
    formImgEditing: formImgEditing
  };
})();
