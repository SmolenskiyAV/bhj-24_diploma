/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */

   static URL = '/user';

  static setCurrent(user) {

    localStorage.setItem('user', user);
  };

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {

    delete localStorage.user;

  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {

    return localStorage.getItem('user');

  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {

    createRequest(this.URL + '/current', data, 'GET', // отправка запроса 'GET' на сервер по адресу 'URL/current'
      function(err, response) { // функция callback объекта createRequest
        if (err === 'OK') {
          console.log( err ); 
          console.log('Данные запроса:', response);
        } else {
          console.log('Ошибка запроса: ', err); // объект ошибки
        };
      }
    );
    
    callback = createRequest.bind(this); // передача контекста this изнутри createRequest внутрь текущей функции callback (метода User.fetch)
    callback = (err, response) => { // запуск текущей функции callback (метода User.fetch) с передачей внутрь неё параметров err и response из объекта createRequest  

      if ((this.current().name) && (response.user.name)) this.setCurrent(response.user.name); // данные о текущем пользователе есть. обновить данные текущего пользователя

      if (!response.success) this.unsetCurrent(); // данных о пользователе нет. удалить запись об авторизации
    };
  };

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {

    createRequest(this.URL + '/register', data, 'POST', // отправка запроса 'POST' на сервер по адресу 'URL/register'
      function(err, response) { // функция callback объекта createRequest
        if (err === 'OK') {
          console.log( err ); 
          console.log('Данные запроса:', response);
        } else {
          console.log('Ошибка запроса: ', err); // объект ошибки
        };
      }
    );

    callback = createRequest.bind(this); // передача контекста this изнутри createRequest внутрь текущей функции callback (метода User.register)
    callback = (err, response) => { // запуск текущей функции callback (метода User.register) с передачей внутрь неё параметров err и response из объекта createRequest  

      if ((response.success) && (response.user.name)) this.setCurrent(response.user.name); // данные о текущем пользователе есть. обновить данные текущего пользователя
     
    };

  };

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {

    createRequest(this.URL + '/logout', data, 'POST', // отправка запроса 'POST' на сервер по адресу 'URL/logout'
      function(err, response) { // функция callback объекта createRequest
        if (err === 'OK') {
          console.log( err ); 
          console.log('Данные запроса:', response);
        } else {
          console.log('Ошибка запроса: ', err); // объект ошибки
        };
      }
    );

    callback = createRequest.bind(this); // передача контекста this изнутри createRequest внутрь текущей функции callback (метода User.logout)
    callback = (err, response) => { // запуск текущей функции callback (метода User.logout) с передачей внутрь неё параметров err и response из объекта createRequest  

      if (response.success) this.unsetCurrent(); // данные о текущем пользователе есть. обновить данные текущего пользователя
     
    };


  }
}
