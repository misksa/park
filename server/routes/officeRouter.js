//Роутер офиса

//Получаем Роутер из express
const Router = require('express')
const authMiddleware = require('../middleware/authMiddleware')
//Создаем объект роутера
const router = new Router()

//Импортируем officeController где находятся функции
const officeController = require('../controllers/officeController')

//Методы по работе с офисом
//Метод пост что бы создать офис
router.post('/',authMiddleware, officeController.create)

//Запрос на получение всех офисов
router.get('/', officeController.getAll)


// Запрос на получение конкретного офиса
router.get('/:id', officeController.getOne )

//экспортируем роутер из файла
module.exports = router