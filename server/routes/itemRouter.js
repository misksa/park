//Получаем Роутер из express
const Router = require('express')
//Импортируем что бы проверять авторизован ли пользователь
const authMiddleware = require('../middleware/authMiddleware')

//Создаем объект роутера
const router = new Router()

//Импортируем furnitureController где находятся функции
const itemController = require('../controllers/itemController')

//API запросов по работе с предметами
//ендпоинт что бы создавать новые предметы
router.post('/', authMiddleware, itemController.create)

//эндпоинт  для редактирования предметов
router.put('/update',authMiddleware, itemController.update)

//Эндпоинт на перенос между офисами
router.post('/office',authMiddleware, itemController.replaceOffice)

router.post('/status',authMiddleware, itemController.status)

router.post('/give',authMiddleware, itemController.giveItem)

//Получение всех предметов
router.get('/',authMiddleware, itemController.get)

//экспортируем роутер из файла
module.exports = router