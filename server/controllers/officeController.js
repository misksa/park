//Создаем для роута свой контроллер, конкретно для officeRouter

//Импортируем модель офиса
const {office} = require('../models/models')

//Импортируем ApiError
const ApiError = require('../error/apiError')

//создаем класс функций где будет  функции для создания и получения офиса или всех офисов
class officeController {
    async create(req, res) {

        //Создаем переменную name которую будем брать из req.body (тело запроса)
        const {name} = req.body

        if(!name) {
            throw ApiError.noContent('Empty Data')
        }
        //Создаем переменную Office в которую делаем запрос в бд на создание записи в name
        const Office = await office.create({name})

        //Возвращаем ответ в json формате
        return res.json({Office})
    }
    async getAll (req, res) {

        //создаем переменную offices в которой делаем запрос к базе данных таблице офис и выводим все данные из неё
        const offices = await office.findAll()

        //Возвращаем ответ в json формате
        return res.json (offices)
    }
}

module.exports =  new officeController()