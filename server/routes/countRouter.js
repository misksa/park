//Получаем Роутер из express
const Router = require('express')

//Создаем объект роутера
const router = new Router()

//Импортируем technicsController где находятся функции
const CountController = require('../controllers/countController')
//Импортируем что бы проверять авторизован ли пользователь
const authMiddleware = require("../middleware/authMiddleware");


//Эндпоинт для подсчет кол-ва техники
router.get('/',
    //проверяем авторизован ли пользователь
    authMiddleware,
    CountController.count)

//экспортируем роутер из
module.exports = router