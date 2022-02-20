//const { response } = require("express");
//const { send } = require("express/lib/response");

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
    //передаём в createRequest три аргумента: адрес, data, method и функцию callback
    
    let url ='http://localhost:8000' + `${options.url}`; //добавляем в адрес, переданный в данную функцию createRequest, путь к локальному серверу
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
        
        if (method === 'GET') { 
            // отправка GET-запроса

            //url.searchParams.set('email', data.email, 'password', data.password) // ЦЕЛЕВОЙ ФОРМАТ. Передача логина и пароля в качестве доп.параметров url-а        
            
            let urlParamsGet = ''; //строка, которую передаём в качестве параметров url: 'имя свойства , значение свойства , ...'
            
            for (let option in options.data) { // "собираем" строку из свойств объекта data, перебирая его свойства (количество которых мы заранее не знаем)
                urlParamsGet = urlParamsGet + Object.keys(option) + ',' + option[Object.keys(option)] + ',';
            };
            
                console.log('urlParamsGet=' + urlParamsGet); //КОНТРОЛЬНАЯ ТОЧКА!
                console.log('url= ' + url); //КОНТРОЛЬНАЯ ТОЧКА!    
            url.searchParams.set(urlParamsGet); // вставляем строку " 'email', data.email, 'password', data.password, " в доп.параметры url
            xhr.open(method, url); // адрес запроса
            xhr.send();
                     
        } else {
            // отправка неGET-запрса

            formData = new FormData;

            for (let option in options.data) { // перебираем свойства объекта data (количество которых мы заранее не знаем)
                formData.append( `'${Object.keys(option)}'`, option[Object.keys(option)]); //добовляем в форму значения из каждого перебираемого свойства data
            };
            
            xhr.open( method, url ); // адрес запроса
            xhr.send(formData);   // передача данных из формы
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //определяем заголовок после запроса

        };

        xhr.responseType = responseType; // формат, в котором необходимо выдать результат

        callback(xhr.statusText, xhr.response);
    
    }
    catch (e) {
        callback(e);
    };
};


    
    