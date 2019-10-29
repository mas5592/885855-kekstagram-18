'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialCaption = bigPicture.querySelector('.social__caption');
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var openBigPicture = function (picture) {
    dataBigPicture(picture);
    document.addEventListener('keydown', onBigPictureEscPress);
    bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
    socialCommentCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
    bigPicture.classList.remove('hidden');
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
    bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var onBigPictureCancelClick = function () {
    closeBigPicture();
  };

  var createCommentatorAvatar = function () {
    var result = document.createElement('img');
    result.classList.add('social__picture');
    result.src = 'img/avatar-' + window.util.getRandom(1, 6) + '.svg';
    result.alt = 'Аватар комментатора';
    result.width = '35';
    result.height = '35';
    return result;
  };

  var createCommentText = function (text) {
    var result = document.createElement('p');
    result.classList.add('social__text');
    result.textContent = text;
    return result;
  };

  var createComment = function (comment) {
    var result = document.createElement('li');
    var avatar = createCommentatorAvatar();
    var textComment = createCommentText(comment.message);
    result.classList.add('social__comment');
    result.appendChild(avatar);
    result.appendChild(textComment);
    return result;
  };

  var createComments = function (commentsData) {
    window.util.removeChildElements(socialComments.querySelectorAll('.social__comment'), socialComments);
    var commentsElements = document.createDocumentFragment();
    for (var i = 0; i <= commentsData.length - 1; i++) {
      commentsElements.appendChild(createComment(commentsData[i]));
    }
    socialComments.appendChild(commentsElements);
  };

  var dataBigPicture = function (picture) {
    bigPictureImg.src = picture.url;
    likesCount.textContent = picture.likesCount;
    commentsCount.textContent = picture.comments.length;
    socialCaption.textContent = picture.description;
    createComments(picture.comments);
  };

  var findDataPicture = function (target) {
    var desiredUrl = target.src.substring(target.src.indexOf('photos'));
    var dataPicture = window.data.uploadedImages.find(function (element) {
      return element.url === desiredUrl;
    }) || window.data.uploadedImages[0];
    return dataPicture;
  };

  var onPictureClick = function (evt) {
    evt.preventDefault();
    openBigPicture(findDataPicture(evt.currentTarget.querySelector('.picture__img')));
  };

  window.bigPicture = {
    onPictureClick: onPictureClick
  };
})();
