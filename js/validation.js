'use strict';

(function () {

  // Функция валидации хэш-тегов
  var hashtagsInput = document.querySelector('.text__hashtags');
  var MAX_LENGTH_HASHTAG = 20;
  var MAX_NUMBER_HASHTAG = 5;

  // Проверка первого символа хэш-тега
  var checkFirstSymbol = function (hashtag) {
    return hashtag[0] === '#' ? true : false;
  };
  // Хэш-тег не может состоять только из решетки
  var checkMinLength = function (hashtag) {
    return (hashtag === '#') ? true : false;
  };
  // Разделение хэш-тега пробелом
  var checkDivisionSpace = function (hashtag) {
    return hashtag.indexOf('#', 1) === -1 ? true : false;
  };
  // Максимальная длина хэш-тега
  var checkMaxLength = function (arr) {
    return arr.length > MAX_LENGTH_HASHTAG ? false : true;
  };
  // Хэш-тег не повторяется дважды
  var checkSameHashtag = function (str) {
    return str.length > MAX_NUMBER_HASHTAG;
  };
  // Не больше 5 хэш-тегов
  var checkmaxNumber = function (arr) {
    return arr.length > MAX_NUMBER_HASHTAG ? false : true;
  };

  var onValidateFormHashtag = function () {
    // Использование метода split для превращения хэш-тегов в массив
    var hashtags = hashtagsInput.value.toLowerCase().split(' ').filter(function (it) {
      return it.length > 0;
    });
    // Сообщение об ошибке
    var validityMessage = '';
    // Список условий
    if (checkFirstSymbol(hashtags)) {
      validityMessage += 'Хэш-тег должен начинаться с символа # (решётка). ';
    }

    if (checkMinLength(hashtags)) {
      validityMessage += 'Хэш-тег не может состоять только из одной решётки. ';
    }

    if (checkDivisionSpace(hashtags)) {
      validityMessage += 'Хэш-теги разделяются пробелами. ';
    }

    if (checkMaxLength(hashtags)) {
      validityMessage += 'Максимальная длина одного хэш-тега 20 символов, включая решётку. ';
    }

    if (checkSameHashtag(hashtags)) {
      validityMessage += 'Один и тот же хэш-тег не может быть использован дважды. ';
    }

    if (checkmaxNumber(hashtags)) {
      validityMessage += 'Нельзя указать больше пяти хэш-тегов. ';
    }

    hashtagsInput.setCustomValidity(validityMessage);
    hashtagsInput.style.boxShadow = (validityMessage.length > 0) ? '0 0 0 4px orange' : 'none';
  };
  window.validation = {
    onValidateFormHashtag: onValidateFormHashtag,
    hashtagsInput: hashtagsInput
  };
})();
