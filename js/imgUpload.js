
'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var inputPhoto = document.querySelector('#upload-file');
  var preview = document.querySelector('.img-upload__preview img');
  var miniatures = document.querySelectorAll('.effects__preview');

  var renderEffectMiniature = function (userFile) {
    miniatures.forEach(function (element) {
      element.style.backgroundImage = 'URL' + '(' + userFile + ')';
    });
  };

  var onFileChooserChange = function () {
    var file = inputPhoto.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        renderEffectMiniature(reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  window.imgUpload = {
    onFileChooserChange: onFileChooserChange
  };
})();
