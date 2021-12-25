const {access} = require("../models/models");

class accessService {
    //Сервис по выдаче доступа к офисам при регистрации
    async give(userData, officeId) {
        const offices = officeId.split(',')
        let giveAccess;
        //Записываем в таблицу в бд id пользователя и офис к какому у него есть доступ
        for (let i = 0; i < offices.length; i++) {
            giveAccess = await access.create({userId: userData.id, officeId: offices[i]})
        }
        return giveAccess
    }

    //Проверка доступности при получении предметов
    async itemAccess (userId) {
        try{
            let officeAccess = {}
            const userAccess = await access.findAll({where: {userId: userId}})
            officeAccess = userAccess.map(userAccess => userAccess.officeId)
            //Возвращаем все id доступных офисов
            return officeAccess
        } catch (e) {
            throw e
        }
    }

    //Проверка доступа при получении офисов
    async officeAccess (userId) {
        try{
            let officeAccess = {}
            const userAccess = await access.findAll({where: {userId: userId}})
            officeAccess = userAccess.map(userAccess => userAccess.officeId = {id : userAccess.officeId})
            //Возвращаем id доступных офисов
            return officeAccess
        } catch (e) {
            throw e
        }
    }
}
module.exports = new accessService()