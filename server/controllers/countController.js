const countService = require('../service/countService')
const dtoService = require("../service/dtoService");

class CountController {
//Тут реализована логика вычеслений сколько какого оборудования в каком офисе
    async count (req, res, next) {
        try {
            const User = await dtoService.User(req.headers.authorization)
            const Count = await countService.count(User)
            return res.json(Count)
        } catch (e) {
            return res.json(e.message)
        }
    }
}

module.exports = new CountController()