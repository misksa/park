//Роутер офиса

//Получаем Роутер из express
const Router = require('express')
//Импортируем что бы проверять авторизован ли пользователь
const authMiddleware = require('../middleware/authMiddleware')
//Создаем объект роутера
const router = new Router()

//Импортируем officeController где находятся функции
const officeController = require('../controllers/officeController')

//API по работе с офисом
//эндпоинт  что бы создать офис
router.post('/',authMiddleware, officeController.create)

//Запрос на получение всех офисов
router.get('/public', authMiddleware, officeController.getPublic)
//запрос на получение только доступных офисов
router.get('/auth', authMiddleware, officeController.getAuth)



//экспортируем роутер из файла
module.exports = router