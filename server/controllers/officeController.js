//Создаем для роута свой контроллер, конкретно для officeRouter

//Импортируем модель офиса
const {office} = require('../models/models')

//Импортируем ApiError
const ApiError = require('../error/apiError')
const accessService = require("../service/accessService");
const {Op} = require("sequelize");
const dtoService = require("../service/dtoService");

//создаем класс функций где будет  функции для создания и получения офиса или всех офисов
class officeController {
    //Функция создания офисов
    async create(req, res, next) {
        try {
            //Создаем переменную name которую будем брать из req.body (тело запроса)
            const {name} = req.body
            if(!name) {
                throw ApiError.noContent('Введите название офиса')
            }
            //Создаем переменную Office в которую делаем запрос в бд на создание записи в name
            const Office = await office.create({name})
            //Возвращаем ответ в json формате
            return res.json({status: 200, message: 'Офис создан'})
        } catch (e) {
            return res.json(e)
        }
    }
    //Функция получения офисов которые доступны всем(например для переноса техники)
    async getPublic (req, res,next) {
        try {
            //создаем переменную offices в которой делаем запрос к базе данных таблице офис и выводим все данные из неё
            const offices = await office.findAll()
            //Возвращаем ответ в json формате
            return res.json(offices)
        } catch (e) {
            return res.json(e)
        }
    }
    //Функция для получения офисов к каким есть доступ
    async getAuth (req, res, next) {
        try {
            const User = await dtoService.User(req.headers.authorization)
            let offices
            //у superuser есть доступ ко всем офисам поэтому проверяем если пользователь админ
            if(User.role === 'admin') {
                //То передаем управление в accessService
                const Access = await accessService.officeAccess(User.id)
                //Делаем запрос в бд с объектом в котором даные о доступных офисах пользователю
                offices = await office.findAll({where: {
                        [Op.or] : Access
                    }})
            } else {
                //если superuser делаем запрос ко всем сразу
                offices = await office.findAll()
            }
            //Возвращаем ответ в json формате
            return res.json(offices)
        } catch (e) {
            return res.json(e)
        }
    }
}

module.exports =  new officeController()