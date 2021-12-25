//Получаем Роутер из express
const Router = require('express')
//Импортируем что бы проверять авторизован ли пользователь
const authMiddleware = require('../middleware/authMiddleware')

//Создаем объект роутера
const router = new Router()

//Импортируем messageController где находятся функции
const historyController = require('../controllers/historyController')

//API по работе с историей

// Получение истории
router.get('/',
    //проверяем авторизован ли пользователь
    authMiddleware,
    historyController.get)

//Получение истории об одном предмете
router.get('/getOne',
    //проверяем авторизован ли пользователь
    authMiddleware,
    historyController.getOne)


//экспортируем роутер из файла
module.exports = router