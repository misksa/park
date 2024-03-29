const {user, token} = require('../models/models')
const ApiError = require('../error/apiError')
const tokenService = require('./tokenService')
const bcrypt = require('bcrypt')
const userDto = require('../dtos/userDtos')
const {handleError} = require("pg/lib/native/query");
class userService {
    //Функция регестрации
    async registration (login, password, username) {
            //Создаем переменную где ищем в базе пользователя с введенным логином
            const candidate = await user.findOne({where: {login}})

            //если нашли
            if (candidate) {
                //Выводим ошибку что пользователь с таким логином уже создан
                throw ApiError.badRequest(`Пользователь с логином ${login} уже создан`)
            }

            //Если 2 условия выше не сработали хэшируем пароль
            const hashPassword = await bcrypt.hash(password, 7)

            //Создаем пользователя с ролью по умолчанию admin
            const User = await user.create({login, password: hashPassword, role: 'admin', username})

            return User
    }
    //Функция логина
    async login(login, password) {
        if(!login || !password) {
            throw ApiError.noContent('Логин и пароль не может быть пустым')
        }
        const User = await user.findOne({where:{login}})
        if(!User) {
            throw ApiError.badRequest('Неверно введен логин или пароль')
        }
        //Проверяем верно ли введен пароль
        const isPassEquals = await bcrypt.compare(password, User.password)
        if(!isPassEquals) {
            throw ApiError.badRequest('Неверно введен логин или пароль')
        }
        const UserDto = new userDto(User)
        //если все верно генерируем токены
        const tokens =  tokenService.generateToken({...UserDto})
        //Сохраняем токены
        await tokenService.saveToken(UserDto.id, tokens.refreshToken)
        //и возвращаем их из функции
        return {...tokens, User: UserDto}
    }

   async logout (refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
   }

   async delete (userId) {
        const destroyToken = await token.destroy({where: {userId: userId}})
       return destroyToken
   }
   //Обновление токенов
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