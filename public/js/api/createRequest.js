//const { response } = require("express");
//const { send } = require("express/lib/response");

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
    //передаём в createRequest три аргумента: адрес, data, method и функцию callback
    
    let url = options.url;
    let method = options.method;
    let xhr =new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function(){ // "вешаем" обработчик события на получение состояний запроса после его отправки на сервер
        if(xhr.readyState === 4 && xhr.status == 200){  // если отправка пакета успешна..
            console.log(xhr)    // выводим в консоль тело запроса
            options.callback(null, JSON.parse(xhr.response))    // и передаём в функцию callback 2 параметра: null вместо кода ошибки; ответ сервера(преобразованный в объект) на отправленный ему запрос xhr  
        }
    })

    try {
        
        if (method === 'GET') { 
            // отправка GET-запроса

            //ЦЕЛЕВОЙ ФОРМАТ. Передача логина и пароля в качестве доп.параметров url-а   'https://localhost:8000/.../?mail=ivan@biz.pro&password=odinodin'     
            
            url += '?'; // добавляем к адресу разделитель для параметров

            for (let option in options.data) { // перебираем свойства объекта data (количество которых мы заранее не знаем)
                url += option + '=' + options.data[option] + '&'; // "собираем" строку адреса с параметрами запроса
            };

            url = url.slice(0, -1); // отрезаем лишний амперсанд в конце собранной строки (оставшийся после "сборки")  
            
            xhr.open( method, url ); // адрес запроса
            xhr.send();    
        
        } else {
            // отправка неGET-запрса

            formData = new FormData;

            for (let option in options.data) { // перебираем свойства объекта data (количество которых мы заранее не знаем)
                formData.append( option, option.data[option]); //добовляем в форму значения из каждого перебираемого свойства data
            };
            
            xhr.open( method, url ); // адрес запроса
            xhr.send(formData);   // передача данных из формы
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //определяем заголовок после запроса

        };

        xhr.responseType = options.responseType; // формат, в котором необходимо выдать результат

    }
    catch (e) {
        options.callback(e); // в случ.ошибки запроса - передаём в callback код ошибки
    };
};


    
    