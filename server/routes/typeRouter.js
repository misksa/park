//Роутер техники
//Получаем Роутер из express
const Router = require('express')

//Создаем объект роутера
const router = new Router()

//Импортируем technicsController где находятся функции
const typeController = require('../controllers/typeController')
const authMiddleware = require("../middleware/authMiddleware");

//Методы по работе с юзерами
//Метод пост что бы создавать новую технику
router.post('/', authMiddleware, typeController.create)

//метод пост для редактирования техники
router.post('/edit', authMiddleware, typeController.edit)

//Получать технику
router.get('/', authMiddleware, typeController.get)

//экспортируем роутер из
module.exports = router