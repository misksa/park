//Роутер техники
//Получаем Роутер из express
const Router = require('express')

//Создаем объект роутера
const router = new Router()

//Импортируем technicsController где находятся функции
const CountController = require('../controllers/countController')
const authMiddleware = require("../middleware/authMiddleware");


//Получать технику
router.get('/', authMiddleware, CountController.count)

//экспортируем роутер из
module.exports = router