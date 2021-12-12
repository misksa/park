//Роутер техники
//Получаем Роутер из express
const Router = require('express')

//Создаем объект роутера
const router = new Router()

//Импортируем technicsController где находятся функции
const subtypeController = require('../controllers/subtypeController')
const authMiddleware = require("../middleware/authMiddleware");

//Методы по работе с юзерами
//Метод пост что бы создавать новую технику
router.post('/', authMiddleware, subtypeController.create)

//Получать технику
router.get('/', authMiddleware, subtypeController.get)

//экспортируем роутер из
module.exports = router