const {office, subtype, item, place} = require("../models/models");
const accessService = require("../service/accessService");
const { Op } = require("sequelize");

class CountService {
    async count (User) {
        try {
            let Count = []
            let Office
            //Если пользователь admin
            if(User.role === 'admin') {
                //получаем доступные офисы
                const Access = await accessService.officeAccess(User.id)
                //Делаем запрос в бд
                Office = await office.findAll({
                   //с объектом доступных офисов
                    where: {
                        [Op.or]: Access
                    }
                })
            } else {
                //если пользователь superuser то делаем findAll
                Office = await office.findAll()
            }

            const officeId = Office.map(Office => Office.id)
            const officeIdForPlace = officeId.map(OfficeId => OfficeId = {officeId : OfficeId}  )
            const Subtype = await subtype.findAll()
            const subtypeId = Subtype.map(Subtype => Subtype.id)
            const Place = await place.findAll({where: {
                    [Op.or] : officeIdForPlace
                }})
            const placeId = Place.map(place => place.id)

            //Делаем подсчет получается на каждую итерацию делаем запрос с подтипами, офисом и местом в офисе
            //Тут не очень хорошо сделано, но по другому не смогу додуматься
            for (let z = 0; z < officeId.length; z++) {
                for (let i = 0; i < subtypeId.length; i++) {
                    for(let x = 0; x < placeId.length; x++) {
                    let itemCount = await item.count({where: {
                            subtypeId: subtypeId[i],
                            officeId: officeId[z],
                            placeId: placeId[x]
                        }})
                    let object = {
                        officeId: officeId[z],
                        subtypeId: subtypeId[i],
                        placeId: placeId[x],
                        count: itemCount,
                    }
                    Count.push(object)
                    }
                }
            }
            return Count
        } catch (e) {
            throw e
        }
    }
}
module.exports = new CountService()