//Получаем Роутер из express
const Router = require('express')
//Импортируем что бы проверять авторизован ли пользователь
const authMiddleware = require('../middleware/authMiddleware')
//Создаем объект роутера
const router = new Router()

//Импортируем messageController где находятся функции
const messageController = require('../controllers/messageController')

//API по работе с сообщениями
//Отправка сообщения
router.post('/', authMiddleware, messageController.send)

// Получение сообщений
router.get('/', authMiddleware, messageController.get)


//экспортируем роутер из файла
module.exports = router