//Роутер техники
//Получаем Роутер из express
const Router = require('express')

//Создаем объект роутера
const router = new Router()

//Импортируем technicsController где находятся функции
const typeController = require('../controllers/typeController')

//Методы по работе с юзерами
//Метод пост что бы создавать новую технику
router.post('/',typeController.create)

//метод пост для редактирования техники
router.post('/edit',typeController.edit)

//Получать технику
router.get('/',typeController.get)

//экспортируем роутер из
module.exports = router