'use strict';

(function () {

  var hashtagsInput = document.querySelector('.text__hashtags');
  var uploadForm = document.querySelector('#upload-select-image');
  var MAX_LENGTH_HASHTAG = 20;
  var MAX_NUMBER_HASHTAG = 5;

  var setValidHashtagsInput = function () {
    hashtagsInput.style.outline = '';
    hashtagsInput.setCustomValidity('');
  };

  var checkFirstSymbol = function (hashtag) {
    return hashtag.some(function (it) {
      return it.charAt(0) !== '#';
    });
  };

  var checkMinLength = function (str) {
    return str.some(function (it) {
      return (it === '#') ? true : false;
    });
  };

  var checkDivisionSpace = function (str) {
    return str.some(function (it) {
      return it.lastIndexOf('#') > 0;
    });
  };

  var checkMaxLength = function (arr) {
    return arr.length > MAX_LENGTH_HASHTAG;
  };

  var checkSameHashtag = function (str) {
    return str.some(function (it, i, arr) {
      return it === arr[i + 1];
    });
  };

  var checkmaxNumber = function (arr) {
    return arr.length > MAX_NUMBER_HASHTAG;
  };

  var onValidateFormHashtag = function () {
    var hashtags = hashtagsInput.value.toLowerCase().split(' ').filter(function (it) {
      return it.length > 0;
    });
    var validityMessage = '';
    if (checkFirstSymbol(hashtags)) {
      validityMessage += 'Хэш-тег должен начинаться с символа # (решётка).';
    }
    if (checkMinLength(hashtags)) {
      validityMessage += 'Хэш-тег не может состоять только из одной решётки.';
    }
    if (checkDivisionSpace(hashtags)) {
      validityMessage += 'Хэш-теги разделяются пробелами. ';
    }
    if (checkMaxLength(hashtags)) {
      validityMessage += 'Максимальная длина одного хэш-тега 20 символов, включая решётку.';
    }
    if (checkSameHashtag(hashtags)) {
      validityMessage += 'Один и тот же хэш-тег не может быть использован дважды.';
    }
    if (checkmaxNumber(hashtags)) {
      validityMessage += 'Нельзя указать больше пяти хэш-тегов.';
    }

    if (validityMessage !== '') {
      hashtagsInput.style.outline = '3px solid red';
      hashtagsInput.setCustomValidity(validityMessage);
      return;
    }

    setValidHashtagsInput();
  };

  var inputValidationClear = function () {
    setValidHashtagsInput();
    uploadForm.reset();
  };

  window.validation = {
    onValidateFormHashtag: onValidateFormHashtag,
    hashtagsInput: hashtagsInput,
    inputValidationClear: inputValidationClear
  };
})();
