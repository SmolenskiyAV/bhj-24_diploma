/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity { 

  static URL = '';
    
  /** 
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){

    data.mail = mail;
    data.password = password;

    createRequest(this.URL, data, 'GET', // отправка запроса 'GET' на сервер по адресу 'URL'
      function(err, response) { // функция callback объекта createRequest
        if (err === 'OK') {
          console.log( err ); 
          console.log('Данные запроса:', response);
        } else {
          console.log('Ошибка запроса: ', err); // объект ошибки
        };
      }
    );
    
    callback = createRequest.bind(this); // передача контекста this изнутри createRequest внутрь текущей функции callback (метода Entity.list)
    callback(err, response); // передача параметров err и response из объекта createRequest внутрь текущей функции callback (метода Entity.list)
  };
  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {

    data.mail = mail;

    createRequest(this.URL, data, 'PUT', // отправка запроса 'PUT' на сервер по адресу 'URL'
      function(err, response) { // функция callback объекта createRequest
        if (err === 'OK') {
          console.log( err ); 
          console.log('Данные запроса:', response);
        } else {
          console.log('Ошибка запроса: ', err); // объект ошибки
        };
      }
    );
    
    callback = createRequest.bind(this); // передача контекста this изнутри createRequest внутрь текущей функции callback (метода Entity.create)
    callback(err, response); // передача параметров err и response из объекта createRequest внутрь текущей функции callback (метода Entity.create)
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {

    data.mail = mail;

    createRequest(this.URL, data, 'DELETE', // отправка запроса 'DELETE' на сервер по адресу 'URL'
      function(err, response) { // функция callback объекта createRequest
        if (err === 'OK') {
          console.log( err ); 
          console.log('Данные запроса:', response);
        } else {
          console.log('Ошибка запроса: ', err); // объект ошибки
        };
      }
    );
    
    callback = createRequest.bind(this); // передача контекста this изнутри createRequest внутрь текущей функции callback (метода Entity.remove)
    callback(err, response); // передача параметров err и response из объекта createRequest внутрь текущей функции callback (метода Entity.remove)

  };
};
