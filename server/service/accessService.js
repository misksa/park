const {access} = require("../models/models");

class accessService {
    async give(userData, officeId) {
        const offices = officeId.split(',')
        let giveAccess;
        for (let i = 0; i < offices.length; i++) {
            giveAccess = await access.create({userId: userData.id, officeId: offices[i]})
        }
        return giveAccess
    }
    async itemAccess (userId) {
        try{
            let officeAccess = {}
            const userAccess = await access.findAll({where: {userId: userId}})
            officeAccess = userAccess.map(userAccess => userAccess.officeId)
            return officeAccess
        } catch (e) {
            throw e
        }
    }
    async officeAccess (userId) {
        try{
            let officeAccess = {}
            const userAccess = await access.findAll({where: {userId: userId}})
            officeAccess = userAccess.map(userAccess => userAccess.officeId = {id : userAccess.officeId})
            return officeAccess
        } catch (e) {
            throw e
        }
    }
}
module.exports = new accessService()