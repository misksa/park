const {history} = require('../models/models')
const itemDto = require('../dtos/itemDtos')
const userDto = require('../dtos/itemDtos')

const Decode = require('jwt-decode')
class historyService {
    async create(User, ItemData) {
       const decodeUser = Decode(User)
       const UserDto = new userDto(decodeUser)
       const ItemDto = new itemDto(ItemData)
       const historyData = await history.create({action: 'create', manage: ItemDto.manage, office: ItemDto.officeId , place: ItemDto.placeId, itemId: ItemDto.id, userId: UserDto.id})

        return historyData
    }
}

module.exports = new historyService()