'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialCaption = bigPicture.querySelector('.social__caption');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var socialComments = bigPicture.querySelector('.social__comments');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var STEP_COMMENTS = 5;
  var MAX_AVATAR_RANDOM = 6;
  var MIN_AVATAR_RANDOM = 1;
  var START_VALUE = 0;
  var END_VALUE = 5;

  var openBigPicture = function (picture) {
    clearCommentsList();
    updateDataBigPicture(picture);
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

  var getRandomAvatar = function (min, max) {
    return 'img/avatar-' + window.util.getRandom(min, max) + '.svg';
  };

  var createComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = getRandomAvatar(MIN_AVATAR_RANDOM, MAX_AVATAR_RANDOM);
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  };

  var createComments = function (comments) {
    var fragment = document.createDocumentFragment();
    comments.forEach(function (currentItem, i) {
      var comment = createComment(currentItem);
      if (i >= STEP_COMMENTS) {
        comment.classList.add('visually-hidden');
      }
      fragment.appendChild(comment);
    });
    socialComments.appendChild(fragment);
  };

  var uploadComments = function (evt) {
    var commentElements = bigPicture.querySelectorAll('.social__comment.visually-hidden');
    [].slice.call(commentElements).slice(START_VALUE, END_VALUE).forEach(function (item) {
      item.classList.remove('visually-hidden');
    });
    if (bigPicture.querySelectorAll('.social__comment.visually-hidden').length === 0) {
      evt.target.classList.add('visually-hidden');
    }
  };

  var showCommentsCount = function (comments) {
    var displayedComments = bigPicture.querySelectorAll('.social__comment:not(.visually-hidden)').length;
    var commentsCountElement = displayedComments + ' из ' + '<span class="comments-count">' + comments.length + '</span>' + ' комментариев';
    commentsCount.innerHTML = commentsCountElement;
  };

  var updateDataBigPicture = function (picture) {
    bigPictureImg.src = picture.url;
    likesCount.textContent = picture.likes;
    socialCaption.textContent = picture.description;
    createComments(picture.comments);
    showCommentsCount(picture.comments);
    commentsLoader.addEventListener('click', uploadComments);
    commentsLoader.addEventListener('click', function () {
      showCommentsCount(picture.comments);
    });
    if (bigPicture.querySelectorAll('.social__comment.visually-hidden').length >= 1) {
      commentsLoader.classList.remove('visually-hidden');
    } else {
      commentsLoader.classList.add('visually-hidden');
    }
  };

  var clearCommentsList = function () {
    bigPicture.querySelector('.social__comments').innerHTML = '';
    commentsLoader.classList.add('visually-hidden');
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
  };

  window.bigPicture = {
    onPictureClick: onPictureClick
  };
})();
