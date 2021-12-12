//Создаем для роута свой контроллер, конкретно для userRouter

//Импортируем модели user и office
const {user} = require('../models/models')

//Импортируем ApiError
const ApiError = require('../error/apiError')
const accessService = require('../service/accessService')
const userService = require('../service/userService')
//создаем класс функций для регистрации, логина и проверки авторизации
class userController {
    //Создаем функцию регистрации
    async registration (req, res, next) {
        try {
            const {login, password, officeId, username} = req.body
            if(!login || !password || !username || !officeId) {
                return res.json({status: 204, message: 'Заполни обязательные поля'})
            } else {
                const userData = await userService.registration(login, password, username)
                const giveAccess = await accessService.give(userData, officeId)
                console.log(res)
                return res.json({status: 201, age: 'Пользователь зарегестрирован'})
            }

        } catch (e) {
            return res.json(e)
        }
    }
    //Функция входа пользователя
    async login (req, res, next) {
        try {
            const {login, password} = req.body
            const userData = await userService.login(login, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            return res.json(e)
        }
    }
    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json({token})
        } catch (e) {
            return res.json(e)
        }
    }

    async refresh (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            console.log(refreshToken)
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            return res.json(e)
        }
    }
    async get (req, res, next) {
        try {
            const getUser = await user.findAll()
            return res.json(getUser)
        } catch (e) {
            return res.json(e.message)
        }
    }
    async delete (req, res, next) {
        try {
            const {id} = req.query
            if(!id) {
                return res.json({status: 204, message: 'Не выбран пользователь для удаления!'})
            }
                const UserDelete = await user.destroy({where: {id: id}})
                const tokenDestroy = await userService.delete(id)
                return res.json({status: 200, message: 'Пользователь удален'})
        }
         catch (e) {
            return res.json(e.message)
        }
    }
}
module.exports =  new userController()