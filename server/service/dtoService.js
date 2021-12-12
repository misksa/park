// const {access} = require('../models/models')

const Decode = require("jwt-decode");
const userDto = require("../dtos/userDtos");
const itemDto = require("../dtos/itemDtos")

class dtoService {

    async User(token) {
        const User = Decode(token)
        return new userDto(User)
    }
    async Item(item){
        return new itemDto(item)
    }
}

module.exports = new dtoService()
