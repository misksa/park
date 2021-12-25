//Получаем Роутер из express
const Router = require('express')

//Создаем объект роутера
const router = new Router()

//Импортируем technicsController где находятся функции
const typeController = require('../controllers/typeController')
//Импортируем что бы проверять авторизован ли пользователь
const authMiddleware = require("../middleware/authMiddleware");

//API по работе с юзерами
//Эндпоинт пост что бы создавать типы
router.post('/', authMiddleware, typeController.create)

//Получать типы
router.get('/', authMiddleware, typeController.get)

//экспортируем роутер из
module.exports = router