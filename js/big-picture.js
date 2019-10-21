'use strict';

(function () {
  // Создаём элементы для комментариев

  var socialComments = document.querySelector('.social__comments');

  var createCommentElement = function (comment) {
    var fragment = document.createDocumentFragment();
    var liForComment = document.querySelector('.social__comment');

    for (var i = 0; i < comment; i++) {
      var commentElement = liForComment.cloneNode(true);
      commentElement.querySelector('.social__picture').src = window.data[0].comments[i].avatar;
      commentElement.querySelector('.social__text').textContent = window.data[0].comments[i].message;

      fragment.appendChild(commentElement);
    }
    socialComments.appendChild(fragment);
  };

  // Показываем большое фото

  var bigPicture = document.querySelector('.big-picture');

  var dataBigPicture = function (picture) {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
    bigPicture.querySelector('img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    createCommentElement(picture.comments.length);
  };

  var pictureItems = document.querySelectorAll('.picture');

  var addBigPicture = function (pictureItem, picture) {
    pictureItem.addEventListener('click', function () {
      dataBigPicture(picture);
    });
  };

  for (var i = 0; i < pictureItems.length; i++) {
    addBigPicture(pictureItems[i]);
  }

  var bigPictureCansel = document.querySelector('#picture-cancel');

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  bigPictureCansel.addEventListener('click', function () {
    closeBigPicture();
  });

  var commentCount = document.querySelector('.social__comment-count');
  var commentLoad = document.querySelector('.comments-loader');

  commentCount.classList.add('visually-hidden');
  commentLoad.classList.add('visually-hidden');
})();
