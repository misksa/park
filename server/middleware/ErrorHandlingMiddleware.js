//импортируем созданный apiError
const ApiError = require('../error/apiError')

//Экспортируем функцию  middleware
module.exports = function (err, req, res, next) {
    console.log(err)
    //проверяем если класс ошибки apiError
    if(err instanceof ApiError) {

        //Тогда на клиент возвращаем ответ со статус кодом который будем получать из ошибки
       return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    //если сюда попала ошибка которая не является инстансом apiError, вернем эту ошибку
    return res.status(500).json({message: 'Непредвиденная ошибка!'})
}