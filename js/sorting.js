'use strict';

(function () {

  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersButton = imgFilters.querySelectorAll('.img-filters__button');
  var imgFiltersButtonActive = 'img-filters__button--active';

  var onButtonSortClick = function (evt) {
    evt.preventDefault();
    switchActiveButton(evt.target);
    switch (evt.target.id) {
      case 'filter-popular': sortPopularPictures();
        break;
      case 'filter-random': sortRandomPictures();
        break;
      case 'filter-discussed': sortDiscussedPictures();
        break;
      default: sortPopularPictures();
    }
  };

  var sortPopularPictures = window.util.debounce(function () {
    window.data.renderPictures(window.data.uploadedImages);
  });

  var sortRandomPictures = window.util.debounce(function () {
    var pictures = window.data.uploadedImages.slice();

    window.data.renderPictures(window.util.getRandomElements(pictures, 10));
  });

  var sortDiscussedPictures = window.util.debounce(function () {
    var pictures = window.data.uploadedImages.slice();

    var sort = pictures.sort(function (a, b) {
      var commentDiff = b.comments.length - a.comments.length;
      if (commentDiff === 0) {
        commentDiff = b.likes - a.likes;
      }
      return commentDiff;
    });

    window.data.renderPictures(sort);
  });

  var switchActiveButton = function (button) {
    if (!button.classList.contains(imgFiltersButtonActive)) {
      window.util.removeClassBlockArray(imgFiltersButton, imgFiltersButtonActive);
      button.classList.add(imgFiltersButtonActive);
    }
  };

  var showSortButtons = function () {
    imgFilters.classList.remove('img-filters--inactive');
    window.util.addEventHandler(imgFiltersButton, 'click', onButtonSortClick);
  };

  window.sorting = {
    showSortButtons: showSortButtons
  };

})();
