//Получаем Роутер из express
const Router = require('express')

//Создаем объект роутера
const router = new Router()

//Импортируем placeController где находятся функции
const placeController = require('../controllers/placeController')
//Импортируем что бы проверять авторизован ли пользователь
const authMiddleware = require("../middleware/authMiddleware");

//API по работе с местом в офисе
//ендпоинт пост что бы создавать места в офисе
router.post('/', authMiddleware, placeController.create)

router.post('/edit', authMiddleware, placeController.edit)

router.post('/delete', authMiddleware, placeController.delete)

//Получение мест в офисе
router.get('/', authMiddleware, placeController.get)

//экспортируем роутер из файла
module.exports = router