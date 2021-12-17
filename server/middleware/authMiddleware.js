//Импортируем модуль jsonwebtoken
const ApiError = require('../error/apiError')
const tokenService = require('../service/tokenService')
//Создаем и сразу же экспортируем функцию
module.exports = function (req, res, next) {

    //Проверяем если метод запроса равен OPTIONS то пропускаем, нас интересуют только put, get, post, delete запросы
    // if (req.method === "OPTIONS") {
    //     next()
    // }
    try {
        //достаем токен из заголовка авторизации
        const authorizationHeader = req.headers.authorization
        //Проверяем есть ли токен
        if (!authorizationHeader) {
            //если его нету выводим ошибку
            return next(ApiError.unauthorized())
        }
        //разбиваем токен на 2 части по пробелу и берем вторую часть, конкретно токен
        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            return next(ApiError.unauthorized())
        }
        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.unauthorized())
        }
        req.user = userData
        next()
    } catch (e) {
        console.log(e)
        //Если возникает ошибка выводи сообщение пользователь не авторизован
        return next(ApiError.unauthorized())
    }
}