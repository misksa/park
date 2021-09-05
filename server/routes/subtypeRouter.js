//Роутер техники
//Получаем Роутер из express
const Router = require('express')

//Создаем объект роутера
const router = new Router()

//Импортируем technicsController где находятся функции
const subtypeController = require('../controllers/subtypeController')

//Методы по работе с юзерами
//Метод пост что бы создавать новую технику
router.post('/',subtypeController.create)

//метод пост для редактирования техники
router.get('/count', subtypeController.count)

//Получать технику
router.get('/',subtypeController.get)

//экспортируем роутер из
module.exports = router