//Роутер мест в офисах
//Получаем Роутер из express
const Router = require('express')

//Создаем объект роутера
const router = new Router()

//Импортируем placeController где находятся функции
const placeController = require('../controllers/placeController')
const authMiddleware = require("../middleware/authMiddleware");

//Методы по работе с местом в офисе
//Метод пост что бы создавать места в офисе
router.post('/', authMiddleware, placeController.create)

router.post('/delete', authMiddleware, placeController.delete)

//Получение мест в офисе
router.get('/', authMiddleware, placeController.get)

//экспортируем роутер из файла
module.exports = router