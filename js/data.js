'use strict';
(function () {
  var picturesBlock = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var uploadedImages = [];

  var generatePicture = function (dataPicture) {
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = dataPicture.url;
    picture.querySelector('.picture__likes').textContent = dataPicture.likes;
    picture.querySelector('.picture__comments').textContent = dataPicture.comments.length;
    picture.addEventListener('click', window.bigPicture.onPictureClick);
    return picture;
  };

  var removePicture = function () {
    window.util.removeChildElements(picturesBlock.querySelectorAll('.picture'), picturesBlock);
  };

  var renderPictures = function (dataPicture) {
    removePicture();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i <= dataPicture.length - 1; i++) {
      fragment.appendChild(generatePicture(dataPicture[i]));
    }
    picturesBlock.appendChild(fragment);
  };

  var onLoadPicture = function (images) {
    window.data.uploadedImages = images;
    renderPictures(images);
    window.sorting.showSortButtons();
  };

  window.backend.load(onLoadPicture);

  window.data = {
    uploadedImages: uploadedImages,
    renderPictures: renderPictures
  };
})();
