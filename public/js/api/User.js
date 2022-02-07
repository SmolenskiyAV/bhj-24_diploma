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

    createRequest({
      url: this.URL + '/current',
      method: 'GET',
      responseType: 'json',
      data: this.current(),  
      callback: (err, response) => {
        if ((this.current().name) && (response.user.name)) this.setCurrent(response.user.name); // данные о текущем пользователе есть. обновить данные текущего пользователя
        if (!response.success) this.unsetCurrent(); // данных о пользователе нет. удалить запись об авторизации
      callback(err, response); 
      }
    });
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

    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data,  
      callback: (err, response) => {
        if ((response.success) && (response.user.name)) this.setCurrent(response.user.name); // данные о текущем пользователе есть. обновить данные текущего пользователя
      }
    });
    
    callback(err, response); 
  };

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {

    createRequest({// отправка запроса 'POST' на сервер по адресу 'URL/logout'
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      data: this.current(),  
      callback: (err, response) => {
        if (response.success) this.unsetCurrent(); // данные о текущем пользователе есть. обновить данные текущего пользователя
      }
    });
    
    callback(err, response); 
  };
};
