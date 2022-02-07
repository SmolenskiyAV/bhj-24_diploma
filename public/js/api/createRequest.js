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
    let responseType = options.responseType;
    options.data = {
        //email:email,
        //password:password
    };
    options.callback = callback = (err, response) =>{
        if (err === 'OK') {
            console.log( err ); 
            console.log('Данные запроса:' + response);
            } else {
                console.log('Ошибка запроса: ' + err); // объект ошибки
            };
    }

    let xhr =new XMLHttpRequest();

    try {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 

        if (method === 'GET') { 
            // отправка GET-запроса
            //url.searchParams.set('email', data.email, 'password', data.password) // передача логина и пароля в качестве доп.параметров url-а        
            url.searchParams.set(data); // такая запись в качестве может считаться УНИВЕРСАЛЬНЫМ ВАРИАНТОМ???
            xhr.open(method, url); // адрес запроса
            xhr.send();
            
        } else {
            // отправка неGET-запрса
            formData = new FormData;
            formData.append( 'mail', data.email );
            formData.append( 'password', data.password );
 
            xhr.open( method, url ); // адрес запроса
            xhr.send(formData);   // передача данных из формы

        }

        xhr.responseType = responseType; // формат, в котором необходимо выдать результат

        callback(xhr.statusText, xhr.response);
    
    }
    catch (e) {
        callback(e);
    };
};


    
    