'use strict';
(function () {
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var generatePicture = function (dataPicture) {
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = dataPicture.url;
    picture.querySelector('.picture__likes').textContent = dataPicture.likes;
    picture.querySelector('.picture__comments').textContent = dataPicture.comments.length;
    return picture;
  };

  var renderPictures = function (dataPicture) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i <= dataPicture.length - 1; i++) {
      fragment.appendChild(generatePicture(dataPicture[i]));
    }
    pictures.appendChild(fragment);
  };

  var onLoadPicture = function (images) {
    var selectedPicture = images.splice(0, 25);
    selectedPicture = window.util.mixArray(selectedPicture);
    renderPictures(selectedPicture);
  };

  window.backend.load(onLoadPicture);
})();
