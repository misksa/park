//Роутер юзеров
//Получаем Роутер из express
const Router = require('express')

//Создаем объект роутера
const router = new Router()

//ипортируем контроллер для юзер роута
const userController = require('../controllers/userController')

//Импортируем checkRoleMiddleware
const authMiddleware = require('../middleware/authMiddleware')

//Импортируем checkMiddleware
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

const {body} =  require('express-validator')

//Описываем методы по работе с юзерами а так же прикручиваем вторым параметром функции
//Метод пост для регистрации второй параметр функция регистрации
router.post('/registration',
    // checkRoleMiddleware('superuser'),
    userController.registration)

//Метод post что бы логиниться второй параметр функция логирования
router.post('/login', userController.login)

//Эндпоинт для логаута
router.post('/logout', userController.logout)

//Эндпоинт для получения новой пары access и refresh token
router.get ('/refresh',  userController.refresh)

//Метот get для проверки авторизован пользователь или нет, второй параметр middleware проверки авторизации, третий параметр функция проверки авторизации
router.get ('/', authMiddleware, userController.get)

//экспортируем роутер из файла
module.exports = router