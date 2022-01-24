/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */

   static URL = '/account';

  static get(id = '', callback){

    this.getURL = this.URL + `/${id}`; //формирование адреса для обращения на сервер, из которого необходимо получить определённый счёт

    createRequest(this.getURL, data, 'GET', // отправка запроса 'GET' на сервер по адресу 'URL'
    function(err, response) { // функция callback объекта createRequest
      if (err === 'OK') {
        console.log( err ); 
        console.log('Данные запроса:', response);
      } else {
        console.log('Ошибка запроса: ', err); // объект ошибки
      };
    }
  );
  
  callback = createRequest.bind(this); // передача контекста this изнутри createRequest внутрь текущей функции callback (метода Entity.get)
  callback(err, response); // передача параметров err и response из объекта createRequest внутрь текущей функции callback (метода Entity.get)

  };
};
