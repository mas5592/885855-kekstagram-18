'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var TIMEOUT = 10000;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.open('GET', URL);
    xhr.send();

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 304:
          onError();
          break;
        case 404:
          onError();
          break;
        case 500:
          onError();
          break;
      }
    });
  };

  var upLoad = function (onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.send(data);
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 304:
          onError('к сожалению, программа времмено неработает...');
          break;
        case 404:
          onError('к сожалению, запрашиваемая страница не найдена...');
          break;
        case 500:
          onError('к сожалению, произошла ошибка сервера...');
          break;
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения!');
    });
    xhr.addEventListener('timeout', function () {
      onError('Привышенно время ожидания, запрос не завершится за ' + xhr.timeout + 'мс');
    });
    xhr.open('POST', URL);
  };

  window.backend = {
    load: load,
    upLoad: upLoad,
  };
})();
