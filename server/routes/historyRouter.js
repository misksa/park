//Основной роутер приложения
//Получаем Роутер из express
const Router = require('express')
const authMiddleware = require('../middleware/authMiddleware')

//Создаем объект роутера
const router = new Router()

//Импортируем messageController где находятся функции
const historyController = require('../controllers/historyController')

//Методы по работе с сообщениями

// Получение сообщений об изменении
router.get('/', authMiddleware, historyController.get)


//экспортируем роутер из файла
module.exports = router