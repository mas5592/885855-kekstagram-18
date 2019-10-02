'use strict';
var USER_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
// Имена взяты из проекта "Код и магия"
var USER_NAME = [
  'Иван',
  'Хуан',
  'Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'];
var pictures = document.querySelector('.pictures');
var template = document.querySelector('#picture').content.querySelector('.picture');

var getRandom = function (min, max) {
  var result = Math.random() * (max - min) + min;
  return Number(result.toFixed(0));
};
// Генерируем адрес картинки
var generateUrl = function (number) {
  return 'photos/' + number + '.jpg';
};
// Генерируем список комментариев, оставленных другими пользователями под фотографией
var generateComments = function (number, textData, nameData) {
  var result = [];
  for (var i = 0; i < number; i++) {
    var message = textData[getRandom(0, textData.length - 1)];
    if (getRandom(0, 1)) {
      message += ' ' + textData[getRandom(0, textData.length - 1)];
    }
    result.push({
      avatar: 'img/avatar-' + getRandom(1, 6) + '.svg',
      message: message,
      name: nameData[getRandom(0, nameData.length - 1)]
    });
  }
  return result;
};
// Создаем массив для изображения
var generateData = function (number) {
  var result = [];
  for (var i = 1; i <= number; i++) {
    result.push({
      url: generateUrl(i + 1),
      likes: getRandom(15, 200),
      comments: generateComments(getRandom(1, 10), USER_COMMENTS, USER_NAME)
    });
  }
  return result;
};
// Получаем изображение
var generatePicture = function (dataPicture) {
  var picture = template.cloneNode(true);
  picture.querySelector('.picture__img').src = dataPicture.url;
  picture.querySelector('.picture__likes').textContent = dataPicture.likes;
  picture.querySelector('.picture__comments').textContent = dataPicture.comments.length;
  return picture;
};
// Выводим результаты
var renderPictures = function (dataPicture) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i <= dataPicture.length - 1; i++) {
    fragment.appendChild(generatePicture(dataPicture[i]));
  }
  pictures.appendChild(fragment);
};

renderPictures(generateData(25));

