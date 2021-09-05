//Роутер мест в офисах
//Получаем Роутер из express
const Router = require('express')

//Создаем объект роутера
const router = new Router()

//Импортируем placeController где находятся функции
const placeController = require('../controllers/placeController')

//Методы по работе с местом в офисе
//Метод пост что бы создавать места в офисе
router.post('/', placeController.create)

router.post('/delete', placeController.delete)

//Получение мест в офисе
router.get('/', placeController.get)

//экспортируем роутер из файла
module.exports = router