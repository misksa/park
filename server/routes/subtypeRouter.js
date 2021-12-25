//Получаем Роутер из express
const Router = require('express')

//Создаем объект роутера
const router = new Router()

//Импортируем technicsController где находятся функции
const subtypeController = require('../controllers/subtypeController')
//Импортируем что бы проверять авторизован ли пользователь
const authMiddleware = require("../middleware/authMiddleware");

//API по работе с подтипами
//Ендпоинт  что бы создавать новые подтипы
router.post('/', authMiddleware, subtypeController.create)

//Получать подтипы
router.get('/', authMiddleware, subtypeController.get)

//экспортируем роутер из
module.exports = router