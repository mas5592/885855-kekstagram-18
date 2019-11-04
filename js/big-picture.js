'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialCaption = bigPicture.querySelector('.social__caption');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var pictureComments;

  var openBigPicture = function (picture) {
    dataBigPicture(picture);
    document.addEventListener('keydown', onBigPictureEscPress);
    bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
    commentsLoader.addEventListener('click', onShowMoreClick);
    bigPicture.classList.remove('hidden');
    commentsLoader.focus();
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

  var onBigPictureCancelClick = function (evt) {
    evt.preventDefault();
    closeBigPicture();
  };

  var createCommentAvatar = function () {
    var result = document.createElement('img');
    result.classList.add('social__picture');
    result.src = 'img/avatar-' + window.util.getRandom(1, 6) + '.svg';
    result.alt = 'Аватар автора фотографии';
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
    var avatar = createCommentAvatar();
    var textComment = createCommentText(comment.message);
    result.classList.add('social__comment');
    result.appendChild(avatar);
    result.appendChild(textComment);
    return result;
  };

  var toggleCommentsLoader = function (commentsDisplayed) {
    if (pictureComments.length <= commentsDisplayed.length) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
  };

  var updateSocialCommentCount = function (commentsDisplayed) {
    socialCommentCount.textContent = commentsDisplayed.length + ' из ' + pictureComments.length + ' комментариев';
  };

  var updateControls = function () {
    var commentsDisplayed = socialComments.querySelectorAll('.social__comment');
    toggleCommentsLoader(commentsDisplayed);
    updateSocialCommentCount(commentsDisplayed);
  };

  var createComments = function (commentsData) {
    var commentsElements = document.createDocumentFragment();
    for (var i = commentsData; i <= commentsData + 4; i++) {
      if (i > pictureComments.length - 1) {
        break;
      }
      var comment = createComment(pictureComments[i]);
      commentsElements.appendChild(comment);
    }
    socialComments.appendChild(commentsElements);
    updateControls();
  };

  var dataBigPicture = function (picture) {
    bigPictureImg.src = picture.url;
    likesCount.textContent = picture.likes;
    commentsCount.textContent = picture.comments.length;
    socialCaption.textContent = picture.description;
    window.util.removeChildElements(socialComments.querySelectorAll('.social__comment'), socialComments);
    pictureComments = picture.comments;
    createComments(0);
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

  var onShowMoreClick = function (evt) {
    evt.preventDefault();
    var allCommentsPage = socialComments.querySelectorAll('.social__comment');
    createComments(allCommentsPage.length);
  };

  window.bigPicture = {
    onPictureClick: onPictureClick
  };
})();
