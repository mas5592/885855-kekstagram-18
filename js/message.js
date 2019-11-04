'use strict';

(function () {

  var formImgEditing = document.querySelector('.img-upload__overlay');
  var form = document.querySelector('.img-upload__form');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var openSuccessMessage = function () {
    var successItem = successTemplate.cloneNode(true);

    window.form.closePopup();
    document.body.appendChild(successItem);

    var onClickSucess = function () {
      document.body.removeChild(successItem);
      document.removeEventListener('keydown', onEscSucess);
    };
    var onEscSucess = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        document.body.removeChild(successItem);
        document.removeEventListener('keydown', onEscSucess);
      }
    };

    successItem.addEventListener('click', onClickSucess);
    document.addEventListener('keydown', onEscSucess);
  };

  var openErrorMessage = function (onError) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__title').textContent = onError;
    document.body.appendChild(errorElement);
    formImgEditing.classList.add('hidden');

    var submitButton = errorElement.querySelector('.error__buttons').firstElementChild;

    var onClickError = function () {
      document.body.removeChild(errorElement);
      window.form.closePopup();
      document.removeEventListener('keydown', onEscError);
    };

    var onEscError = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        document.body.removeChild(errorElement);
        window.form.closePopup();
        document.removeEventListener('keydown', onEscError);
      }
    };

    submitButton.addEventListener('click', function () {
      formImgEditing.classList.remove('hidden');
      document.body.removeChild(errorElement);
      errorElement.removeEventListener('click', onClickError);
      document.removeEventListener('keydown', onEscError);
    });

    errorElement.addEventListener('click', onClickError);
    document.addEventListener('keydown', onEscError);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), openSuccessMessage, openErrorMessage);
    evt.preventDefault();
  });

})();
