import axios from "axios";


const $host = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    Vary: origin
})

//вешаем интерцептор на запросы и к каждому запросу добавляем заголовок авторизации где указываем нащ токен доступа из локального хранилища
$host.interceptors.request.use((config) =>  {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
})

//Вешаем интерцептор на ответы
$host.interceptors.response.use((config) => {
    //Если ответ без ошибок то просто возвращаем конфиг
    return config

    //Если ответ с ошибками
}, async (error) => {
    //в originalRequest кладем наш запрос на который мы получили ответ с ошибкой
    const originalRequest = error.config
    //проверяем если статус ошибки равен 401
    if (error.response.status === 401 ) {
        //
        try {
            //То отправляем запрос на обновление токенов
            const {data} = await axios.get(`http://localhost:5000/api/user/refresh`, {withCredentials: true})
            //Сохраняем токен доступа в локальное хранилище
            localStorage.setItem('accessToken', data.accessToken)
            //Возвращаем наш запрос на который в ответе мы получили ошибку что бы запрос автоматически отправился еще раз
            return $host.request(originalRequest)
        } catch (e) {
            console.log('НЕ АВТАРИЗОВАН', e)
        }
    }
})

export {
    $host
}