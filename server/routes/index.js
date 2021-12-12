//Основной роутер приложения

//Получаем Роутер из express
const Router = require('express')

//Создаем объект роутера
const router = new Router()

//импортируем созданные роутеры в основной файл роутер
const userRouter = require('./userRouter')
const officeRouter = require('./officeRouter')
const messageRouter = require('./messageRouter')
const placeRouter = require('./placeRouter')
const historyRouter = require('./historyRouter')
const itemRouter = require('./itemRouter')
const subtypeRoute = require('./subtypeRouter')
const typeRouter = require('./typeRouter')
const countRouter = require('./countRouter')

//Сопостовляем маршруты с соответствующими созданными роутами
router.use('/user', userRouter)
router.use('/office', officeRouter)
router.use('/message', messageRouter)
router.use('/place', placeRouter)
router.use('/item', itemRouter)
router.use('/history', historyRouter)
router.use('/subtype', subtypeRoute)
router.use('/type', typeRouter)
router.use('/count', countRouter)




//экспортируем роутер из файла
module.exports = router