var ESC_KEYCODE = 27;
var formImgEditing = document.querySelector('.img-upload__overlay');// Форма редактирования изображения
var imgUploadInput = document.querySelector('.img-upload__input');// input изначальное состояние поля для загрузки изображения
var btnCloseImgEditing = formImgEditing.querySelector('.img-upload__cancel');// Кнопка для закрытия формы редактирования изображения
var textDescription = document.querySelector('.text_description');
// Открытие окна с загруженным фото
var openPopup = function () {
  formImgEditing.classList.remove('hidden');
  effectLevel.classList.add('hidden');
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  settingNone(); // Сбрасывает эффект значения при вторичном открытии изображения
  document.addEventListener('keydown', onEscPress);
  hashtagsInput.addEventListener('change', onValidateFormHashtag);
};
// Закрытие окна с загруженным фото
var closePopup = function () {
  formImgEditing.classList.add('hidden');
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  document.removeEventListener('keydown', onEscPress);
  resetScaleControlValue();
  hashtagsInput.addEventListener('change', onValidateFormHashtag);
};
// Закрытие с помощью esc
var onEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== textDescription && document.activeElement !== hashtagsInput) {
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
// Изменение масштаба изображения
var imgPreview = formImgEditing.querySelector('.img-upload__preview');// Предварительный просмотр изображения
var scaleControlSmaller = formImgEditing.querySelector('.scale__control--smaller');// Уменьшение размера изображения
var scaleControlBigger = formImgEditing.querySelector('.scale__control--bigger');// Увеличение размера изображения
var scaleControlValue = formImgEditing.querySelector('.scale__control--value');// value 55 пр.

// Преобразование цифрового значения в строку с процентами
var changeSizePreview = function (value) {
  imgPreview.style.transform = 'scale' + '(' + value / 100 + ')';
};

// Сброс масштаба Preview
var resetScaleControlValue = function () {
  scaleControlValue.value = '100%';
  changeSizePreview(100);
};
// Увеличение или уменьшение масштаба
var changeImgScale = function (directionScale) {
  var currentControlValue = parseInt(scaleControlValue.value, 10);
  if (currentControlValue + directionScale <= 100 && currentControlValue + directionScale >= 25) {
    var result = currentControlValue + directionScale;
    changeSizePreview(result);
    scaleControlValue.value = result + '%';
  }
};

var onScaleControlBiggerClick = function () {
  changeImgScale(25);
};

var onScaleControlSmallerClick = function () {
  changeImgScale(-25);
};
// Применение эффектов
var effectNames = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];// Название эффектов
var effectRadio = document.querySelectorAll('.effects__radio');// input наложения эффекта на изображение
var effectLevelPin = document.querySelector('.effect-level__pin');// Кнопка изменения глубины эффекта фотографии
var effectLevel = document.querySelector('.effect-level');// Изменение глубины эффекта
var currentFilter;// текущий фильтр
var effectsСatalogFilter;// фильтр каталога эффектов
var FILTER_ORIGINAL = 'none';
var FILTER_PERCENT = 100;
var FILTER_PHOBOS_BLUR = 3;
var FILTER_HEAT_BRIGHTNESS = 2;
var MAX_LEVEL = 1;
// Задаем функции для эффектов
var settingNone = function () {
  imgPreview.style.filter = FILTER_ORIGINAL;
  effectRadio[0].checked = true;
};
var settingChrome = function (grayScale) {
  imgPreview.style.filter = 'grayscale(' + grayScale + ')';
};
var settingSepia = function (sepia) {
  imgPreview.style.filter = 'sepia(' + sepia + ')';
};
var settingMarvin = function (invert) {
  imgPreview.style.filter = 'invert(' + invert * FILTER_PERCENT + '%)';
};
var settingPhobos = function (blur) {
  imgPreview.style.filter = 'blur(' + blur * FILTER_PHOBOS_BLUR + 'px)';
};
var settingHeat = function (brightness) {
  imgPreview.style.filter = 'brightness(' + (brightness * FILTER_HEAT_BRIGHTNESS + 1) + ')';
};
// Задаем объект с функциями эффектов
var effectsСatalog = {
  none: settingNone,
  chrome: settingChrome,
  sepia: settingSepia,
  marvin: settingMarvin,
  phobos: settingPhobos,
  heat: settingHeat
};
// Применяем эффекты для изображений
var getSliderValue = function (value) {
  effectLevelPin.style.left = value + '%';
  effectLevelDepth.style.width = value + '%';
  effectLevelValue.value = Math.round(value);
};

var addClickHandler = function (effects, effectName) {
  effects.addEventListener('click', function () {
    getSliderValue(FILTER_PERCENT);
    imgPreview.classList.remove(currentFilter);
    currentFilter = 'effects__preview--' + effectName;
    imgPreview.classList.add(currentFilter);
    effectsСatalogFilter = effectName;
    effectLevel.classList.toggle('hidden', effectsСatalogFilter === FILTER_ORIGINAL);
    effectsСatalog[effectsСatalogFilter](MAX_LEVEL);
  });
};

for (var j = 0; j < effectRadio.length; j++) {
  addClickHandler(effectRadio[j], effectNames[j]);
}

// Оживление ползунка
var effectLevelDepth = document.querySelector('.effect-level__depth');
var effectLevelValue = document.querySelector('.effect-level__value');
var WIDTH_SCALE = 450;

var getEffectLevl = function (level) {
  effectsСatalog[effectsСatalogFilter](level / 100);
};

effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX
    };

    startCoords = {
      x: moveEvt.clientX
    };

    var movePin = effectLevelPin.offsetLeft - shift.x;

    if (movePin >= 0 && movePin <= WIDTH_SCALE) {
      var coordsPercent = movePin / WIDTH_SCALE;
      var valuePin = coordsPercent * FILTER_PERCENT;

      getSliderValue(valuePin);
      getEffectLevl(valuePin);
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
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
