const {user} = require('../models/models')
const ApiError = require('../error/apiError')
const tokenService = require('./tokenService')
const bcrypt = require('bcrypt')
const userDto = require('../dtos/userDtos')
class userService {
    async registration (login, password, username, role, next) {
        //Проверяем если логин или пароль пустой
        if(!login || !password) {

            //Выводим сообщение об ошибке
            return next(ApiError.badRequest('Пустой login или пароль'))
        }

        //Создаем переменную где ищем в базе пользователя с введенным логином
        const candidate = await user.findOne({where: {login}})

        //если нашли
        if (candidate) {
            //Выводим ошибку что пользователь с таким логином уже создан
            return (ApiError.badRequest(`Пользователь с логином ${login} уже создан`))
        }

        //Если 2 условия выше не сработали хэшируем пароль
        const hashPassword = await bcrypt.hash(password, 7)

        //Создаем пользователя
        const User = await user.create({login, password: hashPassword, role, username})

        //Создаем userDto для того что бы в токене не хранился наш пароль dto - data, transfer, object
        const UserDto = new userDto(User)

        //Вызываем функцию генерации токена из tokenService и передаем объект Dto
        const tokens = tokenService.generateToken({...UserDto})
        //вызываем функцию saveToken из токен сервиса передаем в неё id пользователя и рефреш токен
        await tokenService.saveToken(UserDto.id, tokens.refreshToken)
        return {...tokens, user: UserDto}
    }

    async login(login, password) {
        const User = await user.findOne({where:{login}})
        if(!User) {
            throw ApiError.badRequest('Неверно введен логин или пароль')
        }
        const isPassEquals = await bcrypt.compare(password, User.password)
        if(!isPassEquals) {
            throw ApiError.badRequest('Неверно введен логин или пароль')
        }
        const UserDto = new userDto(User)
        const tokens = await tokenService.generateToken({...UserDto})
        await tokenService.saveToken(UserDto.id, tokens.refreshToken)
        return {...tokens, User: UserDto}
    }

   async logout (refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
   }


   async refresh (refreshToken) {
        if(!refreshToken) {
            throw ApiError.unauthorized()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = tokenService.findToken(refreshToken)
       if(!userData || !tokenFromDB) {
            throw ApiError.unauthorized()
       }
       const User = await user.findOne({where: {id:userData.id}})
       const UserDto = new userDto(User)
       const tokens = await tokenService.generateToken({...UserDto})
       await tokenService.saveToken(UserDto.id, tokens.refreshToken)
       return {...tokens, User: UserDto}
   }
}

module.exports = new userService()