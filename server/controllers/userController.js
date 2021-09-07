//Создаем для роута свой контроллер, конкретно для userRouter

//Импортируем модели user и office
const {user} = require('../models/models')

//Импортируем ApiError
const ApiError = require('../error/apiError')

const userService = require('../service/userService')
//создаем класс функций для регистрации, логина и проверки авторизации
class userController {

    //Создаем функцию регистрации
    async registration (req, res) {
        try {
            const {login, password, role, username} = req.body
            console.log(login, '---------------------------------')
            const userData = await userService.registration(login, password, role, username)
            return res.json(userData, login, password, role, username)
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
            next(e)
        }
    }

    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json({token})
        } catch (e) {
            next(e)
        }
    }

    async refresh (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            console.log(e)
        }
    }
    async get (req, res, next) {
        let getUser
        getUser = await user.findAll()
        return res.json(getUser)
    }
    async delete (req, res, next) {
        try {
            const {id} = req.body
            const UserDelete = await user.destroy({where: {id: id}})
            const tokenDestroy = await userService.delete(id)
            return res.json({UserDelete, tokenDestroy})
        } catch (e) {
            next(e)
        }
    }

}
module.exports =  new userController()