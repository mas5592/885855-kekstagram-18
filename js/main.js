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
      url: generateUrl(i),
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


// Открытие окна с загруженным фото
var openPopup = function () {
  formImgEditing.classList.remove('hidden');
  document.addEventListener('keydown', onEscPress);
};
// Закрытие окна с загруженным фото
var closePopup = function () {
  formImgEditing.classList.add('hidden');
  document.removeEventListener('keydown', onEscPress);
};
// Закрытие с помощью esc
var onEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
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
var scaleValue = {
  min: 25,
  max: 100,
  step: 25
};

scaleControlValue.value = scaleValue.max + '%';

var imgScarle = function (directionScale) {
  var scale = parseInt(scaleControlValue.value, 10);
  scale = scale + (scaleValue.step * directionScale);
  if (scale >= scaleValue.min && scale <= scaleValue.max) {
    scaleControlValue.value = scale + '%';
    imgPreview.style.transform = 'scale(' + scale / 100 + ')';
  }
};

scaleControlSmaller.addEventListener('click', function () {
  imgScarle(-1);
});

scaleControlBigger.addEventListener('click', function () {
  imgScarle(1);
});
// Применение эффектов
var effectNames = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];// Название эффектов
var effectRadio = document.querySelectorAll('.effects__radio');// input наложения эффекта на изображение
var effectLevelPin = document.querySelector('.effect-level__pin');// Кнопка изменения глубины эффекта фотографии
var effectLevel = document.querySelector('.effect-level');// Изменение глубины эффекта
var currentFilter;// текущий фильтр
var effectsСatalogFilter;// фильтр каталога эффектов
// Задаем функции для эффектов
var settingNone = function () {
  effectLevel.classList.add('hidden');
};
var settingChrome = function (grayScale) {
  imgPreview.style.filter = 'grayscale(' + grayScale + ')';
};
var settingSepia = function (sepia) {
  imgPreview.style.filter = 'sepia(' + sepia + ')';
};
var settingMarvin = function (invert) {
  imgPreview.style.filter = 'invert(' + invert * 100 + '%)';
};
var settingPhobos = function (blur) {
  imgPreview.style.filter = 'blur(' + blur * 5 + 'px)';
};
var settingHeat = function (brightness) {
  imgPreview.style.filter = 'brightness(' + (brightness * 2 + 1) + ')';
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
var addEffectListClickHandler = function (effects, effectName) {
  effects.addEventListener('click', function () {
    if (currentFilter) {
      effectLevel.style.left = 100 + '%';
      effectLevelDepth.style.width = 100 + '%';
      effectLevel.classList.remove('hidden');
      imgPreview.classList.remove(currentFilter);
      currentFilter = 'effects__preview--' + effectName;
      imgPreview.classList.add(currentFilter);
      imgPreview.classList.remove(currentFilter);
      effectLevel.classList.remove('hidden');
    }
    effectsСatalogFilter = effectName;
    if (effectName === 'none') {
      effectsСatalog.none();
    }
  });
};

for (var j = 0; j < effectRadio.length; j++) {
  addEffectListClickHandler(effectRadio[j], effectNames[j]);
}
// Оживление ползунка
var effectLevelDepth = document.querySelector('.effect-level__depth');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelValue = document.querySelector('.effect-level__value');
var WIDTH_SCALE = 450;

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
    var coordsPin = movePin + 'px';

    if (movePin >= 0 && movePin <= WIDTH_SCALE) {
      effectLevelPin.style.left = coordsPin;
      effectLevelDepth.style.width = coordsPin;
      var slidereffectLevel = effectLevelPin.offsetLeft / effectLevelLine.offsetWidth;
      effectsСatalog[effectsСatalogFilter](slidereffectLevel);
      effectLevelValue.value = slidereffectLevel * 100;
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
