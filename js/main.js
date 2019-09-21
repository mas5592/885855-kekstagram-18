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
